# BenBridge API - Guia de Integração para Digitação de Propostas

Este documento detalha como aplicações clientes devem utilizar a API da **BenBridge** para realizar a digitação, processamento e efetivação de propostas de crédito consignado. 

A BenBridge atua como uma *engine* facilitadora: você pode optar por fluxos automatizados (que preenchem e orquestram tudo para você) ou fluxos manuais passo a passo (que te dão controle absoluto de cada etapa na bancarizadora).

---

## 1. Autenticação e Cabeçalhos (Headers)

Todas as requisições para a API devem ser feitas para a rota base `/api/` e exigem autenticação rigorosa.

**Headers Obrigatórios:**
- `x-api-key` (ou `Authorization: Bearer <token>`): A chave de acesso (API Key) fornecida para sua aplicação.
- `Content-Type`: `application/json`

*(Nota: Na ausência ou erro desta chave, a API retornará o status `401 Unauthorized`).*

---

## 2. Passo Inicial: Upload de Documentos

O fluxo da BenBridge começa pela preparação do dossiê do cliente. Antes de criar a proposta oficial, os arquivos e documentos de identificação (RG/CNH frontais e traseiros) do tomador devem ser anexados na plataforma da bancarizadora.

**Métodos:** `POST`
**Endpoints:** `/api/upload-document` ou `/api/upload-document-url`

Esses endpoints irão retornar os IDs únicos dos documentos (`files.id`). Esses IDs são de extrema importância, pois serão obrigatórios na composição do payload dos passos seguintes (como o Smart Creation).

**Exemplo de Retorno (Response):**
```json
{
    "success": true,
    "file_id": "5b7a4c02-f731-4a72-aa8f-e88034180cb3",
    "message": "File securely processed and uploaded to JoinBank."
}
```

---

## 3. Fluxo Principal: Smart Creation (Recomendado)

O fluxo "Smart Creation" orquestra automaticamente o resgate de informações e o cálculo das propostas. No entanto, sua parametrização de intenção de crédito exige alta precisão.

### Passo 3.1: Iniciar a Proposta Inteligente
**Método:** `POST`
**Endpoint:** `/api/process-smart-creation`

**Corpo (Body) da Requisição:**
```json
{
  "beneficio": "0254333045",
  "operationCode": 4,
  "bank": "qualibank",
  "items": [
    {
      "loanValue": 23955.92, 
      "installmentValue": 516.21,
      "term": 96,
      "rate": 1.5,
      "desiredTerm": 108,
      "originContract": {
        "lenderCode": 626,
        "contractDate": "2023-01-15",
        "dueBalanceValue": 23955.92,
        "contractNumber": "1900792684",
        "term": 96,
        "installmentsRemaining": 81,
        "installmentValue": 516.21
      },
      "refinancing": {
        "installmentValue": 516.21
      },
      "hasInsurance": false
    }
  ],
  "files": [ 
    { "id": "ab3c0077-0707-4e52-87a2-e361ec05e902", "type": "doc_front" },
    { "id": "c71cbd28-4ec3-4fea-bd21-cfc0f7c3f258", "type": "doc_back" }
  ]
}
```

**Natureza dos Atributos Obrigatórios:**
- `beneficio` *(string)*: Número do benefício INSS do tomador. Através dele, a BenBridge recupera os dados cadastrais via Datahub.
- `operationCode` *(number)*: Código da operação na bancarizadora (ex: `4` para Margem Livre/Novo).
- `bank` *(string)*: Banco integrador de destino (Padrão: `qualibank`). Atributo importante para o roteamento em futuras atualizações da API.
- `items` *(array)*: Lista com as intenções financeiras exatas e histórico do contrato (especialmente para refinanciamento e portabilidade).
  - `loanValue` *(number)*: Valor do empréstimo pretendido (ou saldo devedor atual).
  - `installmentValue` *(number)*: Valor da parcela atual ou pretendida.
  - `term` *(number)*: Prazo atual do contrato.
  - `rate` *(number)*: Taxa de juros mensal almejada ou atual.
  - `desiredTerm` *(number)*: Novo prazo desejado (ex: alongar para 108 meses).
  - `originContract` *(object)*: Dados precisos do contrato de origem a ser negociado. (Obrigatório informar banco origem `lenderCode`, data de emissão `contractDate`, saldo `dueBalanceValue`, número `contractNumber`, prazo `term`, parcelas restantes `installmentsRemaining` e valor da parcela `installmentValue`).
  - `refinancing` *(object)*: Dados pertinentes ao refinanciamento (como o `installmentValue`).
  - `hasInsurance` *(boolean)*: Define se o cálculo vai incluir seguro (`true`) ou não (`false`).
- `files` *(array)*: Lista dos anexos enviados no *Passo 2*.
  - `id` *(string)*: O UUID do documento retornado no endpoint de upload.
  - `type` *(string)*: Tipo do documento (ex: `doc_front`, `doc_back`).

**Comportamento e Retorno:**
A BenBridge validará os dados offline, fará o cálculo da simulação e registrará a proposta no banco local. Em seguida, disparará a consulta IN100 e devolverá o status pendente e os dados da solicitação.

**Exemplo de Retorno (Response):**
```json
{
    "success": true,
    "internalId": 23,
    "identity": "14310094821",
    "benefitNumber": "254463045",
    "in100": {
        "queryId": "b15129ab-9f89-4e87-9de8-9a696616e10b",
        "status": "pending_authorization"
    },
    "message": "Dados recuperados, payload salvo e IN100 iniciada. Aguardando autorização do cliente."
}
```
*(Nota: O cliente receberá o link de autorização IN100 nativamente pelo integrador ou sua aplicação pode mapeá-lo dependendo da evolução da API).*

### Passo 3.2: Retomar e Finalizar (Após Autorização do Cliente)
**Método:** `POST`
**Endpoint:** `/api/process-finish-in100/:internalId`

Assim que o cliente aprovar o consentimento da IN100 pelo link recebido, a aplicação deve chamar este endpoint passando o `internalId` na URL.

**Corpo (Body) da Requisição:**
```json
{
  "latitude": "-23.5489",
  "longitude": "-46.6388"
}
```
**Natureza dos Atributos:**
- `latitude` / `longitude` *(string, recomendados)*: Geolocalização (real ou aproximada) no momento da confirmação para assinar digitalmente os termos e destrancar a formalização de contratos.

**Comportamento e Retorno:**
A engine irá criar a simulação oficial, resgatar o termo de autorização, assiná-lo e efetivar a geração do(s) contrato(s), retornando os espelhos finais das CCBs.

**Exemplo de Retorno (Response):**
```json
{
    "success": true,
    "internalId": 23,
    "in100": {
        "status": "completed",
        "availableBalance": 0
    },
    "url": "https://signer.ajin.io/B7SVj6LF40lPRetV3slShYeDEKNqLt0bM4a2IExoInY6Gm3v6ifWCa-m9hAvxetxp5Vwjc86z1s6zB0mG2jPFA",
    "processResult": {
        "..." // Aqui constará o resultado completo da simulação de empréstimo (Contratos CCB gerados e averbados)
    },
    "executionTrace": [
        "Consulta Status IN100: Retornou Payload",
        "IN100 Análise: Saldo Disponível = 0",
        "IN100 Análise: Aprovada",
        "Delegado para ProcessLoanSimulationUseCase"
    ]
}
```

---

## 4. Fluxo Automático Tradicional (Dossiê Completo)

Se a sua aplicação preferir controlar a captura de dados do cliente manualmente (sem Datahub), você pode passar o pacote inteiro para a BenBridge cuidar de tudo em um único disparo. *Nota: Os IDs dos documentos do Passo 2 ainda são exigidos.*

**Método:** `POST`
**Endpoint:** `/api/process`

**Corpo (Body) da Requisição:**
```json
{
  "operationCode": 4,
  "latitude": "-23.5489",
  "longitude": "-46.6388",
  "borrowerData": {
    "borrower": {
      "name": "NOME COMPLETO DO CLIENTE",
      "identity": "11122233344",
      "benefit": "1234567890",
      "benefitState": "SP",
      "benefitStartDate": "2020-01-01",
      "benefitPaymentMethod": 1,
      "benefitType": 42,
      "birthDate": "1970-01-01",
      "motherName": "NOME DA MAE COMPLETO",
      "maritalStatus": "Solteiro",
      "sex": "Feminino",
      "income": 1500.00,
      "phone": "11999999999",
      "email": "cliente@gmail.com",
      "address": {
        "street": "Rua Central",
        "number": "100",
        "district": "Centro",
        "city": "São Paulo",
        "state": "SP",
        "zipCode": "01001000"
      },
      "document": {
        "type": { "code": "RG", "name": "Registro Geral" },
        "number": "12345678",
        "issuingDate": "2010-01-01",
        "issuingEntity": "SSP",
        "issuingState": "SP"
      }
    },
    "creditBankAccount": {
      "bank": "001",
      "branch": "1234",
      "number": "12345",
      "digit": "6"
    }
  },
  "items": [
    {
      "loanValue": 5000.00,
      "rate": 1.66,
      "term": 84,
      "hasInsurance": false
    }
  ],
  "files": [ 
    { "id": "ab3c0077-0707-4e52-87a2-e361ec05e902", "type": "doc_front" },
    { "id": "c71cbd28-4ec3-4fea-bd21-cfc0f7c3f258", "type": "doc_back" }
  ]
}
```

Neste modelo, o motor tentará enquadrar a regra ("Smart Calculation"), criará a simulação na bancarizadora, assinará termos baseados nas lats/longs enviadas e comandará a efetivação automaticamente. 

---

## 5. Fluxos Manuais (Passo a Passo)

Para quem precisa de controle transacional granular, a BenBridge expõe as engrenagens separadamente:

### 5.1. Cálculo Inteligente
**`POST /api/smart-calculation`**
Você passa apenas o valor, a taxa pretendida e as opções. O motor varre todas as regras de tabelas (que atendem sem carência e sem seguro) testando até obter aprovação do cálculo e devolve a `ruleId` (Tabela) adequada.

### 5.2. Cálculo Explícito
**`POST /api/calculation`**
Se você já possui a `ruleId` e deseja passar as informações financeiras rígidas para a validação matemática do banco.

### 5.3. Criação da Simulação
**`POST /api/simulations`**
Insere o dossiê de proposta perante a instituição financeira. O retorno mais valioso é o `simulation_id`, chave mestre para os passos subsequentes.

### 5.4. Resgatar Termo de Autorização
**`GET /api/simulation/:id/auth-term`**
*(Onde `:id` é o `simulation_id`).* Verifica a pendência legal da autorização INSS e devolve um objeto contendo o `status` atual e a `key` para assinatura.

### 5.5. Aceitar / Assinar o Termo
**`PUT /api/signer/:key/accept`**
Envia latitude e longitude confirmando o aceite eletrônico do cliente para aquela `key` de termo. Libera a proposta para efetivação.

### 5.6. Efetivar Proposta (Criar Contratos)
**`POST /api/simulation/:id/actions`**
Gatilho final. Exige payload: `{"command": "create_loans"}`. Diz à bancarizadora: "Terminamos a montagem da proposta. Formalize em CCB".

### 5.7. Consultar Final
**`GET /api/loans/simulation/:id`**
Retorna todos os detalhes do crédito gerado, averbação, Cédula de Crédito, repasses e o status terminal do negócio.

---

## 6. Ferramentas de Suporte

### Consulta de Estado (Debug/Log)
**`GET /api/internal-status/:internalId`**
Verifica no banco de dados local SQLite da BenBridge qual o estágio da simulação e devolve um rastreio detalhado (logs de sucesso ou falha na integração com o banco). Excelente para investigar porque uma submissão automática falhou.
