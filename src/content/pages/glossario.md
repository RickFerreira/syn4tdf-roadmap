# Glossário fiscal

Para quem chega da computação, o domínio do Synchro4TDF (contabilidade e direito tributário) costuma ser a **maior barreira** do início. Este glossário explica os termos que mais aparecem nas issues, nas telas e nas reuniões, em linguagem de dev e com exemplos.

> Os exemplos usam números redondos e regras simplificadas para fixar a ideia. Alíquotas e regras reais variam por estado, por produto e com o tempo. Na dúvida, pergunte ao time funcional e consulte a documentação da wiki.

## Primeiros conceitos

Comece por aqui. Quase tudo no resto do glossário é combinação destas ideias.

### Tributo, imposto, taxa e contribuição

**Em uma frase:** *tributo* é o gênero (todo valor obrigatório pago ao governo); *imposto*, *taxa* e *contribuição* são espécies.

- **Imposto** não está ligado a uma contraprestação: ICMS, IPI, ISS, IRPJ.
- **Taxa** paga um serviço ou fiscalização específica do Estado.
- **Contribuição** tem destino definido: PIS, COFINS e CSLL financiam a seguridade social.

No dia a dia todo mundo diz "imposto" para tudo, e tudo bem. No código você vai ver o termo genérico **tributo**.

### Esferas: federal, estadual e municipal

**Em uma frase:** cada ente cobra os seus tributos e cria as suas regras e declarações.

| Esfera | Exemplos | Consequência para o produto |
|---|---|---|
| Federal (União) | IPI, PIS, COFINS, IRPJ, CSLL | Regras únicas para o país |
| Estadual (27 UFs) | ICMS | Cada estado tem alíquotas, benefícios, códigos de ajuste e às vezes declarações próprias |
| Municipal (5.570 municípios) | ISS | Cada município pode ter o seu layout de declaração |

É por isso que tanta coisa no Synchro4TDF é parametrizada **por UF** e **por município**.

### Fato gerador

**Em uma frase:** o acontecimento que faz nascer a obrigação de pagar o tributo.

Para o ICMS, é (em regra) a **saída da mercadoria** do estabelecimento; para o ISS, a **prestação do serviço**; para o IRPJ, **ter lucro** no período. A data do fato gerador decide em qual **período de apuração** o valor entra.

### Base de cálculo e alíquota

**Em uma frase:** *base de cálculo* é o valor sobre o qual o imposto incide; *alíquota* é o percentual aplicado.

**Exemplo:** item de R$ 1.000, alíquota de ICMS de 18% → imposto de R$ 180.

A base pode ser **reduzida** por benefício fiscal, **acrescida** de frete, seguro e outras despesas, ou **presumida** (como na substituição tributária).

### Imposto "por dentro" e "por fora"

**Em uma frase:** "por dentro" significa que o imposto faz parte da própria base de cálculo; "por fora" significa que é somado ao preço.

- **ICMS** é por dentro: num preço de R$ 100 com 18%, os R$ 18 já estão nos R$ 100.
- **IPI** é por fora: produto de R$ 100 com IPI de 10% → nota de R$ 110.
- **IBS e CBS**, da Reforma, são por fora.

Isso muda fórmulas, por isso aparece em cálculos e validações.

### Contribuinte e responsável

**Em uma frase:** *contribuinte* é quem pratica o fato gerador; *responsável* é quem a lei obriga a recolher no lugar dele.

A **substituição tributária** e as **retenções na fonte** são casos em que um responsável recolhe o imposto que seria de outra pessoa.

### Obrigação principal x obrigação acessória

**Em uma frase:** a *principal* é **pagar** o tributo; a *acessória* é **informar** ao fisco (escriturar, declarar, entregar arquivos).

Uma empresa grande entrega dezenas de obrigações acessórias por mês, e errar ou atrasar gera multa mesmo se o imposto estiver pago. Gerar e controlar essas obrigações é boa parte do valor do Synchro4TDF.

### Tributo direto x indireto

**Em uma frase:** o *indireto* incide sobre o consumo e o custo é repassado no preço; o *direto* incide sobre quem ganha (renda, lucro).

- **Indiretos:** ICMS, IPI, PIS, COFINS, ISS (e, na Reforma, IBS, CBS e IS).
- **Diretos:** IRPJ, CSLL.

Essa divisão dá nome a duas squads do time: **Indiretos** e **Diretos**.

### Débito e crédito (no sentido fiscal)

**Em uma frase:** *débito* é imposto que a empresa deve, gerado nas **saídas**; *crédito* é imposto que ela pode abater, vindo das **entradas**.

**Exemplo:** a loja compra mercadoria com R$ 1.800 de ICMS destacado na nota (crédito) e vende com R$ 2.700 de ICMS (débito). Paga só a diferença: R$ 900.

Não confunda com débito e crédito **contábeis** (veja *Partidas dobradas*). São conceitos diferentes com o mesmo nome.

### Cumulativo x não cumulativo

**Em uma frase:** no *não cumulativo* a empresa abate o imposto pago nas etapas anteriores; no *cumulativo* não abate, e o imposto vai se acumulando na cadeia.

ICMS e IPI são não cumulativos. PIS e COFINS podem ser cumulativos (Lucro Presumido) ou não cumulativos (Lucro Real). A Reforma Tributária torna IBS e CBS não cumulativos de forma ampla.

### Período de apuração e competência

**Em uma frase:** o intervalo de tempo cujos fatos geradores são somados numa apuração, quase sempre **mensal**.

No produto, quase toda tela e processo pede **empresa, filial e período** (veja a barra do topo do Synchro4TDF: "Empresa … | Período: 11/2026"). Um documento pode ser emitido num mês e entrar na apuração de outro, conforme a data do fato gerador e as regras de corte.

### Benefício fiscal

**Em uma frase:** regra que reduz ou adia o imposto para incentivar um setor ou região.

Formas comuns:

- **Isenção:** a lei dispensa o pagamento.
- **Redução de base de cálculo:** o imposto incide sobre só uma parte do valor.
- **Diferimento:** o recolhimento é empurrado para uma etapa seguinte da cadeia.
- **Suspensão:** o imposto fica suspenso enquanto uma condição é cumprida (ex.: a mercadoria voltar de um conserto).
- **Crédito presumido / outorgado:** a empresa ganha um crédito que não veio de imposto pago.

Benefícios aparecem na apuração como **ajustes**. As issues de treinamento #10063 e #10117 tratam justamente de **benefícios fiscais**.

## Tributos sobre consumo

Os mais presentes no produto. São calculados **nota a nota, item a item**, e somados na apuração.

### ICMS

**Em uma frase:** imposto **estadual** sobre a circulação de mercadorias e alguns serviços (transporte entre municípios e estados, comunicação).

- **Base legal:** Lei Complementar 87/1996 (Lei Kandir) e a lei de cada estado.
- **Não cumulativo** e **por dentro**.
- **Alíquotas internas** variam por estado e produto. Nas operações **interestaduais**, são 7% ou 12%, conforme a origem e o destino, e 4% para mercadorias importadas.
- Apurado **por estabelecimento** (cada filial com inscrição estadual tem a sua apuração).
- Tem variações próprias: **ICMS-ST**, **DIFAL**, **FCP**.

**No Synchro4TDF:** é o centro da squad de Indiretos: apuração, ajustes, EFD ICMS/IPI, declarações estaduais e ressarcimentos.

### ICMS-ST (substituição tributária)

**Em uma frase:** um contribuinte, em geral o fabricante ou importador, recolhe **antecipadamente** o ICMS das etapas seguintes da cadeia.

Facilita a fiscalização: em vez de cobrar de milhares de varejistas, o estado cobra de poucos fabricantes. A base das etapas futuras é **presumida**, com uma **MVA** (margem de valor agregado) ou um preço de pauta.

**Exemplo:** o fabricante vende por R$ 100, MVA de 40%, alíquota de 18%.

- Base presumida: 100 × 1,40 = R$ 140
- ICMS-ST = 140 × 18% − ICMS próprio (100 × 18%) = 25,20 − 18,00 = **R$ 7,20**

Quem recolhe é o **substituto**; quem compra já com o imposto pago é o **substituído**. Se a venda final sai por menos que a base presumida, ou a mercadoria vai para outro estado, pode haver **ressarcimento**. Veja *CAT 42* e *ADRC-ST*.

### MVA (margem de valor agregado)

**Em uma frase:** o percentual que o estado presume que será somado ao preço até o consumidor final, usado para calcular a base do ICMS-ST.

Existe a **MVA ajustada**, que compensa a diferença entre alíquotas em operações interestaduais.

### DIFAL (diferencial de alíquota)

**Em uma frase:** a diferença entre a alíquota interna do estado de destino e a alíquota interestadual, devida ao **estado de destino**.

Casos principais:

- **Venda para consumidor final não contribuinte em outro estado** (ex.: e-commerce), pela EC 87/2015 e LC 190/2022.
- **Compra para uso e consumo ou ativo imobilizado** vinda de outro estado.

**Exemplo simplificado:** interestadual de 7% e interna de 18% no destino → DIFAL de 11% sobre a base.

Na EFD, a apuração do DIFAL e do FCP fica nos registros **E300 a E316**.

### FCP (Fundo de Combate à Pobreza)

**Em uma frase:** adicional de até 2 pontos percentuais na alíquota de ICMS de alguns produtos, em alguns estados, destinado a um fundo social.

É calculado e informado **separado** do ICMS, então aparece como mais uma coluna e mais um valor em notas e apurações.

### IPI

**Em uma frase:** imposto **federal** sobre **produtos industrializados**, cobrado do industrial e do importador.

- Alíquota definida pela **TIPI**, conforme o **NCM** do produto.
- **Não cumulativo** e **por fora**.
- Apurado na EFD ICMS/IPI (registros **E500 a E531**).
- Na Reforma Tributária, o IPI terá alíquota zero a partir de 2027, exceto para produtos que concorrem com a Zona Franca de Manaus.

### PIS e COFINS

**Em uma frase:** contribuições **federais** sobre a **receita** das empresas, que financiam a seguridade social.

| Regime | Quem | Alíquotas (PIS + COFINS) | Créditos |
|---|---|---|---|
| Cumulativo | Em geral, Lucro Presumido | 0,65% + 3% | Não |
| Não cumulativo | Em geral, Lucro Real | 1,65% + 7,6% | Sim, sobre insumos, energia, aluguéis… |

Há ainda casos especiais: **monofásico** (recolhido de uma vez pelo fabricante), **alíquota zero** e **suspensão**. Apuração centralizada no **CNPJ da matriz** e informada na **EFD-Contribuições**. Na Reforma, PIS e COFINS são substituídos pela **CBS** em 2027.

### ISS (ISSQN)

**Em uma frase:** imposto **municipal** sobre a **prestação de serviços**.

- **Base legal:** LC 116/2003, com a lista de serviços tributáveis. Alíquota de 2% a 5%.
- **Onde é devido:** em regra no município do **prestador**, mas há exceções em que vai para o município onde o serviço foi **prestado** (obras, limpeza, estacionamento…).
- **Retenção:** muitas vezes quem **toma** o serviço retém e recolhe o ISS no lugar do prestador.
- Cada município pode ter **declaração própria** e layout próprio.

**Na wiki:** [Apuração e Escrituração de ISSQN](https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Apura%C3%A7%C3%A3o-e-Escritura%C3%A7%C3%A3o-de-ISSQN) mostra a diferença entre escriturar e apurar com o ISS.

## Renda, lucro e retenções

Território da squad de **Diretos** e dos módulos de **retidos**.

### IRPJ e CSLL

**Em uma frase:** tributos **federais** sobre o **lucro** da empresa.

- **IRPJ:** 15%, mais um adicional de 10% sobre a parcela do lucro acima de R$ 20 mil por mês.
- **CSLL:** 9% na regra geral, com percentuais maiores para bancos e financeiras.

O lucro tributável **não é** o lucro contábil puro: parte do lucro contábil e faz **adições** e **exclusões** previstas em lei. Esse controle é o **LALUR/LACS**, entregue na **ECF**.

### Regimes tributários: Simples, Presumido e Real

**Em uma frase:** a forma como a empresa calcula IRPJ, CSLL, PIS e COFINS.

| Regime | Para quem | Como funciona |
|---|---|---|
| **Simples Nacional** | Pequenas empresas | Guia única com vários tributos. Usa CSOSN em vez de CST na nota |
| **Lucro Presumido** | Médias empresas (até um limite de receita) | O lucro é um percentual fixo da receita; PIS/COFINS cumulativos |
| **Lucro Real** | Grandes empresas (obrigatório acima do limite) | Lucro apurado de verdade, com LALUR; PIS/COFINS não cumulativos |

Os clientes do Synchro4TDF são, em geral, grandes empresas no **Lucro Real**.

### LALUR / LACS (e-Lalur, e-Lacs)

**Em uma frase:** livros de apuração do lucro real (LALUR) e da base da CSLL (LACS): partem do lucro contábil e registram adições, exclusões e compensações de prejuízo.

Hoje são escriturados **dentro da ECF**.

### Retenções na fonte (IRRF, CSRF, INSS)

**Em uma frase:** quando a empresa **contrata** certos serviços, ela desconta impostos do valor pago ao prestador e recolhe no lugar dele.

- **IRRF:** imposto de renda retido (ex.: serviços profissionais).
- **CSRF / PCC:** PIS + COFINS + CSLL retidos, 4,65% no total, em serviços como limpeza, segurança e consultoria.
- **INSS retido:** 11% sobre cessão de mão de obra e empreitada.
- **ISS retido:** veja *ISS*.

As retenções federais são informadas na **EFD-Reinf**. **Na wiki:** [Documentação dos tributos indiretos](https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Documenta%C3%A7%C3%A3o-dos-tributos-indiretos) explica o fluxo de apuração dos **retidos federais** no produto, com as CVs e tabelas envolvidas.

## Reforma Tributária

A maior mudança do sistema tributário em décadas, em andamento agora e com squad própria no time.

### Reforma Tributária do consumo (EC 132 e LC 214)

**Em uma frase:** substitui cinco tributos sobre consumo (PIS, COFINS, IPI, ICMS e ISS) por um **IVA dual** (CBS federal + IBS estadual/municipal) e cria o **Imposto Seletivo**.

- **Base legal:** Emenda Constitucional 132/2023 e Lei Complementar 214/2025.
- **Ideias centrais:** base ampla, cobrança **no destino** (onde está o consumidor), não cumulatividade plena (crédito de quase tudo que se compra), imposto **por fora** e menos benefícios e regimes especiais.

### CBS

**Em uma frase:** *Contribuição sobre Bens e Serviços*, **federal**, que substitui **PIS e COFINS**.

### IBS

**Em uma frase:** *Imposto sobre Bens e Serviços*, de **estados e municípios**, que substitui **ICMS e ISS**. É administrado por um **Comitê Gestor** nacional.

### IS (Imposto Seletivo)

**Em uma frase:** imposto federal sobre bens e serviços **prejudiciais à saúde ou ao meio ambiente** (ex.: cigarros, bebidas alcoólicas, veículos poluentes). Por isso foi apelidado de "imposto do pecado".

### Transição 2026–2033

**Em uma frase:** os tributos antigos e os novos convivem por anos. Por isso o produto precisa lidar com os **dois mundos ao mesmo tempo**.

| Ano | O que acontece |
|---|---|
| 2026 | Ano de teste: CBS de 0,9% e IBS de 0,1% destacados nos documentos fiscais |
| 2027 | CBS em vigor; PIS e COFINS extintos; IPI zerado (exceto ZFM); começa o Imposto Seletivo |
| 2029–2032 | ICMS e ISS diminuem gradualmente e o IBS aumenta na mesma proporção |
| 2033 | ICMS e ISS extintos; só IBS, CBS e IS |

### Split payment

**Em uma frase:** recolhimento **automático** de IBS e CBS no momento do pagamento: o banco ou a adquirente separa a parte do imposto e envia direto ao governo.

### cClassTrib e CST do IBS/CBS

**Em uma frase:** novos códigos nos documentos fiscais que dizem **como** IBS e CBS se aplicam ao item: tributação integral, redução de alíquota, isenção e assim por diante.

Funcionam como o CST do ICMS, mas para os novos tributos. Aparecem nos requisitos e nos cenários de teste do módulo da Reforma.

**Na wiki:** [Cenários de Teste – Apuração IBS e CBS](https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Cen%C3%A1rios-de-Teste-%E2%80%93-Apura%C3%A7%C3%A3o-IBS-e-CBS-(Synchro4TDF)).

## Documentos e códigos

O que está dentro de uma nota fiscal e nos cadastros. São os campos que você vai ver em tabelas, CVs e filtros.

### Documento fiscal (NF-e, NFS-e, CT-e)

**Em uma frase:** o registro oficial de uma operação, a origem de todos os valores de imposto.

| Documento | Modelo | Para quê |
|---|---|---|
| **NF-e** | 55 | Venda e circulação de mercadorias entre empresas |
| **NFC-e** | 65 | Venda ao consumidor final no varejo |
| **CT-e** | 57 | Transporte de cargas |
| **MDF-e** | 58 | Manifesto que agrupa os documentos de uma viagem |
| **NFS-e** | — | Prestação de serviços (municipal; agora com padrão nacional) |

Cada documento tem **cabeçalho** (emitente, destinatário, datas, totais) e **itens** (produto, NCM, CFOP, CST, base, alíquota e valor de cada imposto). No banco você verá exatamente essa divisão: cabeçalho, item e imposto.

### Chave de acesso

**Em uma frase:** o identificador de **44 dígitos** de um documento eletrônico (NF-e, CT-e…).

Ela codifica UF, ano e mês de emissão, CNPJ do emitente, modelo, série, número, tipo de emissão, um código numérico e o dígito verificador. Com ela se consulta o documento no portal da SEFAZ.

### XML do documento

**Em uma frase:** o arquivo assinado digitalmente que **é** o documento fiscal eletrônico. O PDF (DANFE) é só uma representação para impressão.

### CFOP

**Em uma frase:** *Código Fiscal de Operações e Prestações*, com 4 dígitos, que diz **que tipo de operação** é aquela (venda, compra, devolução, transferência, remessa…).

O **primeiro dígito** diz a direção e o alcance:

| 1º dígito | Significado |
|---|---|
| 1 / 2 / 3 | Entrada: do mesmo estado / de outro estado / do exterior |
| 5 / 6 / 7 | Saída: para o mesmo estado / para outro estado / para o exterior |

**Exemplos:** 5102 = venda de mercadoria comprada de terceiros, dentro do estado; 6102 = a mesma venda para outro estado; 1202 = devolução de venda recebida no mesmo estado.

Muitos filtros e regras de apuração são feitos **por CFOP**.

### CST (Código de Situação Tributária)

**Em uma frase:** código que diz **como** um imposto se aplica àquele item: tributado, isento, com ST, com redução etc.

No **ICMS**, o CST tem 3 dígitos: **origem** (1º) + **tributação** (2 últimos).

| Final | Significado |
|---|---|
| 00 | Tributada integralmente |
| 10 | Tributada e com cobrança de ICMS-ST |
| 20 | Com redução de base de cálculo |
| 40 / 41 | Isenta / não tributada |
| 50 / 51 | Suspensão / diferimento |
| 60 | ICMS já cobrado anteriormente por ST |
| 90 | Outras |

IPI, PIS, COFINS e agora IBS/CBS têm **tabelas de CST próprias**.

### CSOSN

**Em uma frase:** o equivalente ao CST do ICMS para empresas do **Simples Nacional** (ex.: 101, 102, 500, 900).

### Origem da mercadoria

**Em uma frase:** o 1º dígito do CST do ICMS, que diz se o produto é nacional ou estrangeiro e como foi importado (0 = nacional, 1 = importação direta, 2 = estrangeira comprada no mercado interno…).

Importa para a alíquota interestadual de 4% e para a **FCI**.

### NCM

**Em uma frase:** *Nomenclatura Comum do Mercosul*, código de **8 dígitos** que classifica o produto (ex.: tipo de alimento, peça, tecido).

Define a alíquota de IPI (pela TIPI), enquadramentos em ST, benefícios e regimes especiais.

### CEST

**Em uma frase:** *Código Especificador da Substituição Tributária*, com 7 dígitos, que identifica produtos sujeitos a ICMS-ST.

### Estabelecimento, CNPJ raiz e filial

**Em uma frase:** a **empresa** é identificada pelos 8 primeiros dígitos do CNPJ (a **raiz**); cada **estabelecimento** (matriz ou filial) tem o CNPJ completo.

**Por que importa:** o ICMS é apurado **por estabelecimento**, enquanto PIS, COFINS, IRPJ e CSLL são centralizados na **empresa**. É por isso que as telas do produto pedem **Empresa** e **Filial**, e as listagens mostram o **Estabelecimento** de cada processo.

### Inscrição estadual (IE)

**Em uma frase:** o "CPF" do estabelecimento perante o fisco **estadual**. Quem tem IE é **contribuinte do ICMS** naquele estado.

Uma empresa pode ter IE em outros estados apenas como **substituta tributária**, o que aparece em obrigações como a GIA-ST.

## Escrituração, apuração e créditos

O "miolo" do produto: transformar documentos em livros, saldos e arquivos.

### Escrituração

**Em uma frase:** **registrar** cada documento fiscal nos livros fiscais do período, de forma organizada.

Hoje a escrituração é digital: os "livros" são arquivos do **SPED**. Escriturar é diferente de apurar: primeiro se registra, depois se calcula.

### Livros fiscais

**Em uma frase:** os registros obrigatórios das operações: **Registro de Entradas**, **Registro de Saídas**, **Registro de Apuração** (do ICMS e do IPI) e **Inventário**.

Na EFD ICMS/IPI eles viraram **blocos** do arquivo, mas os nomes continuam aparecendo em relatórios e telas.

### Apuração

**Em uma frase:** calcular, no fim do período, quanto a empresa deve de cada imposto.

```
  débitos (saídas)
− créditos (entradas)
± ajustes (benefícios, estornos, outros)
− saldo credor do período anterior
= saldo devedor (a recolher)  ou  saldo credor (a transportar)
```

**Exemplo:** débitos de R$ 2.700, créditos de R$ 1.800, ajuste de crédito presumido de R$ 100 → R$ 800 a recolher.

**No Synchro4TDF:** a apuração é feita por **procedures e Calculation Views** no HANA. Nas listagens de processos você vê eventos de **Apuração** e de **Geração** (do arquivo), cada um com status (Apurado, Gerado, Falha).

**Na wiki:** [Cenário: Venda de Mercadoria](https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Cen%C3%A1rio---Venda-de-Mercadoria-), [Compras de mercadorias](https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Cen%C3%A1rio-Compras-de-mercadorias) e [Ajustes fiscais](https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Cen%C3%A1rio-Ajustes-fiscais) mostram casos reais de débito, crédito e ajuste.

### Saldo devedor, saldo credor e crédito acumulado

**Em uma frase:** *saldo devedor* é imposto a pagar; *saldo credor* é crédito que sobrou e passa para o mês seguinte.

Quando a empresa gera crédito sempre (ex.: exportadora, que compra com ICMS e vende sem), o saldo credor vira **crédito acumulado**. Recuperar esse dinheiro é um processo próprio e trabalhoso.

### Ajustes de apuração e códigos de ajuste

**Em uma frase:** lançamentos que alteram a apuração além dos documentos: benefícios, estornos, créditos presumidos, deduções.

No ICMS, cada estado publica uma **tabela de códigos de ajuste** (a "tabela 5.1.1" do SPED). Cada ajuste é informado na EFD com o seu código (registro **E111**). Em código você vai ver metadados com esses códigos por UF.

**Na wiki:** [metadados de código de ajuste do ICMS](https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/metadados-tdf-cod-ajuste-icms).

### Estorno de crédito

**Em uma frase:** anular um crédito já aproveitado porque a operação seguinte não vai ser tributada (ex.: mercadoria comprada que se perdeu, ou saída isenta).

**Na wiki:** [Operações com Crédito Bloqueado](https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Cen%C3%A1rio-Opera%C3%A7%C3%B5es-com-Cr%C3%A9dito-Bloqueado).

### CIAP

**Em uma frase:** *Controle de Crédito do ICMS do Ativo Permanente*. O ICMS da compra de máquinas e equipamentos não é aproveitado de uma vez, mas em **48 parcelas mensais** (1/48 por mês).

Fica no **Bloco G** da EFD ICMS/IPI.

### Ressarcimento e complemento de ICMS-ST

**Em uma frase:** quando a base presumida da ST não se confirma, a empresa pode ter **direito a receber** (ressarcimento) ou **dever pagar a diferença** (complemento).

Cada estado tem o seu procedimento e arquivo: por exemplo, a **CAT 42** em São Paulo e o **ADRC-ST** no Paraná.

### Compensação (PER/DCOMP)

**Em uma frase:** usar um crédito que a empresa tem com a Receita Federal para pagar outro tributo federal, em vez de pedir o dinheiro de volta.

O pedido é feito pelo **PER/DCOMP**. É uma das etapas "Recolhimento e/ou compensação" do ciclo fiscal.

### Remessas e retornos

**Em uma frase:** saídas de mercadoria que **não são venda**: remessa para industrialização, conserto, demonstração, consignação, armazenagem…

Costumam ter ICMS **suspenso**, com prazo para o retorno. Se a mercadoria não volta no prazo, o imposto passa a ser devido. Por isso existem controles de remessa no produto.

### Transferência entre estabelecimentos

**Em uma frase:** mercadoria que sai de uma filial para outra **da mesma empresa**. Não há venda, mas há regras próprias de ICMS (crédito e débito entre estabelecimentos).

**Na wiki:** [Transferências entre estabelecimentos](https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Cen%C3%A1rio-Transfer%C3%AAncias-Entre-Estabelecimentos).

### Devolução

**Em uma frase:** o retorno de uma mercadoria vendida ou comprada, com **nota de devolução** que desfaz o imposto da operação original (estorna o débito ou o crédito).

**Na wiki:** [Devolução de vendas](https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Cen%C3%A1rio-Devolu%C3%A7%C3%A3o-de-vendas) e [Devolução de compras](https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Cen%C3%A1rio-Devolu%C3%A7%C3%A3o-de-Compras).

## Obrigações e arquivos

Os nomes que aparecem nas listagens de processos, nos cockpits e nas labels das issues.

### SPED

**Em uma frase:** *Sistema Público de Escrituração Digital*, o projeto do governo que trocou os livros em papel por **arquivos digitais padronizados** entregues ao fisco.

Cada arquivo do SPED tem um **layout** (registros e campos) publicado num guia prático, que muda com frequência. Mudança de layout = issue para o time.

### EFD ICMS/IPI (SPED Fiscal)

**Em uma frase:** o arquivo mensal com a escrituração e a apuração de **ICMS e IPI** de cada estabelecimento.

| Bloco | Conteúdo |
|---|---|
| 0 | Abertura e cadastros (participantes, produtos, unidades) |
| B | ISS (só no Distrito Federal) |
| C | Documentos de mercadorias (C100 = nota, C170 = itens, C190 = resumo por CST/CFOP/alíquota) |
| D | Documentos de serviços de transporte e comunicação |
| E | **Apuração**: E110 (ICMS), E111 (ajustes), E200/E210 (ICMS-ST), E300 (DIFAL/FCP), E500 (IPI) |
| G | CIAP |
| H | Inventário |
| K | Produção e estoque |
| 1 | Informações complementares |
| 9 | Encerramento e totais |

Falar "registro C170" ou "E110" é comum nas issues. Vale reconhecer os principais.

### EFD-Contribuições

**Em uma frase:** o arquivo mensal com a apuração de **PIS e COFINS** (e da contribuição previdenciária sobre a receita), entregue pela **empresa** (matriz).

### ECD

**Em uma frase:** *Escrituração Contábil Digital*. Os **livros contábeis** (Diário, Razão, balancetes) em arquivo, entregues uma vez por ano.

### ECF

**Em uma frase:** *Escrituração Contábil Fiscal*. A apuração anual do **IRPJ e da CSLL**, com o e-Lalur e o e-Lacs. Parte dos saldos da ECD.

É um dos módulos da squad de **Diretos** (o "Cockpit ECF" do produto, por exemplo).

### EFD-Reinf

**Em uma frase:** escrituração das **retenções** e de outras informações fiscais que não são da folha de pagamento: INSS retido de serviços tomados, IRRF, CSRF e afins.

Junto com o eSocial, alimenta a **DCTFWeb**, que consolida os débitos federais.

### Declarações estaduais de ICMS (ex.: GIA)

**Em uma frase:** além da EFD, alguns estados exigem declarações próprias de apuração do ICMS. A mais conhecida é a **GIA** de São Paulo; outros estados têm as suas, com nomes e layouts diferentes.

### GIA-ST

**Em uma frase:** declaração do ICMS-ST devido a **outro estado**, entregue pelo substituto tributário inscrito naquele estado.

### CAT 42 (SP)

**Em uma frase:** a sistemática de São Paulo (Portaria CAT 42/2018) para apurar o **ressarcimento ou complemento de ICMS-ST**, com um arquivo digital próprio montado a partir de entradas, saídas e estoque.

### ADRC-ST (PR)

**Em uma frase:** *Arquivo Digital da Recuperação, do Ressarcimento e da Complementação do ICMS-ST*, o equivalente à CAT 42 no Paraná.

### FCI

**Em uma frase:** *Ficha de Conteúdo de Importação*. Informa o percentual de conteúdo importado de um produto industrializado, que decide se a alíquota interestadual de 4% se aplica. O número da FCI vai na nota.

**Na wiki:** [FCI — Fluxo](https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/FCI---Fluxo).

### Declarações municipais do ISS

**Em uma frase:** cada município pode exigir a sua declaração de serviços prestados e tomados, com nome e layout próprios (DES, GISS, DMS e muitas outras). O produto organiza por **UF/município**, como em "SP/Americana - GISS / DES".

### PVA (validador)

**Em uma frase:** o *Programa Validador e Assinador* da Receita para cada arquivo do SPED. Valida o layout e as regras, assina digitalmente e transmite.

Um arquivo gerado pelo produto que **não passa no PVA** é bug crítico para o cliente. As **críticas** do produto (erros e alertas) tentam pegar esses problemas antes.

### Guias de recolhimento (DARF, GNRE, GARE)

**Em uma frase:** os boletos do imposto. **DARF** paga tributos federais; **GNRE** paga ICMS devido a **outro** estado (ex.: ICMS-ST, DIFAL); cada estado tem a sua guia para o próprio ICMS (como a **GARE** em SP).

### Inventário (Bloco H)

**Em uma frase:** a relação do **estoque** da empresa numa data, com valores, informada na EFD. É base para controles como o ressarcimento de ST.

### Bloco K

**Em uma frase:** o registro de **produção e estoque** na EFD ICMS/IPI (o antigo livro de controle da produção), exigido de indústrias e atacadistas.

## Contabilidade

O lado contábil aparece na **Conciliação** e no **Contab4TDF**.

### Partidas dobradas (débito e crédito contábil)

**Em uma frase:** todo lançamento contábil tem pelo menos um **débito** e um **crédito** de mesmo valor, em contas diferentes.

Não tem relação direta com débito e crédito **fiscal**. Regra prática:

- Contas de **ativo** e **despesa** aumentam com débito.
- Contas de **passivo**, **patrimônio líquido** e **receita** aumentam com crédito.

**Exemplo:** venda com R$ 180 de ICMS → **D** ICMS sobre vendas (dedução da receita) 180 / **C** ICMS a recolher (passivo) 180.

### Plano de contas

**Em uma frase:** a lista estruturada de todas as **contas contábeis** da empresa (ativo, passivo, receitas, despesas…), cada uma com o seu código.

Para o fiscal, interessam as contas de impostos: "ICMS a recolher" (passivo), "ICMS a recuperar" (ativo) e assim por diante.

### Lançamento contábil

**Em uma frase:** o registro de um fato na contabilidade, com data, contas, valores, débito e crédito.

No SAP, transações como **FB50** (lançamento em conta do razão) e **FB60** (fatura de fornecedor) criam lançamentos. O Contab4TDF gera os lançamentos dos impostos apurados.

### Razão e balancete

**Em uma frase:** o **razão** mostra todos os lançamentos de cada conta; o **balancete** lista os saldos de todas as contas numa data.

### Contabilização

**Em uma frase:** levar para a contabilidade o resultado da apuração fiscal: ICMS a recolher, créditos a recuperar, ajustes.

**No Synchro4TDF:** é o papel do **Contab4TDF**, um microsserviço em Clojure.

### Conciliação contábil x fiscal

**Em uma frase:** conferir se o que está na **contabilidade** bate com o que foi **apurado** no fiscal. A meta é "contábil − fiscal = 0".

Divergências indicam erro de lançamento, documento faltando ou ajuste não contabilizado. É um módulo da squad de **Horizontais**.

## Mundo SAP

O Synchro4TDF vive dentro do ecossistema SAP do cliente.

### ERP SAP (ECC e S/4HANA)

**Em uma frase:** o sistema de gestão onde o cliente faz compras, vendas, estoque, finanças e contabilidade.

**ECC** é a geração anterior; **S/4HANA** é a atual, que roda sobre o banco HANA. Muitos clientes estão migrando de um para o outro.

### Módulos FI, MM e SD

**Em uma frase:** as grandes áreas do ERP SAP. **FI** = financeiro e contábil, **MM** = materiais e compras, **SD** = vendas e distribuição.

As notas de entrada costumam nascer no MM, e as de saída no SD. Os lançamentos contábeis ficam no FI.

### Nota Fiscal Writer (J_1BNF*)

**Em uma frase:** o componente do SAP que gera e guarda as notas fiscais brasileiras.

As tabelas principais são **J_1BNFDOC** (cabeçalho), **J_1BNFLIN** (itens) e **J_1BNFSTX** (impostos por item). Você vai ver esses nomes nas CVs.

### SAP TDF

**Em uma frase:** *Tax Declaration Framework for Brazil*, a solução da SAP que organiza os dados fiscais do Brasil no HANA e serve de base para o Synchro4TDF.

### SAP DRC

**Em uma frase:** *Document and Reporting Compliance*, a solução mais recente da SAP para documentos eletrônicos e declarações. A Synchro tem o **Synchro4DRC**, certificado pela SAP.

### SAP HANA

**Em uma frase:** o banco de dados **em memória e colunar** da SAP, onde ficam os dados do TDF e as tabelas, CVs e procedures do Synchro4TDF.

### Shadow (tabelas shadow)

**Em uma frase:** réplica **somente leitura** das tabelas do ERP do cliente dentro do HANA. Nunca se altera; os dados são lidos via CVs ou complementos.

### XSA

**Em uma frase:** *SAP HANA Extended Application Services, Advanced Model*, a plataforma de aplicação onde o produto é implantado nos ambientes do cliente. É compatível com nuvem.

### SAP Note

**Em uma frase:** correção ou atualização publicada pela SAP. Algumas mudam estruturas do TDF e exigem ajustes no produto.

## Desenvolvimento e processo

Termos técnicos e de processo do time. Para versões mais longas, com analogias, veja o [Glossário Funcional da wiki](https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Glossario-Funcional).

### CV (Calculation View)

**Em uma frase:** visão calculada no HANA (joins, filtros, agregações e parâmetros), editada no Eclipse com o HANA Tools. É onde está boa parte da regra de negócio.

### Procedure

**Em uma frase:** rotina em **SQLScript** guardada no banco. As apurações rodam como procedures.

### Complemento

**Em uma frase:** mapeamento **origem → destino** configurável na tela do produto, que gera procedures para transformar e copiar dados entre tabelas.

### Metadados

**Em uma frase:** dados de domínio (códigos, tabelas oficiais, parâmetros) carregados no banco a partir de **arquivos CSV** versionados.

### Liquibase / changeset

**Em uma frase:** a ferramenta e a unidade de **versionamento** de alterações de banco. Toda tabela, coluna ou dado novo vai num changeset.

### Evolução / Suporte

**Em uma frase:** *evolução* é a versão em desenvolvimento; *suporte* é a versão já entregue que só recebe correções. Define de qual branch você parte.

### Milestone

**Em uma frase:** a versão em que a issue será entregue. Define a branch base e o prazo.

### MR (Merge Request) e Draft

**Em uma frase:** o pedido para integrar a sua branch. Um MR em **Draft** ainda não está pronto para revisão.

### Grooming

**Em uma frase:** refinamento técnico de uma issue antes do desenvolvimento: entender o problema, quebrar em partes e estimar.

### Homologação e rebote

**Em uma frase:** *homologação* é a validação funcional depois do deploy em QA; *rebote* é a issue que volta da homologação com problema.

### Feature toggle

**Em uma frase:** chave que liga ou desliga uma funcionalidade por ambiente ou cliente, sem precisar de outro deploy.

### REPL

**Em uma frase:** o console interativo do Clojure, usado para rodar código direto do editor enquanto você desenvolve.

### OCI DEV / QA / SHOWCASE

**Em uma frase:** os ambientes do produto hospedados na Oracle Cloud: desenvolvimento, testes e demonstração.

### AMS

**Em uma frase:** a equipe que atende **chamados de clientes** e faz correções urgentes (*hotfixes*).

### Críticas

**Em uma frase:** as validações que o produto roda sobre os dados de uma obrigação, classificadas em **erro** e **alerta**, antes de gerar ou entregar o arquivo.

### TopWeek

**Em uma frase:** apresentação técnica curta feita na weekly, em que alguém do time compartilha algo que aprendeu.
