# Passo 1: Cálculo Prévio da Simulação (Portabilidade com Refinanciamento)

**Método:** `POST`
**Endpoint:** `/v3/loan-inss-simulations/calculation`

## 1. A Necessidade: Por que começamos por aqui?

Na modalidade de **Portabilidade com Refinanciamento**, a complexidade da operação aumenta consideravelmente. O processo exige não apenas a transferência da dívida de outra instituição, mas também a reestruturação simultânea do contrato para liberar capital adicional (troco) ao cliente.

O endpoint de cálculo prévio é mandatório porque o motor de crédito precisa validar as condições matemáticas de dois cenários na mesma requisição: as condições da portabilidade da dívida original e as condições do novo refinanciamento. Realizar este cálculo evita a criação de propostas com margem estourada ou cálculos de saldo devedor incompatíveis com a política da bancarizadora.

## 2. A Consequência: O que é carregado para o próximo passo?

Uma resposta bem-sucedida (200 OK) atesta que a combinação de liquidação do saldo devedor no banco de origem e a nova taxa/prazo do refinanciamento são matematicamente viáveis.

Os dados exatos utilizados e aprovados neste payload (como valores de parcela, taxa e dados do contrato base) deverão ser transportados integralmente para o **Passo 2**, compondo o nó `items[]` na criação definitiva da simulação.

---

## 3. Como realizar a requisição

### 3.1. Fomentando o Cabeçalho (Headers)

A autenticação exige a sua chave de acesso segura.

* **apikey**: `{{sua_api_key_aqui}}`

* **Content-Type**: `application/json`

### 3.2. Pré-requisito: Como obter o `ruleId`

O identificador da tabela (`ruleId`) para esta modalidade não é o mesmo de Contrato Novo. Você deve buscar ativamente a tabela específica de Portabilidade + Refinanciamento.

**Passo a passo para obter o `ruleId`:**

1. Faça um `POST` no endpoint `/v3/loan-product-rules/search/basic`.


2. Envie o filtro de `operation.code.eq` igual a **4** (que corresponde à operação de Portabilidade + Refinanciamento na arquitetura da API).

**Body da requisição de busca de regras:**

```json
{
  "offset": 0,
  "limit": 20,
  "operation": {
    "code": {
      "eq": 4
    }
  }
}

```

Capture o `Id` (UUID) retornado na regra escolhida e utilize-o como seu `{{portRefinRuleId}}` no corpo da requisição da calculadora.

### 3.3. Fomentando o Corpo (Body) da Calculadora

O payload desta calculadora é subdividido em três frentes: os dados do contrato consolidado, os dados intrínsecos do contrato de origem (`originContract`) e as condições estipuladas para a renovação (`refinancing`).

**Estrutura de Parâmetros Obrigatórios:**

* **Campos Raiz:**
* `ruleId` (string/UUID): ID da tabela de produto.


* `term` (number): Prazo da portabilidade em meses.


* `rate` (number): Taxa de juros da portabilidade.


* `installmentValue` (number): Valor da parcela da portabilidade.


* `loanValue` (number): Valor total do empréstimo.


* `has Insurance` (boolean): `true` para incluir seguro, `false` para remover.




* **Objeto `originContract` (O contrato que está sendo comprado):**
* `lenderCode` (number): Código do banco/credor de origem.


* `dueBalanceValue` (number): Saldo devedor atual do contrato no banco de origem.


* *Nota estrutural extraída do exemplo:* Enviar também `contractNumber` (número do contrato original), `term` (prazo original), `installmentsRemaining` (parcelas restantes) e `installmentValue` (valor original da parcela).




* **Objeto `refinancing` (A reestruturação):**
* `term` (number): Prazo do refinanciamento em meses.


* `rate` (number): Taxa de juros do refinanciamento.


* `installmentValue` (number): Valor da parcela do refinanciamento.





**Parâmetros Opcionais:**

* `referenceCode` (string/null): Código de referência externo.



**Exemplo Completo do Payload a ser enviado no Body:**

```json
{
  "ruleId": "{{portRefinRuleId}}",
  "term": 66,
  "rate": 1.2993,
  "installmentValue": 300,
  "loanValue": 13000,
  "originContract": {
    "lenderCode": 237,
    "contractNumber": "213623",
    "term": 84,
    "installmentsRemaining": 66,
    "installmentValue": 300,
    "dueBalanceValue": 13000
  },
  "refinancing": {
    "term": 96,
    "rate": 1.70,
    "installmentValue": 300
  },
  "has Insurance": false,
  "referenceCode": null
}

```


# Passo 2: Criação da Simulação da Proposta (Portabilidade com Refinanciamento)

**Método:** `POST`
**Endpoint:** `/v3/loan-inss-simulations`

## 1. A Necessidade: Por que este é o segundo passo?

Após validar a viabilidade comercial das duas frentes da operação (a compra da dívida e a liberação de novo crédito) na calculadora do Passo 1, o sistema precisa formalizar essa intenção complexa na base de dados da bancarizadora.

Este endpoint é responsável por criar a simulação que combina a portabilidade do contrato de outra instituição com o refinanciamento adicional. É neste momento que você une os dados biográficos e de benefício do tomador (cliente) com as condições financeiras exatas aprovadas no passo anterior.

## 2. A Consequência: O que é carregado para o próximo passo?

O sucesso desta requisição efetiva o dossiê da proposta no sistema. A consequência imediata e mais importante é o retorno do **ID da Simulação** (`simulation_id`) no corpo da resposta (response).

Este identificador passa a ser a chave central da operação. Você precisará dele obrigatoriamente para resgatar o termo de autorização do INSS (Passo 3), comandar a geração das CCBs (Passo 5) e realizar a auditoria final (Passo 6).

---

## 3. Como realizar a requisição

### 3.1. Fomentando o Cabeçalho (Headers)

A autenticação segue o padrão global da API, exigindo a chave de integração.

* **apikey**: `{{sua_api_key_aqui}}`

* **Content-Type**: `application/json`

### 3.2. Fomentando o Corpo (Body) e a Herança do Passo 1

O corpo da requisição consolida todos os dados do cliente e da operação. O ponto de maior atenção para os desenvolvedores está no array `items[]`.

> **Atenção à Herança do Passo 1:** Os dados contidos no objeto da operação, bem como os nós `originContract` e `refinancing` dentro de `items[]`, **devem refletir exatamente** o que foi enviado e aprovado no endpoint de Cálculo Prévio.

**Estrutura de Parâmetros:**

* **`borrower`**: Objeto com os dados do tomador. Requer nome, CPF (`identity`), número do benefício, renda, endereço completo e dados do documento de identificação.


* **`items[]`**: Array contendo a estrutura da operação aprovada. Requer o `ruleId` (ID da tabela de produto), além dos dados vitais da portabilidade (como prazo, taxa, parcela e valor total).


* **`originContract`**: Dados obrigatórios do contrato de origem a ser portado.


* **`refinancing`**: Dados estruturais obrigatórios contendo prazo, taxa e parcela exclusivos da parte do refinanciamento.


* **`has Insurance`**: Indicação booleana sobre a inclusão de seguro.




* **`creditBankAccount`**: Dados bancários do cliente para crédito do capital adicional (troco).


* **`files`**: Array para recebimento dos identificadores dos documentos anexados (frente e verso).


* **`step.code`**: Etapa da proposta.


* **`validate`**: Booleano opcional utilizado para testar a validação antes da efetivação.



**Exemplo Completo do Payload a ser enviado no Body:**

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
      "ruleId": "{{portRefinRuleId}}",
      "term": 66,
      "rate": 1.2993,
      "installmentValue": 300,
      "loanValue": 13000,
      "originContract": {
        "lenderCode": 237,
        "contractNumber": "213623",
        "term": 84,
        "installmentsRemaining": 66,
        "installmentValue": 300,
        "dueBalanceValue": 13000
      },
      "refinancing": {
        "term": 84,
        "rate": 1.66,
        "installmentValue": 300
      },
      "has Insurance": false,
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
    "name": "string"
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
  "accessId": null,
  "validate": true
}
```[cite: 15]

```

# Passo 3: Obtenção do Termo de Autorização (Portabilidade com Refinanciamento)

**Método:** `GET`
**Endpoint:** `/v3/loan-inss-simulations/{{simulation_id}}/auth-term`

## 1. A Necessidade: Por que este é o terceiro passo?

Com a simulação da portabilidade com refinanciamento devidamente criada no Passo 2, a operação recebe um identificador único (`simulation_id`). Para dar continuidade à esteira, a bancarizadora exige uma autorização formal para consultar os dados do benefício INSS do cliente e validar a margem disponível para as duas operações simultâneas (a migração da dívida e o novo crédito).

Este endpoint é acionado justamente para solicitar o termo de autorização atrelado a essa simulação específica, permitindo a consulta ao benefício INSS.

## 2. A Consequência: O que é carregado para o próximo passo?

Como resposta a esta requisição, o sistema retornará os dados do termo de autorização gerado. O dado mais crítico a ser extraído daqui é o campo `key`.

Esta chave retornada deve ser obrigatoriamente salva em memória pelo seu sistema (Agente Antigravity), pois ela será utilizada no próximo passo para realizar a assinatura eletrônica do termo. Além disso, o sistema deve verificar o status retornado para confirmar se a assinatura é exigida antes de avançar.

## 3. Como realizar a requisição

### 3.1. Fomentando o Cabeçalho (Headers) e a Rota (URL)

Por ser uma requisição do tipo `GET`, não há necessidade de enviar um corpo de requisição (JSON). Os parâmetros de roteamento e de segurança são passados diretamente na URL e no cabeçalho.

* **Header `apikey**`: A sua chave de integração pessoal e intransferível.


* **Path Variable `{{simulation_id}}**`: O ID da simulação retornado com sucesso no Passo 2, injetado diretamente na rota da URL.



### 3.2. Exemplo de Requisição

Abaixo está o modelo de como a requisição deve ser estruturada e disparada para a API:

**CURL:**

```bash
curl --location 'https://integration.ajin.io/v3/loan-inss-simulations/{{simulation_id}}/auth-term' \
--header 'apikey: {{apikey}}'
```[cite: 15]

```

# Passo 4: Assinatura do Termo de Autorização (Portabilidade com Refinanciamento)

**Método:** `PUT`
**Endpoint:** `/v3/signer/{{auth_term_key}}/accept`

## 1. A Necessidade: Por que este é o quarto passo?

Uma vez que o termo de autorização foi gerado e sua chave capturada no Passo 3, é indispensável registrar a assinatura (ou o aceite) eletrônico deste documento. Sem esta assinatura, a bancarizadora não possui base legal para acessar o benefício INSS do tomador e averbar a operação de Portabilidade com Refinanciamento.

**Regra de Negócio Crítica:** O sistema da sua empresa (ou o seu agente de automação) deve aplicar uma validação rigorosa antes de acionar esta rota. Este endpoint **só deve ser executado se o campo `status.key` for diferente de `'signed'**` no response retornado pelo endpoint do passo anterior. Caso o termo já conste como assinado, este passo deve ser ignorado para evitar erros de conflito, saltando diretamente para a geração dos contratos.

## 2. A Consequência: O que é carregado para o próximo passo?

A aprovação desta requisição (Status 200 OK) muda o estado da simulação. O dossiê deixa de estar pendente de autorização do cliente/INSS e passa a estar liberado para o comando de formalização bancária. A chave do termo em si conclui seu ciclo de utilidade aqui, e o fluxo voltará a utilizar o `simulation_id` original para o Passo 5.

## 3. Como realizar a requisição

### 3.1. Fomentando o Cabeçalho (Headers) e a Rota (URL)

A rota da requisição exige a injeção dinâmica da chave única do termo.

* **Header `apikey**`: A sua chave de integração pessoal e intransferível.


* **Header `Content-Type**`: `application/json`
* **Path Variable `{{auth_term_key}}**`: O valor do campo `key` resgatado no Passo 3, substituindo o placeholder na URL.



### 3.2. Fomentando o Corpo (Body)

O método `PUT` deste endpoint requer o envio de um payload com os dados de geolocalização do momento em que a assinatura ocorreu para fins de auditoria e segurança.

O objeto raiz deve se chamar `position`, contendo obrigatoriamente as chaves `latitude` e `longitude` no formato de string.

**Exemplo de Payload a ser enviado no Body:**

```json
{
  "position": {
    "latitude": "-235489",
    "longitude": "-466388"
  }
}
```[cite: 15]

```

# Passo 5: Geração (Efetivação) dos Contratos (Portabilidade com Refinanciamento)

**Método:** `POST`
**Endpoint:** `/v3/loan-inss-simulations/{{simulation_id}}/actions`

## 1. A Necessidade: Por que este é o quinto passo?

Até este ponto da integração, você estruturou a operação de migração de dívida e liberação de novo crédito (Passo 1 e 2) e garantiu que o banco possua a permissão legal para consultar os dados do cliente no INSS (Passo 3 e 4).

Agora, a simulação encontra-se aprovada e apta para emissão. A finalidade deste endpoint é acionar o gatilho final no sistema da JoinBank, sendo o responsável por transformar essa simulação aprovada em contratos efetivos, o que inicia formalmente o processo de formalização e assinatura das cédulas de crédito.

## 2. A Consequência: O que é carregado para o próximo passo?

A execução bem-sucedida desta requisição consolida a "digitação automática". Os contratos reais, tanto os pertinentes à portabilidade quanto os do refinanciamento da margem, são gerados no backoffice da instituição financeira.

A partir deste momento, não são necessárias novas ações de inserção ou alteração de dados. O fluxo avança para o último passo (Passo 6), que consiste apenas em consultar a base da bancarizadora para resgatar os dados definitivos e o status dos contratos recém-gerados, retroalimentando o sistema da sua empresa.

## 3. Como realizar a requisição

### 3.1. Fomentando o Cabeçalho (Headers) e a Rota (URL)

A requisição volta a utilizar o identificador principal da proposta.

* **Header `apikey**`: A sua chave de integração pessoal e intransferível.


* **Header `Content-Type**`: `application/json`
* **Path Variable `{{simulation_id}}**`: O ID da simulação obtido lá no Passo 2. Ele deve ser injetado na URL.



### 3.2. Fomentando o Corpo (Body)

Como a rota `/actions` é um controlador de ações de estado, ela exige que você declare explicitamente qual comando deseja executar sobre a simulação.

Para ordenar a efetivação da proposta, o corpo da requisição em JSON deve conter o atributo `command` preenchido com a instrução `"create_loans"`.

**Exemplo de Payload a ser enviado no Body:**

```json
{
  "command": "create_loans"
}
```[cite: 15]

```

# Passo 6: Consulta Final da Operação (Portabilidade com Refinanciamento)

**Método:** `GET`
**Endpoint:** `/v3/loans/simulation/{{simulation_id}}`

## 1. A Necessidade: Por que este é o último passo?

Com o comando de geração enviado no Passo 5, a operação de "Portabilidade com Refinanciamento" foi efetivada na bancarizadora. No entanto, sua esteira de automação (como o Agente Antigravity) precisa do retorno dessa operação para retroalimentar o seu sistema interno.

A necessidade deste endpoint é justamente realizar a consulta final da operação. Ele permite consultar todos os contratos de empréstimo que foram vinculados à simulação específica gerada ao longo deste fluxo. É a auditoria de conclusão, confirmando se os contratos de liquidação (da dívida original) e do novo crédito foram emitidos com sucesso.

## 2. A Conclusão: O que obtemos neste passo?

Sendo a etapa de fechamento, a consequência é a cristalização dos dados. O corpo da resposta trará um array com os contratos definitivos vinculados a este `simulation_id`.

É com o retorno desta requisição que o status do seu cliente (beneficiário do INSS) mudará definitivamente no seu CRM ou sistema de gestão, encerrando o ciclo de "digitação" e passando para a fase de acompanhamento de averbação e pagamento.

## 3. Como realizar a requisição

### 3.1. Fomentando o Cabeçalho (Headers) e a Rota (URL)

Por ser uma requisição de consulta simples (`GET`), você não enviará um corpo de requisição (JSON).

* **Header `apikey**`: A sua chave de integração pessoal e intransferível.


* **Path Variable `{{simulation_id}}**`: O mesmo ID da simulação que você vem utilizando desde o Passo 2.



### 3.2. Exemplo de Requisição

Abaixo está a demonstração de como efetuar a chamada final:

**CURL:**

```bash
curl --location 'https://integration.ajin.io/v3/loans/simulation/{{simulation_id}}' \
--header 'apikey: {{apikey}}'
```[cite: 15]

---

```