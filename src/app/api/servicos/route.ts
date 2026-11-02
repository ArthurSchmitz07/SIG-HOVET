export async function GET() {
      const servicos = [
    { id: "colesterol", nome: "Colesterol" },
    { id: "hemograma", nome: "Hemograma" },
    { id: "glicose", nome: "Glicose" },
  ];

  return Response.json(servicos);

}
