"use client";

import type { Requisicao } from "@/types/requisicao";
import axios from "axios";
import { useState } from "react";
import { Button, Input, Modal } from "antd";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type Servico = {
  id: string;
  nome: string;
};

async function buscarServicos(): Promise<Servico[]> {
  const resposta = await axios.get<Servico[]>("/api/servicos");
  return resposta.data;
}

async function buscarRequisicoes(): Promise<Requisicao[]> {
  const resposta = await axios.get<Requisicao[]>(
    "/api/consultas/consulta-demo/requisicoes",
  );
  return resposta.data;
}


type CamposRequisicao = {
  servicoId: string;
  conteudo: string;
};

async function salvarRequisicao(
  campos: CamposRequisicao,
): Promise<Requisicao> {
  const resposta = await axios.post<Requisicao>(
    "/api/consultas/consulta-demo/requisicoes",
    campos,
  );

  return resposta.data;
}

async function editarRequisicao({
  id,
  campos,
}: {
  id: string;
  campos: CamposRequisicao;
}): Promise<Requisicao> {
  const resposta = await axios.patch<Requisicao>(
    `/api/consultas/consulta-demo/requisicoes/${encodeURIComponent(id)}`,
    campos,
  );

  return resposta.data;
}

async function excluirRequisicao(id: string): Promise<void> {
  await axios.delete(
    `/api/consultas/consulta-demo/requisicoes/${encodeURIComponent(id)}`,
  );
}




export default function Requisicoes() {
  const {
    data: requisicoes = [],
    isPending: carregandoRequisicoes,
    isError: erroRequisicoes,
  } = useQuery({
    queryKey: ["requisicoes", "consulta-demo"],
    queryFn: buscarRequisicoes,
  });
  const {
    data: servicos = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["servicos"],
    queryFn: buscarServicos,
  });
  const [modo, setModo] = useState<"nova" | "visualizar" | null>(null);
  const [requisicaoId, setRequisicaoId] = useState<string | null>(null);
  const [confirmacaoAberta, setConfirmacaoAberta] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false);
  const [busca, setBusca] = useState("");
  const { control, reset, setValue, handleSubmit } = useForm<CamposRequisicao>({
    defaultValues: { servicoId: "", conteudo: "" },
  });
  const servicoId = useWatch({ control, name: "servicoId" });
  const servicoSelecionado = servicos.find((servico) => servico.id === servicoId);
  const servicosFiltrados = servicos.filter((servico) =>
    servico.nome.toLowerCase().includes(busca.trim().toLowerCase()),
  );

  function abrirRequisicao(requisicao?: Requisicao) {
    if (operando) return;
    criacao.reset();
    edicao.reset();
    exclusao.reset();
    setConfirmacaoAberta(false);
    setRequisicaoId(requisicao?.id ?? null);
    reset(
      requisicao
        ? {
            servicoId: requisicao.servicoId,
            conteudo: requisicao.conteudo,
          }
        : { servicoId: "", conteudo: "" },
    );
    setModo(requisicao ? "visualizar" : "nova");
  }

  function fecharRequisicao() {
    if (operando || confirmacaoAberta) return;
    concluirSalvamento();
  }

  function concluirSalvamento() {
    setConfirmacaoAberta(false);
    setBuscaAberta(false);
    setModo(null);
    setRequisicaoId(null);
  }

  const queryClient = useQueryClient();

  const criacao = useMutation({
    mutationFn: salvarRequisicao,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["requisicoes", "consulta-demo"],
      });

      concluirSalvamento();
    },
  });

  const edicao = useMutation({
    mutationFn: editarRequisicao,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["requisicoes", "consulta-demo"],
      });

      concluirSalvamento();
    },
  });

  const exclusao = useMutation({
    mutationFn: excluirRequisicao,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["requisicoes", "consulta-demo"],
      });

      concluirSalvamento();
    },
  });

  const salvando = criacao.isPending || edicao.isPending;
  const operando = salvando || exclusao.isPending;

  function enviarFormulario(campos: CamposRequisicao) {
    if (operando || confirmacaoAberta) return;

    if (modo === "nova") {
      criacao.mutate(campos);
    } else if (requisicaoId) {
      edicao.mutate({ id: requisicaoId, campos });
    }
  }

  return (
    <section aria-labelledby="titulo-requisicoes" className="rounded-lg border border-gray-200 bg-white p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 id="titulo-requisicoes" className="text-xl font-semibold">Requisições</h2>
        <Button type="primary" onClick={() => abrirRequisicao()}>
          Nova requisição
        </Button>
      </div>
      <p className="mt-3 text-sm text-gray-600">
        Consulta de demonstração. Novas requisições são salvas neste servidor.
      </p>
      {carregandoRequisicoes && (
        <p role="status" className="mt-5">Carregando requisições...</p>
      )}

      {erroRequisicoes && (
        <p role="alert" className="mt-5 text-red-600">
          Não foi possível carregar as requisições.
        </p>
      )}

      {!carregandoRequisicoes && !erroRequisicoes && (
        requisicoes.length === 0 ? (
          <p className="mt-5">Nenhuma requisição nesta consulta.</p>
        ) : (
          <ul className="mt-5 divide-y divide-gray-200">
            {requisicoes.map((requisicao) => (
              <li
                key={requisicao.id}
                className="flex items-center justify-between gap-3 py-4"
              >
                <span>
                  {servicos.find(
                    (servico) => servico.id === requisicao.servicoId,
                  )?.nome ?? requisicao.servicoId}
                </span>
                <Button onClick={() => abrirRequisicao(requisicao)}>
                  Visualizar requisição
                </Button>
              </li>
            ))}
          </ul>
        )
      )}

      <Modal
        title={modo === "nova" ? "Nova requisição" : "Editar requisição"}
        open={modo !== null}
        onCancel={fecharRequisicao}
        closable={false}
        footer={[
          ...(modo === "visualizar" ? [
            <Button
              key="excluir"
              danger
              disabled={operando || confirmacaoAberta}
              onClick={() => { exclusao.reset(); setConfirmacaoAberta(true); }}
            >
              Excluir
            </Button>,
          ] : []),
          <Button key="fechar" disabled={operando || confirmacaoAberta} onClick={fecharRequisicao}>Fechar</Button>,
          <Button
            key="salvar"
            type="primary"
            loading={salvando}
            disabled={operando || confirmacaoAberta}
            onClick={handleSubmit(enviarFormulario)}
          >
            Salvar
          </Button>,
        ]}
      >
        <div className="space-y-5 py-4">
          <div>
            <label htmlFor="servico" className="mb-2 block font-medium">Serviço / procedimento</label>
            <Button
              id="servico"
              block
              onClick={() => { setBusca(""); setBuscaAberta(true); }}
              aria-haspopup="dialog"
            >
              {servicoSelecionado?.nome ?? "Selecione um procedimento"}
            </Button>
          </div>
          <div>
            <label htmlFor="conteudo" className="mb-2 block font-medium">Conteúdo da requisição</label>
            <Controller
              name="conteudo"
              control={control}
              render={({ field }) => (
                <Input.TextArea {...field} id="conteudo" rows={5} placeholder="Preencha o conteúdo da requisição" />
              )}
            />
          </div>
          {(criacao.isError || edicao.isError) && (
            <p role="alert" className="text-sm text-red-600">
              Não foi possível salvar. Confira o serviço e o conteúdo e tente novamente.
            </p>
          )}
        </div>
      </Modal>

      <Modal
        title="Excluir requisição?"
        open={confirmacaoAberta}
        closable={false}
        onCancel={() => {
          if (!exclusao.isPending) setConfirmacaoAberta(false);
        }}
        footer={[
          <Button
            key="cancelar"
            disabled={exclusao.isPending}
            onClick={() => setConfirmacaoAberta(false)}
          >
            Cancelar
          </Button>,
          <Button
            key="confirmar"
            type="primary"
            danger
            loading={exclusao.isPending}
            disabled={operando || !requisicaoId}
            onClick={() => {
              if (requisicaoId && !operando) exclusao.mutate(requisicaoId);
            }}
          >
            Confirmar exclusão
          </Button>,
        ]}
      >
        <p>Deseja excluir esta requisição? Esta ação não pode ser desfeita.</p>
        {exclusao.isError && (
          <p role="alert" className="mt-4 text-red-600">
            Não foi possível excluir. Tente novamente ou cancele para voltar à requisição.
          </p>
        )}
      </Modal>

      <Modal
        title="Buscar serviço"
        open={buscaAberta}
        onCancel={() => setBuscaAberta(false)}
        closable={false}
        footer={<Button onClick={() => setBuscaAberta(false)}>Voltar à requisição</Button>}
      >
        <div className="py-4">
          <label htmlFor="busca-servico" className="mb-2 block font-medium">Nome do serviço</label>
          <Input id="busca-servico" value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Digite para buscar" />
          <ul className="mt-4 space-y-2">
            {servicosFiltrados.map((servico) => (
              <li key={servico.id}>
                <Button block onClick={() => { setValue("servicoId", servico.id); setBuscaAberta(false); }}>
                  {servico.nome}
                </Button>
              </li>
            ))}
          </ul>
          {isPending && <p role="status" className="mt-4 text-gray-600">Carregando serviços...</p>}
          {isError && <p role="alert" className="mt-4 text-red-600">Não foi possível carregar os serviços.</p>}
          {!isPending && !isError && servicosFiltrados.length === 0 && <p role="status" className="mt-4 text-gray-600">Nenhum serviço encontrado.</p>}
        </div>
      </Modal>
    </section>
  );
}
