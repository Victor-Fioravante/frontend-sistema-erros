# Sistema de Gerenciamento de Sugestões e Avaliações

Este projeto é uma aplicação web front-end desenvolvida para gerenciar sugestões de soluções para erros de comunicação com o governo e permitir que os usuários avaliem essas sugestões. A interface é reativa e foi construída utilizando tecnologias modernas como React, TypeScript e Vite, com a estilização feita através da biblioteca de componentes Chakra UI.

## Visão Geral

O objetivo principal da aplicação é centralizar e organizar sugestões para códigos de erro específicos, oferecendo uma plataforma onde os usuários podem não apenas consultar as sugestões existentes, mas também cadastrar novas e avaliar as que já foram publicadas. O sistema também fornece um dashboard para visualizar a performance das avaliações.

## Funcionalidades Principais

* **Cadastro de Sugestões**: Usuários podem submeter novas sugestões para um código de erro de 6 dígitos.
* **Listagem e Busca de Sugestões**: Visualização de todas as sugestões cadastradas com a possibilidade de filtrar por um código de erro específico.
* **Avaliação de Sugestões**: Usuários podem avaliar uma sugestão, fornecendo um código de cliente (com 6 dígitos), um comentário e uma classificação (positiva ou negativa).
* **Dashboard de Avaliações**: Uma página de dashboard que exibe a média total de avaliações positivas e um gráfico com a média por sugestão.
* **Visualização Detalhada**: É possível expandir uma sugestão para ver o texto completo e visualizar todas as avaliações recebidas, incluindo comentários e data.
* **Filtragem por Período**: No dashboard, as avaliações podem ser filtradas por um intervalo de datas.
* **Interface Responsiva**: O layout se adapta a diferentes tamanhos de tela, garantindo uma boa experiência tanto em desktops quanto em dispositivos móveis.

## Tecnologias Utilizadas

O projeto foi construído com as seguintes tecnologias e bibliotecas:

* **React**
* **TypeScript**
* **Vite**
* **Chakra UI**
* **React Router DOM**
* **Recharts**
* **ESLint**

## Configuração e Instalação

Para rodar este projeto localmente, siga os passos abaixo.

### Pré-requisitos

* Node.js (versão >= 18.18.0)
* npm ou yarn

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/victor-fioravante/frontend-sistema-erros.git](https://github.com/victor-fioravante/frontend-sistema-erros.git)
    cd frontend-sistema-erros
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```
    ou
    ```bash
    yarn install
    ```

3.  **Configuração da API:**
    Certifique-se de que o back-end da aplicação está rodando. O front-end tentará se conectar à API no endereço `http://localhost:3000/api`. Se o seu back-end estiver em um endereço diferente, altere a constante `API_URL` no arquivo `src/api.ts`.

### Rodando a Aplicação

Para iniciar o servidor de desenvolvimento, execute:
```bash
npm run dev
````

A aplicação estará disponível em `http://localhost:5173` (ou outra porta, se a 5173 estiver em uso).

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
frontend-sistema-erros/
├── public/
└── src/
    ├── api.ts              # Funções para comunicação com a API
    ├── components/         # Componentes React reutilizáveis
    │   ├── evaluationModal/
    │   ├── header/
    │   ├── menu/
    │   └── suggestion/
    ├── pages/              # Páginas da aplicação (rotas)
    ├── router/             # Configuração das rotas
    ├── main.tsx            # Ponto de entrada principal da aplicação
    └── index.css           # Estilos globais
```

  * **`src/api.ts`**: Contém todas as funções que fazem chamadas para a API back-end, como `getSuggestions`, `createSuggestion`, `getEvaluations`, etc.
  * **`src/components`**: Abriga os componentes reutilizáveis. Por exemplo, `SuggestionItem` é o card que exibe cada sugestão na lista, e `EvaluateModal` é o diálogo para submeter uma avaliação.
  * **`src/pages`**: Contém os componentes que funcionam como páginas completas, como `SuggestionList` e `EvaluationList`.
  * **`src/router/routes.tsx`**: Define as rotas da aplicação utilizando o `react-router-dom`.
  * **`src/main.tsx`**: É o arquivo raiz que renderiza a aplicação no DOM e configura o `ChakraProvider` e o `Router`.

## 🔧 Scripts Disponíveis

No diretório do projeto, você pode rodar os seguintes scripts:

  * `npm run dev`: Inicia o servidor de desenvolvimento com Vite.
  * `npm run build`: Compila o projeto para produção.
  * `npm run lint`: Executa o ESLint para verificar a qualidade do código.
  * `npm run preview`: Inicia um servidor local para visualizar a build de produção.

<!-- end list -->
