# Guia de edição do conteúdo

## 1. Encontre a fase

Abra o arquivo correspondente em `src/features/roadmap/data/`. A ordem das entradas em `nodes` é a ordem de leitura na página. No grupo de cursos, a ordem é definida por `children`.

Use textos com links no formato `[texto](https://endereco)`, sem HTML. Para facilitar o onboarding, procure descrever o objetivo da etapa, o que é necessário antes de começar, os passos e como confirmar que a etapa foi concluída.

## 2. Adicione uma etapa

Inclua um objeto na lista `nodes` da fase:

```ts
{
  label: "Nome da plataforma",
  icon: "doc",
  href: "https://exemplo.com.br/",
  linkLabel: "Abrir plataforma",
  description: "Entenda para que serve esta plataforma no dia a dia do time.",
  sections: [
    {
      title: "Antes de começar",
      paragraphs: ["Solicite suas credenciais ao responsável pelo onboarding."],
    },
    {
      title: "Primeiros passos",
      items: ["Entre com sua conta.", "Confira se os recursos do time estão disponíveis."],
    },
    {
      title: "Quando concluir",
      paragraphs: ["Confirme com o responsável que o acesso está funcionando."],
    },
  ],
},
```

### Referência dos campos

| Campo | Uso |
| --- | --- |
| `label` | Obrigatório. Nome exibido no card e no título dos detalhes. |
| `icon` | Opcional. `"doc"` (padrão), `"alura"` ou `"plus"`. |
| `href` | Opcional. URL completa do material principal. Omita ou use `"#"` enquanto estiver pendente. |
| `linkLabel` | Opcional. Texto do link principal; o padrão é “Acessar material principal”. |
| `description` | Opcional. Introdução da etapa. Aceita links no formato `[texto](https://endereco)`. |
| `sections` | Opcional. Lista de seções com `title`, `paragraphs` (textos) e/ou `items` (lista de passos). |
| `children` | Obrigatório em grupos. Lista de etapas que abrem seus próprios detalhes. |

Uma etapa pode começar apenas com `label`. Sem orientações, a janela mostra uma mensagem de conteúdo em preparação. Links pendentes não aparecem como botões. Links HTTP/HTTPS válidos abrem em uma nova aba.

## 3. Agrupe etapas relacionadas

```ts
{
  label: "Alura",
  icon: "alura",
  children: [
    {
      label: "Trilha Front-end",
      href: "https://exemplo.com.br/front",
      description: "Cursos para iniciar no front-end do projeto.",
    },
    { label: "Trilha Back-end", href: "#" },
  ],
},
```

Os filhos aceitam os mesmos campos de conteúdo de uma etapa, sem precisar indicar um tipo. O grupo exibe o nome e os filhos; escreva orientações e links nos filhos, pois são eles que abrem os detalhes. Há um único nível de agrupamento.

## 4. Crie uma fase

1. Crie `src/features/roadmap/data/nome-da-fase.ts` com a estrutura abaixo.
2. Importe o arquivo em `src/features/roadmap/data/index.ts` e inclua-o na lista `phases`, na posição desejada.
3. Escolha uma cor existente ou defina uma nova em `src/styles/global.css`.

```ts
import type { Phase } from "../types";

const phase: Phase = {
  id: "nome-da-fase",
  title: "Nome da fase",
  color: "treino",
  nodes: [
    { label: "Primeira etapa", icon: "doc" },
  ],
};

export default phase;
```

O `id` deve ser único e usar letras minúsculas, números e hífens. A legenda e a numeração são geradas a partir da lista de fases.

### Cores disponíveis

| `color` | Aparência |
| --- | --- |
| `acesso` | Cinza-azulado |
| `config` | Azul |
| `treino` | Dourado |
| `issue` | Verde |

Para uma cor nova, adicione as duas variáveis no bloco `:root` do CSS:

```css
--fase-nova: #6750a4;
--fase-nova-soft: #f1edfa;
```

Use `color: "nova"` no arquivo da fase.

## 5. Valide antes de publicar

Execute `npm run check` na raiz do projeto. As mensagens de erro indicam o campo a corrigir, como `phases[0].nodes[1].href` (os índices começam em zero).

Depois, abra a página pelo servidor local e confira a ordem das etapas, a janela de detalhes e os links alterados. Para mudanças visuais, confira também a versão em tela estreita.

Os imports dos componentes e dados podem omitir a extensão; o Vite resolve os arquivos TypeScript. Edite os fontes em `src/`; a pasta `dist/` é gerada automaticamente.

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
