# Orientações do projeto SIG-HOVET

## Contexto e objetivo

Este projeto faz parte de um desafio técnico universitário, com entrega até **01/11/2026**.

O objetivo é reproduzir apenas o componente de **Requisições de uma consulta veterinária**, integrado a um backend. Priorize um CRUD funcional e simples, com código compreensível e sem exigir perfeição visual.

## Escopo funcional

- Listar as requisições de uma consulta.
- Visualizar uma requisição.
- Criar uma requisição.
- Editar uma requisição.
- Excluir uma requisição.
- Permitir buscar e selecionar um serviço e preencher o conteúdo da requisição.
- Integrar as operações ao backend. Dados simulados, se usados temporariamente, não substituem essa integração na entrega.

Não implementar impressão, ícones ou editor WYSIWYG. Para o conteúdo da requisição, utilizar inicialmente um campo de texto simples. Não ampliar o projeto para outros componentes do sistema veterinário sem solicitação.

## Tecnologias obrigatórias

- **Next.js**: estrutura da aplicação React e suas rotas.
- **TypeScript**: JavaScript com tipos para tornar os dados e contratos mais claros.
- **Ant Design**: componentes de interface, como tabelas, formulários, campos e botões.
- **React Hook Form**: controle e validação dos formulários.
- **TanStack Query**: consulta, cache e atualização dos dados vindos do backend.
- **Axios**: requisições HTTP ao backend.
- **Tailwind CSS**: ajustes simples de estilo e organização do layout.

Use essas ferramentas com responsabilidades claras e evite adicionar bibliotecas ou abstrações sem necessidade concreta.

## Forma de colaboração e aprendizado

O estudante tem experiência com **Python**, mas está começando do zero com **JavaScript e React**. O aprendizado durante a implementação faz parte do objetivo.

- Trabalhe em etapas pequenas, cada uma com um objetivo claro e fácil de revisar.
- Antes de alterar arquivos, explique brevemente o que será feito e por quê.
- Apresente os conceitos de JavaScript, TypeScript, React e Next.js conforme aparecerem no trabalho. Use comparações com Python quando ajudarem e explique os termos novos.
- Não implemente tudo de uma vez. Evite entregar grandes blocos de código sem explicação.
- Ao concluir cada etapa, informe quais arquivos mudaram, explique o comportamento implementado e indique como conferir o resultado.
- Aguarde a revisão do estudante antes de iniciar a próxima etapa. Uma solicitação explícita pode autorizar várias alterações dentro de uma mesma etapa.
- Prefira código direto, nomes claros e soluções simples. Evite arquitetura excessiva, otimizações prematuras e refatorações fora do objetivo da etapa.
- Mantenha o foco no CRUD e na integração antes de investir em refinamentos visuais.

## Integração e verificação

- Antes de implementar a integração, confira as informações disponíveis sobre o backend: URL, endpoints, formatos dos dados, identificadores, vínculo com a consulta e autenticação, se houver.
- Se faltar uma informação necessária, explique a dúvida e peça esclarecimento; não trate contratos inventados como definitivos.
- Trate de forma simples os estados de carregamento, lista vazia e erro, além do retorno das operações de criação, edição e exclusão.
- Verifique cada etapa de maneira proporcional à alteração e descreva o que foi efetivamente conferido. Não afirme que testes ou integração funcionaram sem verificá-los.
- Antes da entrega, confira o fluxo completo de listagem, visualização, criação, edição e exclusão com o backend.

## Limite da etapa inicial

A autorização inicial é **somente criar este AGENTS.md**. Não instalar dependências, inicializar a aplicação ou implementar funcionalidades nesta etapa. Aguarde a próxima solicitação do estudante.
