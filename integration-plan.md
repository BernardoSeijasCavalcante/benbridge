# Passo 1: Cálculo Prévio da Simulação (Calculadora)

**Método:** `POST`
**Endpoint:** `/v3/loan-inss-simulations/calculation`

## 1. A Necessidade: Por que começamos por aqui?
O fluxo de digitação automática na API da JoinBank exige precisão financeira antes da formalização de qualquer intenção de crédito. Começamos pelo endpoint de **Cálculo Prévio** (`/calculation`) porque é fundamental validar as condições comerciais do produto (taxa de juros, prazo, IOF, valor da parcela e valor líquido liberado) *antes* de registrar a simulação oficial no banco de dados da bancarizadora. 

Executar o cálculo previamente evita erros de validação nas etapas posteriores, garantindo que a proposta se enquadre na política de crédito e nas regras (tabelas) ativas para a operação solicitada, seja ela Contrato Novo, Portabilidade ou Refinanciamento.

## 2. A Consequência: O que é carregado para o próximo passo?
A consequência de uma chamada bem-sucedida a este endpoint é a obtenção de um objeto de resposta contendo todos os dados financeiros exatos da operação aprovada pela calculadora do banco. 

Os valores retornados e validados aqui (como o valor exato da parcela financiada, o custo efetivo total, se o seguro foi acatado, etc.) serão os insumos fundamentais que comporão o **corpo da requisição do Passo 2** (`POST /v3/loan-inss-simulations`), especificamente alimentando o array `items[]` com os dados chancelados. Sem passar por este validador financeiro inicial, a aplicação cliente não terá os dados matemáticos chancelados pela tabela de regras da bancarizadora, o que resultaria em rejeição (Erro 400) no momento da criação efetiva da proposta.

## 3. Como realizar a requisição

### 3.1. Fomentando o Cabeçalho (Headers)
A comunicação com a API da JoinBank exige controle rigoroso de acesso e identificação. Para autenticar esta requisição de cálculo, o cabeçalho deve conter a chave de acesso da sua aplicação. É de vital importância manter esta API Key em segurança, pois ela dá acesso direto às operações e dados dos clientes.

*   **apikey**: `{{sua_api_key_aqui}}`
*   **Content-Type**: `application/json`

### 3.2. Pré-requisito: Como obter o `ruleId`
Sempre que um atributo obrigatório for fruto de outro processo na API, ele deve ser consultado previamente. O `ruleId` (ID da tabela de produto) não é um dado estático; ele é resgatado consultando as regras ativas da bancarizadora.

**Passo a passo para obter o `ruleId`:**
1. Faça uma requisição **POST** no endpoint `/v3/loan-product-rules/search/basic`.
2. Este endpoint lista as tabelas de regras de produtos de empréstimo filtrando por tipo de operação.

**Body da requisição de busca de regras:**
```json
{
  "offset": 0,
  "limit": 20,
  "operation": {
    "code": {
      "eq": 1
    }
  }
}
```
*Nota Explicativa:* 
* `offset`: Índice inicial para paginação.
* `limit`: Quantidade máxima de registros retornados (Máximo de 20 por página).
* `operation.code.eq`: Código da operação desejada. No exemplo acima, usamos `1` (que equivale a "Novo"). Se fosse Portabilidade, seria `3`. 

A resposta desta requisição trará uma lista de regras ativas e seus respectivos identificadores únicos (UUIDs). Você deverá capturar o atributo `Id` (ou equivalente na resposta) da regra desejada para preencher o campo `ruleId` no payload do cálculo prévio.

### 3.3. Fomentando o Corpo (Body) da Calculadora
O endpoint de cálculo exige que enviemos as intenções de contratação para que o motor da JoinBank possa simular os cenários. É mandatório o envio do ID da regra de negócio (`ruleId`, obtido no passo anterior) e dos parâmetros fundamentais de valor e prazo.

A estrutura do payload deve seguir rigorosamente a tipagem e obrigatoriedade definidas na documentação para a modalidade de Contrato Novo:

**Estrutura de Parâmetros Obrigatórios:**
*   `ruleId` (string/UUID): O ID da tabela de produto (obtido previamente na listagem de regras).
*   `hasInsurance` (boolean): `true` para incluir seguro prestamista, `false` para remover.
*   `installmentValue` (number): O valor da parcela desejada.
*   `loanValue` (number): O valor total do empréstimo pretendido.
*   `rate` (number): A taxa de juros mensal a ser aplicada.
*   `term` (number): O prazo (quantidade de parcelas) em meses.

**Parâmetros Opcionais:**
*   `referenceCode` (string/null): Código de referência externo, caso seu sistema possua um identificador próprio para a pré-simulação.

**Exemplo Completo do Payload a ser enviado no Body:**
```json
{
  "ruleId": "{{RuleId_Obtido_No_Passo_Anterior}}",
  "hasInsurance": false,
  "installmentValue": 43.54,
  "loanValue": 1918.35,
  "rate": 1.66,
  "term": 84,
  "referenceCode": null
}
```

> **Atenção (Exceção Específica para Cartão INSS):** Se estiver calculando um Cartão INSS (endpoint `/v3/loan-inss-card-simulations/950005/calculation-item`), o preenchimento muda: você deve enviar o campo `benefitValue` preenchido exclusivamente com o valor correspondente aos 5% da margem disponível.

Excelente. Vamos continuar a construção do nosso mega documento detalhando o **Passo 2**. A lógica aqui é conectar perfeitamente o sucesso matemático que obtivemos no Passo 1 com o registro oficial dos dados do cliente.

Abaixo está o detalhamento completo do Passo 2 formatado em Markdown, pronto para ser adicionado ao seu mega documento da esteira de digitação:

---

# Passo 2: Criação da Simulação (Registro da Proposta)

**Método:** `POST`
**Endpoint:** `/v3/loan-inss-simulations`

## 1. A Necessidade: Por que este é o segundo passo?

Após validar a viabilidade matemática e comercial da operação na Calculadora (Passo 1), o sistema precisa efetivamente registrar a intenção de crédito no banco de dados da bancarizadora.

Este passo é crucial porque une as informações pessoais do cliente (tomador), os dados do benefício INSS, a conta bancária para recebimento do crédito, os documentos e os parâmetros financeiros rigorosamente aprovados no cálculo prévio. É aqui que a "digitação" ganha corpo formal perante a instituição financeira.

## 2. A Consequência: O que é carregado para o próximo passo?

O sucesso desta requisição gera a oficialização da proposta. A principal consequência (e o dado mais vital retornado no response) é a geração do **ID da Simulação** (`simulation_id`).

Este `simulation_id` se torna a chave primária da operação na API. Sem ele, é impossível avançar. Ele será inserido nas rotas de URL de todos os próximos passos: para obter o termo de autorização do INSS (Passo 3), para gerar os contratos efetivos (Passo 5) e para realizar consultas de status (Passo 6).

## 3. Como realizar a requisição

### 3.1. Fomentando o Cabeçalho (Headers)

A autenticação segue o padrão de segurança inegociável da plataforma. A sua chave de acesso continua garantindo a identificação da sua operação.

* **apikey**: `{{sua_api_key_aqui}}`

* **Content-Type**: `application/json`

### 3.2. Fomentando o Corpo (Body) e a Herança do Passo 1

O corpo desta requisição é o mais extenso do processo de digitação, pois consolida o dossiê completo do cliente.

> **Atenção à Herança do Passo 1:** O array `items[]` dentro deste payload **deve ser alimentado exatamente com os dados retornados com sucesso pelo endpoint de Cálculo Prévio**. Enviar valores divergentes dos calculados anteriormente causará rejeição (Erro 400).
> 
> 

**Estrutura Principal do Payload:**

* **borrower**: Objeto contendo todos os dados cadastrais do tomador (CPF, nome completo, data de nascimento, renda, contatos, dados detalhados do benefício INSS, endereço completo e documento de identificação).


* **items**: Array com as condições do empréstimo. É aqui que você insere o `ruleId` (ID da tabela), a taxa (`rate`), o prazo (`term`), o valor da parcela (`installmentValue`) e o valor do empréstimo (`loanValue`).


* **creditBankAccount**: Objeto com os dados bancários (banco, agência, conta e dígito) para o crédito do valor.


* **files**: Array obrigatório para referenciar os anexos de documentos de identificação (frente e verso).


* **step.code**: Indica a etapa atual da proposta. Deve ser enviado como `0` na criação.



**Exemplo de Payload Estrutural Completo:**

```json
{
  "borrower": {
    "name": "{{name}}",
    "identity": "{{identity}}",
    "benefit": "{{inss_benefit}}",
    "benefitState": "SP",
    "benefitStartDate": "1999-01-15",
    "benefitPaymentMethod": 1,
    "benefitType": 42,
    "birthDate": "1965-08-19",
    "motherName": "Maria da Silva",
    "maritalStatus": "Solteiro",
    "sex": "Feminino",
    "income": 1800.50,
    "phone": "{{phone}}",
    "email": "maria@gmail.com.br",
    "address": {
      "street": "Av. Paulista",
      "number": "552",
      "complement": "Bloco A",
      "district": "Centro",
      "city": "São Paulo",
      "state": "SP",
      "zipCode": "01310930"
    },
    "document": {
      "type": {
        "code": "RG",
        "name": "Registro Geral"
      },
      "number": "12232323",
      "issuingDate": "1990-05-21",
      "issuingEntity": "SSP",
      "issuingState": "SP"
    }
  },
  "items": [
    {
      "ruleId": "{{newRuleId}}",
      "hasInsurance": true,
      "installmentValue": 43.54,
      "loanValue": 1918.35,
      "rate": 1.66,
      "term": 84,
      "referenceCode": null
    }
  ],
  "creditBankAccount": {
    "bank": "001",
    "branch": "1234",
    "number": "123654",
    "digit": "6"
  },
  "step": {
    "code": 0,
    "name": null
  },
  "files": [
    {
      "id": "{{doc_front_id}}",
      "type": "doc_front"
    },
    {
      "id": "{{doc_back_id}}",
      "type": "doc_back"
    }
  ],
  "note": null,
  "brokerId": null,
  "accessId": null
}

```

# Passo 3: Obtenção do Termo de Autorização

**Método:** `GET`
**Endpoint:** `/v3/loan-inss-simulations/{{simulation_id}}/auth-term`

## 1. A Necessidade: Por que este é o terceiro passo?

Com a simulação devidamente registrada no sistema da bancarizadora e o `simulation_id` em mãos (resultado do Passo 2), a operação entra na fase de formalização legal e averbação.

Tratando-se de um crédito consignado atrelado ao INSS, a instituição financeira precisa consultar o benefício e a margem consignável do cliente diretamente nos sistemas governamentais ou da Dataprev. Para que essa consulta seja legalmente permitida, é obrigatória a emissão de um termo de autorização. A função deste endpoint é justamente solicitar ao banco a geração e a disponibilização deste termo vinculado à proposta recém-criada.

## 2. A Consequência: O que é carregado para o próximo passo?

Como se trata de uma requisição `GET`, a consequência é a leitura de um objeto vital para a sequência da esteira. O corpo da resposta (response) deste endpoint fornecerá dois dados que definirão o fluxo do Passo 4:

1. **A Chave do Termo (`key`):** O endpoint retorna uma chave única referente ao documento de autorização gerado. Esta chave (que chamaremos de `auth_term_key`) será injetada diretamente na URL do próximo passo para realizar a assinatura.


2. **O Status do Termo (`status.key`):** A resposta indicará a situação atual do termo. O sistema deve ler essa informação, pois a documentação define uma regra de negócio estrita: o Passo 4 (Assinar o termo) **só deve ser executado se o campo `status.key` for diferente de `'signed'**`. Se já estiver como `'signed'` (assinado), a esteira deve pular o Passo 4 e ir direto para o Passo 5.



## 3. Como realizar a requisição

### 3.1. Fomentando o Cabeçalho (Headers)

Diferente do passo anterior, por ser um método GET, não há envio de corpo de requisição (JSON). O tráfego de dados se dá pelos parâmetros de rota e pelo cabeçalho de autenticação.

* **apikey**: `{{sua_api_key_aqui}}`


### 3.2. Fomentando os Parâmetros de Rota (Path Variables)

A ligação deste passo com o anterior ocorre na URL. Você deve capturar o ID da simulação gerado na resposta do Passo 2 e substituí-lo na rota.

* `{{simulation_id}}`: O identificador único da simulação gerada no Passo 2.



**Exemplo de Requisição (cURL):**

```bash
curl --location 'https://integration.ajin.io/v3/loan-inss-simulations/{{simulation_id}}/auth-term' \
--header 'apikey: {{apikey}}'
```[cite: 12]

```

# Passo 4: Assinatura do Termo de Autorização

**Método:** `PUT`
**Endpoint:** `/v3/signer/{{auth_term_key}}/accept`

## 1. A Necessidade: Por que este é o quarto passo?

Após obter o termo de autorização no Passo 3, é obrigatório realizar a assinatura digital (ou aceite) desse documento para que a bancarizadora tenha a permissão legal para consultar os dados previdenciários e dar andamento na proposta de crédito.

**Regra de Negócio Crucial:** A documentação oficial da JoinBank impõe uma trava sistêmica para este passo. Este endpoint **só deve ser executado se o campo `status.key` retornado no response do endpoint anterior (Passo 3) for diferente de `'signed'**`. Caso o status já indique que o termo está assinado, sua aplicação de automação deve ignorar este passo e pular diretamente para o Passo 5.

## 2. A Consequência: O que é carregado para o próximo passo?

Ao assinar o termo com sucesso via requisição, a simulação cumpre os requisitos legais de consentimento e passa a estar totalmente apta para a fase final. O processo sai da etapa de "permissão" e destrava a "efetivação", permitindo que os contratos reais sejam gerados no passo seguinte.

## 3. Como realizar a requisição

### 3.1. Fomentando o Cabeçalho (Headers) e a Rota (URL)

A requisição deve ser autenticada normalmente, mas a atenção especial deve ser dada à URL (rota). É necessário injetar dinamicamente a chave do termo de autorização obtida no Passo 3.

* **Header `apikey**`: `{{sua_api_key_aqui}}`

* **Header `Content-Type**`: `application/json`
* **Path Variable `{{auth_term_key}}**`: A chave única do termo (o campo `key` puro, que foi lido na resposta do endpoint GET do Passo 3). Ela substitui o placeholder na URL da chamada.



### 3.2. Fomentando o Corpo (Body)

Por ser um método `PUT` para registro de aceite, a API exige o envio de um corpo de requisição com a comprovação de geolocalização do momento em que a assinatura (ou o comando de aceite) ocorreu.

A estrutura do payload exige o envio de um objeto `position`, que deve conter as propriedades `latitude` e `longitude`.

**Exemplo de Payload a ser enviado no Body:**

```json
{
  "position": {
    "latitude": "-23.5489",
    "longitude": "-46.6388"
  }
}
```[cite: 12]

```

# Passo 5: Geração (Efetivação) dos Contratos

**Método:** `POST`
**Endpoint:** `/v3/loan-inss-simulations/{{simulation_id}}/actions`

## 1. A Necessidade: Por que este é o quinto passo?

Até este momento do fluxo, você garantiu a viabilidade comercial (Passo 1), registrou a proposta (Passo 2) e cuidou das permissões de consulta ao benefício INSS (Passos 3 e 4). Agora é a hora de efetivamente converter essa intenção em uma operação de crédito real.

A finalidade deste endpoint de ações (`/actions`) é atuar como o gatilho que ordena o sistema da bancarizadora a transformar a simulação (já aprovada e com termo assinado) em contratos de empréstimo efetivos. É o comando final que inicia o processo de formalização e prepara a documentação final de assinatura da dívida.

## 2. A Consequência: O que é carregado para o próximo passo?

Executar esta ação altera o estado da proposta dentro da plataforma JoinBank. A simulação deixa de ser apenas uma "proposta em análise" e os contratos físicos/digitais (as Cédulas de Crédito Bancário - CCB, etc.) são devidamente gerados e atrelados ao ID dessa simulação.

O sucesso desta requisição significa que o processo de "digitação automática" foi concluído. O que resta para o próximo e último passo (Passo 6) é apenas consultar a base de dados para validar e resgatar os dados finais desses contratos efetivados.

## 3. Como realizar a requisição

### 3.1. Fomentando o Cabeçalho (Headers) e a Rota (URL)

A requisição requer os cabeçalhos de autenticação e a reinserção do identificador mestre da operação na URL da chamada.

* **Header `apikey**`: `{{sua_api_key_aqui}}`

* **Header `Content-Type**`: `application/json`
* **Path Variable `{{simulation_id}}**`: O mesmo identificador único gerado no Passo 2 e que também foi utilizado no Passo 3.



### 3.2. Fomentando o Corpo (Body)

Como se trata de um endpoint genérico de ações (`/actions`), a API espera que você envie um comando específico no corpo da requisição informando exatamente qual ação deseja realizar sobre a simulação.

Para gerar os contratos, o comando obrigatório é `"create_loans"`.

**Exemplo de Payload a ser enviado no Body:**

```json
{
  "command": "create_loans"
}
```[cite: 12]

```

# Passo 6: Consulta de Contratos de Empréstimo

**Método:** `GET`
**Endpoint:** `/v3/loans/simulation/{{simulation_id}}`

## 1. A Necessidade: Por que este é o último passo?

Após comandar a geração dos contratos na plataforma da bancarizadora (Passo 5), a sua aplicação precisa de um mecanismo de validação final. A digitação em si já terminou, mas no mundo das integrações de software, é estritamente necessário ter o retorno (feedback) do que foi processado.

Este endpoint permite consultar de forma abrangente todos os contratos de empréstimo (ou cartão benefício) que foram vinculados à simulação específica que você construiu durante todo esse fluxo. É a auditoria de conclusão do ciclo de "digitação automática".

## 2. A Conclusão: O que obtemos neste passo?

Sendo a última etapa, a consequência aqui é a obtenção dos dados cristalizados da operação.

O corpo da resposta trará a lista completa dos contratos gerados no banco, contendo informações definitivas como o número de cada contrato averbado, o status de formalização em que se encontram (ex: aguardando assinatura do cliente, integrado, pendente) e todos os espelhos financeiros reais. É com o retorno desta requisição que o sistema interno da sua empresa de crédito consignado será atualizado, mudando o status do lead/cliente de "em digitação" para "proposta gerada/contrato emitido".

## 3. Como realizar a requisição

### 3.1. Fomentando o Cabeçalho (Headers) e a Rota (URL)

Como se trata de uma requisição de consulta (`GET`), não há envio de payload (corpo/body). Toda a instrução é passada via cabeçalho e parâmetro de rota.

Você deverá utilizar pela última vez o ID da simulação que vem guiando o fluxo desde o Passo 2.

* **Header `apikey**`: `{{sua_api_key_aqui}}`

* **Path Variable `{{simulation_id}}**`: O identificador único da simulação que originou os contratos.



**Exemplo de Requisição (cURL):**

```bash
curl --location 'https://integration.ajin.io/v3/loans/simulation/{{simulation_id}}' \
--header 'apikey: {{apikey}}'
```[cite: 12]

---

Com este sexto e último passo documentado, o detalhamento do fluxo técnico de digitação automática (Cálculo Prévio -> Criação da Simulação -> Obtenção do Termo -> Assinatura do Termo -> Geração dos Contratos -> Consulta) está completo!

```