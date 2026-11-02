import { editarRequisicao, excluirRequisicao } from "@/lib/requisicoes";

export async function PATCH(
  request: Request,
  { params }: {
    params: Promise<{ consultaId: string; requisicaoId: string }>;
  },
) {
  const { consultaId, requisicaoId } = await params;
  const dados = await request.json().catch(() => null);

  if (
    !dados ||
    typeof dados.servicoId !== "string" ||
    typeof dados.conteudo !== "string" ||
    !dados.servicoId.trim() ||
    !dados.conteudo.trim()
  ) {
    return Response.json(
      { mensagem: "Informe o serviço e o conteúdo." },
      { status: 400 },
    );
  }

  try {
    const requisicao = await editarRequisicao(
      consultaId,
      requisicaoId,
      dados.servicoId.trim(),
      dados.conteudo.trim(),
    );

    if (!requisicao) {
      return Response.json(
        { mensagem: "Requisição não encontrada nesta consulta." },
        { status: 404 },
      );
    }

    return Response.json(requisicao);
  } catch {
    return Response.json(
      { mensagem: "Não foi possível editar a requisição." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: {
    params: Promise<{ consultaId: string; requisicaoId: string }>;
  },
) {
  const { consultaId, requisicaoId } = await params;

  try {
    const excluida = await excluirRequisicao(consultaId, requisicaoId);

    if (!excluida) {
      return Response.json(
        { mensagem: "Requisição não encontrada nesta consulta." },
        { status: 404 },
      );
    }

    return new Response(null, { status: 204 });
  } catch {
    return Response.json(
      { mensagem: "Não foi possível excluir a requisição." },
      { status: 500 },
    );
  }
}
