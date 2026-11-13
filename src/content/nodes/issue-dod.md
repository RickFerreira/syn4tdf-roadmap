---
id: issue-dod
phase: issues
order: 5
title: Checklist antes de pedir revisão
summary: A "Definition of Done" do novato, para o MR não voltar.
estimate: 10 min
checklist:
  - Branch criada da base correta e MR apontando para ela
  - Commits no padrão; nada de arquivos locais (profiles.clj, .env, user-data alterado)
  - Banco versionado e print da DATABASECHANGELOG no MR
  - Vídeo ou prints da funcionalidade funcionando
  - Issue referenciada, "Closes" removido, milestone e labels definidas
  - Repositórios Clojure com versão e CHANGELOG atualizados
  - Passei pelos checklists de code review do código que alterei (front, Java ou Clojure)
---
Use esta lista toda vez que for pedir revisão, não só no treinamento. Os itens vêm dos problemas mais comuns apontados nos reviews.

Se algum item não se aplica (por exemplo, o MR não mexe em banco), simplesmente marque.
