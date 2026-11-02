import Requisicoes from "@/components/requisicoes";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold">SIG-HOVET</h1>
        <p className="mb-6 mt-2 text-gray-600">Requisições de uma consulta veterinária</p>
        <Requisicoes />
      </div>
    </main>
  );
}
