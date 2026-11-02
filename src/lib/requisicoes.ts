import { readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import type { Requisicao } from "@/types/requisicao";

export async function listarRequisicoes(
  consultaId: string,
): Promise<Requisicao[]> {
  const arquivo = path.join(process.cwd(), "data", "requisicoes.json");
  const conteudo = await readFile(arquivo, "utf8");
  const requisicoes: Requisicao[] = JSON.parse(conteudo);

  return requisicoes.filter(
    (requisicao) => requisicao.consultaId === consultaId,
  );
}

export async function criarRequisicao(
  consultaId: string,
  servicoId: string,
  conteudo: string,
): Promise<Requisicao> {
  const arquivo = path.join(process.cwd(), "data", "requisicoes.json");
  const texto = await readFile(arquivo, "utf8");
  const requisicoes: Requisicao[] = JSON.parse(texto);

  const novaRequisicao: Requisicao = {
    id: randomUUID(),
    consultaId,
    servicoId,
    conteudo,
  };

  requisicoes.push(novaRequisicao);

  await writeFile(
    arquivo,
    JSON.stringify(requisicoes, null, 2),
    "utf8",
  );

  return novaRequisicao;
}

export async function editarRequisicao(
  consultaId: string,
  requisicaoId: string,
  servicoId: string,
  conteudo: string,
): Promise<Requisicao | null> {
  const arquivo = path.join(process.cwd(), "data", "requisicoes.json");
  const texto = await readFile(arquivo, "utf8");
  const requisicoes: Requisicao[] = JSON.parse(texto);
  const requisicao = requisicoes.find(
    (item) => item.id === requisicaoId && item.consultaId === consultaId,
  );

  if (!requisicao) {
    return null;
  }

  requisicao.servicoId = servicoId;
  requisicao.conteudo = conteudo;

  await writeFile(arquivo, JSON.stringify(requisicoes, null, 2), "utf8");

  return requisicao;
}

export async function excluirRequisicao(
  consultaId: string,
  requisicaoId: string,
): Promise<boolean> {
  const arquivo = path.join(process.cwd(), "data", "requisicoes.json");
  const texto = await readFile(arquivo, "utf8");
  const requisicoes: Requisicao[] = JSON.parse(texto);
  const indice = requisicoes.findIndex(
    (item) => item.id === requisicaoId && item.consultaId === consultaId,
  );

  if (indice === -1) {
    return false;
  }

  requisicoes.splice(indice, 1);
  await writeFile(arquivo, JSON.stringify(requisicoes, null, 2), "utf8");

  return true;
}
