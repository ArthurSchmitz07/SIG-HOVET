# SIG-HOVET — Requisições

Desafio técnico universitário para reproduzir o componente Requisições do SIG-HOVET.
Objetivo: reproduzir o componente de requisições de uma consulta veterinária, com CRUD integrado a um backend.

Vídeo curto do funcionamento: [assista à gravação de tela](demo/demonstracao.webm). Ele mostra a criação, visualização, edição e exclusão de uma requisição de demonstração, sem narração.

## Estado atual

Listagem, visualização, criação, edição e exclusão de requisições integradas a um backend próprio nas rotas do Next.js. Os registros da consulta de demonstração são persistidos em `data/requisicoes.json`. Axios faz as chamadas HTTP e TanStack Query consulta e atualiza a lista. A busca oferece três serviços de demonstração. A exclusão exige confirmação e só fecha a janela após a remoção no servidor.

Tecnologias exigidas: Next.js, TypeScript, Ant Design, React Hook Form, TanStack Query, Axios e Tailwind CSS.

## Executar no Windows / PowerShell

Na pasta do projeto:

```powershell
npm.cmd ci
npm.cmd run dev
```

`npm.cmd ci` instala as versões registradas em `package-lock.json`. Após a instalação inicial, basta executar `npm.cmd run dev`.

Abra http://localhost:3000. Para encerrar o servidor, use Ctrl+C no terminal.

Usamos `npm.cmd` para evitar eventuais restrições do PowerShell ao arquivo `npm.ps1`.

## Verificar o projeto

```powershell
npm.cmd run lint
npm.cmd run build
npx.cmd tsc --noEmit
```

O lint analisa o código; o build compila a aplicação para produção; o TypeScript verifica os tipos.

## Arquivos para estudar primeiro

- `package.json`: dependências e comandos do projeto.
- `package-lock.json`: versões exatas das dependências instaladas.
- `src/app/page.tsx`: conteúdo da página inicial.
- `src/components/requisicoes.tsx`: interface, formulário e chamadas HTTP para listar, criar, editar e excluir, com confirmação de exclusão.
- `src/lib/requisicoes.ts`: leitura, criação, edição e exclusão dos registros no arquivo JSON.
- `src/app/api/consultas/[consultaId]/requisicoes/[requisicaoId]/route.ts`: rotas PATCH e DELETE para editar ou excluir uma requisição da consulta, com retorno 404 se ela não existir nessa consulta.
- `src/app/layout.tsx`: estrutura compartilhada e suporte de estilos do Ant Design.
- `src/app/globals.css`: estilos globais e importação do Tailwind CSS.

## Revisar o CRUD

1. Execute `npm.cmd run dev` e abra http://localhost:3000.
2. Clique em “Nova requisição”: os campos devem começar vazios.
3. Clique em “Selecione um procedimento”, busque “hemo” e selecione “Hemograma”.
4. Preencha o conteúdo e salve: a janela deve fechar e a lista atualizar automaticamente.
5. Clique em “Visualizar requisição”, altere o conteúdo e salve.
6. Recarregue a página e reabra a requisição: o conteúdo alterado deve permanecer salvo.
7. Altere novamente o conteúdo e clique em “Fechar”: essa alteração não deve ser salva.
8. Tente salvar um conteúdo vazio: uma mensagem de erro deve aparecer e a janela deve continuar aberta.
9. Em uma requisição criada para teste, clique em “Excluir” e depois “Cancelar”: o registro deve permanecer salvo.
10. Clique novamente em “Excluir” e depois em “Confirmar exclusão”: as janelas devem fechar e a lista deve atualizar automaticamente.
11. Recarregue a página e confirme que o registro excluído não reaparece.

`useState` guarda o estado das janelas, da busca e o identificador da requisição aberta. `useForm` controla os campos; `reset` preenche ou limpa o formulário ao abrir; `Controller` conecta o campo do Ant Design ao React Hook Form. `useMutation` acompanha as operações de criação, edição e exclusão; após concluir uma operação, `invalidateQueries` solicita a atualização da lista. Os modelos pertencem ao backend próprio, sem representar o contrato do SIG-HOVET original.

## Regras de aprendizado

Leia `AGENTS.md`, `AGENTSS.md` e `CONTEXTO_SIG_HOVET.md` antes de continuar. O desenvolvimento deve ocorrer em etapas pequenas, com explicações e revisão do estudante.
