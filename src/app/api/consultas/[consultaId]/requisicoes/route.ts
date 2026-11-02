import {
  listarRequisicoes,
  criarRequisicao,
} from "@/lib/requisicoes";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ consultaId: string }> },
) {
  const { consultaId } = await params;

  try {
    const requisicoes = await listarRequisicoes(consultaId);
    return Response.json(requisicoes);
  } catch {
    return Response.json(
      { mensagem: "Não foi possível carregar as requisições." },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ consultaId: string }> },
) {
  const { consultaId } = await params;
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
    const requisicao = await criarRequisicao(
      consultaId,
      dados.servicoId.trim(),
      dados.conteudo.trim(),
    );

    return Response.json(requisicao, { status: 201 });
  } catch {
    return Response.json(
      { mensagem: "Não foi possível criar a requisição." },
      { status: 500 },
    );
  }
}
