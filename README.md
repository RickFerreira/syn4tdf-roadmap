# Trilha de onboarding · Synchro4TDF

Aplicação React com TypeScript e Vite. As etapas aparecem como cards; cada card abre um modal com orientações e materiais ao ser clicado. Os modais começam fechados.

## Executar

Com Node.js 22.12 ou superior:

```sh
npm ci
npm run dev
```

Abra o endereço informado pelo Vite (normalmente http://localhost:5173). As alterações nos arquivos são atualizadas automaticamente. Use esse servidor para desenvolver; o HTML da raiz é a entrada do Vite.

```sh
npm run check     # Verifica tipos, gera o site, valida os dados e executa testes
npm test          # Executa os testes de renderização e conteúdo
npm run build     # Gera o site em dist/
npm run preview   # Serve o build para conferência
```

## Organização

```text
index.html                         Entrada HTML com o elemento root
src/
  main.tsx                         Inicializa React e estilos
  app/
    App.tsx                        Composição da página
    Header.tsx                     Cabeçalho e legenda
    Footer.tsx                     Rodapé
  components/                      Componentes reutilizáveis
    Modal.tsx                      Janela controlada por open/onClose
    Icon.tsx                       Renderização de ícones
    icon-paths.ts                  Catálogo único dos ícones
  features/
    roadmap/
      data/                        Conteúdo e ordem das fases
      types.ts                     Formatos de fase, etapa e seção
      components/
        Track.tsx                  Trilha completa
        PhaseSection.tsx           Uma fase e suas linhas
        StepGroup.tsx              Um grupo de etapas
        StepCard.tsx               Card e estado do modal
        StepContent.tsx            Orientações e materiais
  styles/
    global.css                     Estilos e responsividade
scripts/check.js                   Validação dos dados e do build
tests/roadmap.test.tsx             Testes de renderização e conteúdo
```

### Como a página é montada

O `index.html` contém o elemento `<div id="root">` e carrega `src/main.tsx`. Esse arquivo inicializa o React dentro de `root`, importa o CSS e renderiza `App`. Por isso os cards não são escritos diretamente no HTML.

`App.tsx` reúne `Header`, `Track` e `Footer`. `Header.tsx` contém o cabeçalho e a legenda; `Footer.tsx` contém o rodapé. `App.tsx` importa a lista `phases` de `src/features/roadmap/data/index.ts` e a passa para `Track`. Quando um componente recebe informações dessa forma, elas são chamadas de **props**. Por exemplo, `<Track phases={phases} />` entrega a lista de fases à trilha.

```text
index.html → main.tsx → App.tsx
                         ├── Legenda, cabeçalho e rodapé
                         └── Track ← data/index.ts ← arquivos das fases
                              └── PhaseSection (uma por fase)
                                   ├── StepCard (etapa comum)
                                   └── StepGroup (grupo)
                                        └── StepCard (cada filho)
                                             └── Modal
                                                  └── StepContent
```

Cada componente tem seu próprio arquivo. `Track` organiza a trilha, `PhaseSection` organiza uma fase e `StepGroup` organiza os filhos de um grupo. `Modal` e `Icon` não dependem dos dados da trilha e podem ser usados em outras funcionalidades.

### Como o conteúdo é organizado

Os arquivos em `src/features/roadmap/data/` guardam objetos com textos e links. Eles não desenham a interface. Cada arquivo exporta uma fase, e `data/index.ts` reúne essas fases na ordem de exibição.

| Estrutura | O que representa | Campos principais |
| --- | --- | --- |
| `Phase` | Uma fase da trilha | `id`, `title`, `color`, `nodes` |
| `Step` | Uma etapa ou um grupo de etapas | `label`, `description`, `href`, `sections`, `children` |
| `Section` | Um bloco de orientações dentro do modal | `title`, `paragraphs`, `items` |

`nodes` é a lista de etapas de uma fase. Uma etapa com `children` vira um grupo, como Alura; seus filhos viram cards individuais. `sections` divide o conteúdo do modal em blocos. Descrições, parágrafos e itens aceitam links dentro do texto com `[texto](https://endereco)`.

`src/features/roadmap/types.ts` descreve esses formatos para o TypeScript. Ele ajuda o editor a sugerir campos e apontar erros, mas não contém o conteúdo da página. Os arquivos `.ts` guardam dados e tipos; os `.tsx` também permitem escrever a interface em JSX, a sintaxe parecida com HTML usada nos componentes React.

### Como os modais abrem e fecham

Cada `StepCard` possui seu próprio estado `open`, criado com `useState(false)`. Isso faz o modal começar fechado. Ao clicar no card, `setOpen(true)` muda esse estado e o componente `Modal` abre o elemento nativo `dialog`.

Ao fechar pelo botão, pela tecla Escape ou pelo clique fora, `Modal` chama a função `onClose` recebida do card. Essa função executa `setOpen(false)`. O conteúdo exibido vem de `StepContent`, que transforma a descrição, as seções e os links da etapa em elementos React.

Assim, `Modal` cuida da janela, `StepContent` cuida do conteúdo e `StepCard` decide quando abrir. Para alterar apenas um texto ou link, basta editar o arquivo da fase.

### Onde fazer cada alteração

| Quero alterar… | Onde editar |
| --- | --- |
| Textos, links e orientações | Arquivo da fase em `src/features/roadmap/data/` |
| Ordem das fases | Lista `phases` em `src/features/roadmap/data/index.ts` |
| Ordem das etapas ou cursos | Listas `nodes` ou `children` da fase |
| Cabeçalho e legenda | `src/app/Header.tsx` |
| Rodapé | `src/app/Footer.tsx` |
| Composição da página | `src/app/App.tsx` |
| Organização da trilha | `src/features/roadmap/components/Track.tsx` |
| Organização das fases e grupos | `PhaseSection.tsx` e `StepGroup.tsx` na mesma pasta |
| Card e ação de abrir o modal | `src/features/roadmap/components/StepCard.tsx` |
| Estrutura e fechamento da janela | `src/components/Modal.tsx` |
| Exibição das orientações e materiais | `src/features/roadmap/components/StepContent.tsx` |
| Adicionar ícones | `src/components/icon-paths.ts` |
| Cores, espaçamentos e responsividade | `src/styles/global.css` |
| Campos aceitos nos dados | `src/features/roadmap/types.ts` |

A cor de cada fase vem do campo `color`. Por exemplo, `color: "config"` usa as variáveis `--fase-config` e `--fase-config-soft` definidas no CSS.

### Arquivos de configuração e build

- `package.json` define as dependências e os comandos `dev`, `build`, `check` e `preview`.
- `package-lock.json` registra as versões instaladas para que `npm ci` reproduza a instalação.
- `tsconfig.json` configura a verificação de TypeScript.
- `vite.config.ts` configura o servidor de desenvolvimento e a geração do site.
- `scripts/check.js` valida o conteúdo, como IDs únicos, links, ícones e cores cadastradas no CSS.
- `.github/workflows/jekyll-gh-pages.yml` automatiza a compilação e a publicação.
- `dist/` contém o resultado gerado para publicação. Não é a pasta de edição do projeto.

## Adicionar conteúdo

Edite a lista `nodes` no arquivo correspondente em `src/features/roadmap/data/`, por exemplo `configuracao-ambiente.ts`:

```ts
{
  label: "Configuração inicial",
  icon: "doc",
  description: "Prepare as ferramentas para começar.",
  sections: [
    { title: "Passos", items: ["Instale as ferramentas indicadas pelo time."] },
  ],
  href: "https://exemplo.com.br/guia",
  linkLabel: "Abrir guia",
},
```

Uma etapa pode ter apenas `label`. Para criar um grupo, adicione `children` com as etapas filhas. Não precisa informar `type`. Omita `href` ou use `"#"` enquanto o link estiver pendente. Os cabeçalhos dos grupos organizam os cards; cada filho abre seu próprio modal.

Reordene as fases em `src/features/roadmap/data/index.ts`. Consulte o [guia de conteúdo](docs/conteudo.md) para os demais campos. Edite os fontes em `src/`, pois `dist/` é gerado automaticamente.

## Reutilizar o modal

O componente recebe o estado de abertura, a função de fechamento, um título e o conteúdo como JSX:

```tsx
import { useState } from "react";
import { Modal } from "../components/Modal";

export function Ajuda() {
  const [open, setOpen] = useState(false);

  return <>
    <button onClick={() => setOpen(true)}>Abrir ajuda</button>
    <Modal open={open} onClose={() => setOpen(false)} title="Ajuda">
      <p>Escreva aqui as orientações.</p>
    </Modal>
  </>;
}
```

`subtitle` e `color` são opcionais. O modal usa o elemento nativo `dialog`, associa o título acessível e fecha pelo botão, pela tecla Escape ou pelo clique fora. O React renderiza textos como texto, sem inserir HTML fornecido pelo conteúdo.

## Publicação no GitHub Pages

O GitHub Pages hospeda os arquivos estáticos gerados pelo Vite. O navegador recebe HTML, CSS e JavaScript e executa o React para montar os cards e modais. Não é necessário manter um servidor Node.js nem `npm run dev` rodando para o site publicado funcionar.

### Configuração inicial

1. Abra o repositório `RickFerreira/syn4tdf-roadmap` no GitHub.
2. Acesse **Settings → Pages**.
3. Em **Build and deployment → Source**, selecione **GitHub Actions**.
4. Faça commit das alterações do projeto e envie para a branch `main`, incluindo `package-lock.json` e `.github/workflows/jekyll-gh-pages.yml`.
5. Na aba **Actions**, acompanhe o workflow **Deploy TypeScript site to GitHub Pages**. Aguarde os jobs `build` e `deploy` concluírem com sucesso.

Após a publicação, o endereço esperado é **https://rickferreira.github.io/syn4tdf-roadmap/**. O endereço efetivo aparece em **Settings → Pages** e no resultado do deploy.

Consulte também a [documentação oficial sobre a origem de publicação](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

### O que acontece ao enviar alterações

O workflow em [`.github/workflows/jekyll-gh-pages.yml`](.github/workflows/jekyll-gh-pages.yml) executa automaticamente a cada push em `main`:

1. Obtém o código e prepara o Node.js 22.
2. Instala as dependências com `npm ci`, usando o arquivo de lock.
3. Executa `npm run check`: verifica os tipos, gera o site com Vite, valida o conteúdo das fases e executa os testes.
4. Envia a pasta `dist/` como artefato da publicação.
5. Publica esse artefato no GitHub Pages.

Se a compilação ou a validação falhar, o deploy não é executado. Apesar do nome `jekyll-gh-pages.yml`, esse workflow usa o build do Vite; não usa Jekyll.

O arquivo [`vite.config.ts`](vite.config.ts) define `base: "./"`, gerando caminhos relativos para os arquivos do site funcionarem sob `/syn4tdf-roadmap/`.

### Atualizar o site

Edite os componentes em `src/features/roadmap/components/` ou o conteúdo em `src/features/roadmap/data/`. Antes de enviar, confira localmente:

```sh
npm run check
npm run preview
```

Abra o endereço informado pelo preview para conferir a versão compilada. Depois faça commit e push para `main`; o GitHub publica a atualização automaticamente. Não edite nem envie `dist/` manualmente: essa pasta é gerada pelo build e está no `.gitignore`.

Também é possível executar uma publicação manual em **Actions → Deploy TypeScript site to GitHub Pages → Run workflow**, selecionando `main`.

### Se a publicação falhar

- Abra a execução na aba **Actions** e leia o erro da etapa que falhou.
- Se o erro estiver na compilação ou no conteúdo, execute `npm run check` localmente, corrija e envie um novo commit.
- Se o erro estiver na configuração do Pages, confira se **Settings → Pages → Source** está em **GitHub Actions**.
- Se a atualização não aparecer, confirme que o push foi para `main` e que o job `deploy` terminou com sucesso antes de recarregar a página.

## Como evoluir o projeto

- **Nova etapa:** adicione um objeto em `nodes` no arquivo da fase. Os componentes já criam o card e o modal.
- **Nova fase:** crie um arquivo em `src/features/roadmap/data/`, usando uma fase existente como modelo, e registre-o em `data/index.ts`.
- **Novo ícone:** adicione seus caminhos SVG em `src/components/icon-paths.ts`. Os nomes aceitos pelo TypeScript e pelo validador vêm desse mesmo catálogo.
- **Novo comportamento da trilha:** altere ou crie um componente em `src/features/roadmap/components/`.
- **Componente útil em outras telas:** coloque em `src/components/`, recebendo o conteúdo por props, sem importar os dados da trilha.
- **Nova funcionalidade independente:** crie uma pasta própria em `src/features/` e conecte-a em `src/app/App.tsx` quando necessário.

Mantenha textos e links nos arquivos de dados; mantenha o comportamento nos componentes. Não é necessário criar serviços, contextos ou hooks para editar conteúdo. O estado de abertura fica no card que o utiliza.

Antes de concluir uma alteração, execute `npm run check`. Os testes conferem a renderização dos cards, os modais inicialmente fechados, os títulos acessíveis e o tratamento de textos e links. Para alterações de interação ou aparência, confira também o navegador com `npm run dev`, incluindo abertura por clique, fechamento por Escape e a versão em tela estreita.

## Links dentro do texto

Uma etapa pode ter vários links na mesma frase. Use `[texto clicável](URL)` na descrição, em cada parágrafo ou em cada item:

```ts
{
  label: "Acessos do time",
  description: "Entre no [Zimbra](https://webmail.synchro.com.br/) e no [Bitrix](https://colabore.synchro.com.br/extranet/).",
  sections: [
    {
      title: "Primeiros passos",
      paragraphs: [
        "Consulte o [guia](https://exemplo.com.br/guia) antes de acessar o [portal](https://exemplo.com.br/portal).",
      ],
      items: [
        "Confirme seu acesso no [portal](https://exemplo.com.br/portal).",
      ],
    },
  ],
},
```

Os links aparecem no próprio texto, sem uma seção automática de materiais. Substitua as URLs de exemplo pelos endereços reais. Textos sem links continuam funcionando normalmente. `href` e `linkLabel` ainda podem ser usados para um link simples ao final, mas não são necessários quando o link já está no texto.

O componente `src/components/InlineText.tsx` interpreta essa escrita e também aceita **negrito**, *itálico* e código entre crases. HTML não é executado. Links HTTP/HTTPS válidos abrem em nova aba; links pendentes ou com protocolos não permitidos aparecem apenas como texto.

### Área de links com título

Para mostrar links lado a lado ao final das orientações, adicione `links` à etapa. O título é livre, e os itens aparecem como textos clicáveis separados por um ponto:

```ts
links: {
  title: "Acessos",
  items: [
    { label: "Zimbra", href: "https://webmail.synchro.com.br/" },
    { label: "Bitrix", href: "https://colabore.synchro.com.br/extranet/" },
  ],
},
```

O resultado é o título **Acessos** seguido de **Zimbra · Bitrix**, com cada nome apontando para sua URL. A área de links aparece depois da descrição e das seções. Links pendentes (`"#"`) não são exibidos; se não houver links válidos, a área inteira fica oculta. Links dentro das frases continuam disponíveis.
