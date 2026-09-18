/**
 * ============================================================
 *  DADOS DA TRILHA — Synchro4TDF Onboarding
 * ============================================================
 * Este é o ÚNICO arquivo que você deve editar no dia a dia.
 * Não precisa mexer em HTML nem CSS para adicionar/remover/mudar nós.
 *
 * Estrutura geral:
 *
 * PHASES = [
 *   {
 *     id: "identificador-unico-da-fase",
 *     title: "Nome que aparece no chip da fase",
 *     color: "acesso" | "config" | "treino" | "issue",  <- ver TIPOS DE COR abaixo
 *     nodes: [ ...lista de nós desta fase... ]
 *   },
 *   ...
 * ]
 *
 * TIPOS DE COR (definidos no CSS, em :root):
 *   "acesso" -> cinza-azulado  (Primeiros acessos)
 *   "config" -> azul           (Configuração de ambiente)
 *   "treino" -> dourado        (Treinamento)
 *   "issue"  -> verde          (Primeiras issues)
 *
 *   Se criar uma fase nova, adicione um novo par de variáveis
 *   --fase-NOME e --fase-NOME-soft lá no style.css e use o
 *   mesmo NOME aqui em "color".
 *
 * ---------------------------------------------------------------
 * TIPOS DE NÓ
 * ---------------------------------------------------------------
 *
 * 1) NÓ SIMPLES (a maioria dos casos) — tem link direto:
 *    {
 *      type: "link",
 *      label: "Texto que aparece no card",
 *      href: "https://...",       <- link real (Notion, wiki, vídeo, etc)
 *      icon: "doc" | "alura"      <- ícone mostrado no card (ver ÍCONES abaixo)
 *    }
 *
 * 2) GRUPO com sub-nós (ex: "Alura" que abre em Trilha Front / Trilha Back) —
 *    o grupo em si NÃO tem link, só os filhos têm:
 *    {
 *      type: "group",
 *      label: "Texto do grupo (ex: Alura)",
 *      icon: "alura",
 *      children: [
 *        { label: "Trilha Front-end", href: "https://..." },
 *        { label: "Trilha Back-end",  href: "https://..." }
 *      ]
 *    }
 *
 * ÍCONES disponíveis (ver ICONS no app.js se quiser adicionar um novo):
 *   "doc"   -> ícone de documento (padrão p/ Notion/Wiki)
 *   "alura" -> ícone de camadas/trilha (padrão p/ cursos)
 *   "plus"  -> ícone de "+" (padrão p/ issues/tarefas)
 *
 * Dica: se um item ainda não tem link definido, use href: "#"
 * temporariamente — o card aparece normal, só não leva a lugar
 * nenhum ainda. Troque assim que tiver o link real.
 * ============================================================
 */

const PHASES = [
  {
    id: "primeiros-acessos",
    title: "Primeiros acessos",
    color: "acesso",
    nodes: [
      { type: "link", label: "Zimbra",   href: "#", icon: "doc" },
      { type: "link", label: "Bitrix",   href: "#", icon: "doc" },
      { type: "link", label: "Horários", href: "#", icon: "doc" },
    ],
  },
  {
    id: "configuracao-ambiente",
    title: "Configuração de ambiente",
    color: "config",
    nodes: [
      { type: "link", label: "Configuração inicial",     href: "#", icon: "doc" },
      { type: "link", label: "Banco de dados",            href: "#", icon: "doc" },
      { type: "link", label: "Clojure (microsserviços)",  href: "#", icon: "doc" },
    ],
  },
  {
    id: "treinamento",
    title: "Treinamento",
    color: "treino",
    nodes: [
      { type: "link", label: "Entendendo o TDF e contabilidade",   href: "#", icon: "doc" },
      { type: "link", label: "Fluxo de trabalho e reuniões",       href: "#", icon: "doc" },
      {
        type: "group",
        label: "Alura",
        icon: "alura",
        children: [
          { label: "Trilha Front-end", href: "#" },
          { label: "Trilha Back-end",  href: "#" },
        ],
      },
      { type: "link", label: "Arquitetura do projeto",   href: "#", icon: "doc" },
      { type: "link", label: "CVS",                       href: "#", icon: "doc" },
      { type: "link", label: "Complementos",               href: "#", icon: "doc" },
      { type: "link", label: "Versionando objetos",        href: "#", icon: "doc" },
      { type: "link", label: "Relatórios no Reports",      href: "#", icon: "doc" },
      { type: "link", label: "API Gateway",                href: "#", icon: "doc" },
      { type: "link", label: "Contab",                      href: "#", icon: "doc" },
    ],
  },
  {
    id: "primeiras-issues",
    title: "Primeiras issues",
    color: "issue",
    nodes: [
      { type: "link", label: "Atualiza e versiona CV",            href: "#", icon: "plus" },
      { type: "link", label: "Relatório de Benefícios Fiscais",   href: "#", icon: "plus" },
      { type: "link", label: "CRUD de nova tela",                  href: "#", icon: "plus" },
    ],
  },
];
