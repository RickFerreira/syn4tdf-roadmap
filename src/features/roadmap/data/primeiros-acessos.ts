import type { Phase } from "../types";

const phase: Phase = {
  id: "primeiros-acessos",
  title: "Primeiros acessos",
  color: "acesso",
  nodes: [
    {
      label: "Zimbra",
      links: {
        title: "Acessos",
        items: [{ label: "Zimbra", href: "https://webmail.synchro.com.br/#1" }],
      },
      icon: "doc",
      description: "Esta etapa reúne as orientações para seu primeiro acesso ao Zimbra.",
      sections: [
        {
          title: "Antes de começar",
          paragraphs: ["Confirme com o time os dados de acesso e o endereço utilizado para entrar na plataforma."],
        },
        {
          title: "Primeiros passos",
          items: [
            "Acesse o Zimbra com as credenciais fornecidas pelo time.",
            "Confira se consegue entrar na sua conta.",
            "Se encontrar alguma dificuldade, peça ajuda ao responsável pelo seu onboarding.",
          ],
        },
      ],
    },
    { label: "Bitrix", description: "Acesse o [Bitrix](https://colabore.synchro.com.br/extranet/).", icon: "doc" },
    { label: "Horários", href: "#", icon: "doc" },
  ],
};

export default phase;
