# Funcionalidade: Tratamento de Dados Vitais no Smart Creation

A integração com o **Datahub** através do fluxo `smart-creation` pode ocasionalmente retornar dados incompletos ou nulos, como informações bancárias, endereço ou nome do cliente. Para evitar que a proposta siga incompleta e apresente falhas nas etapas de formalização do contrato, implementamos um fluxo para identificar e coletar essas informações **antes** do processamento final.

## Como funciona?

1. **Identificação de Dados Faltantes**
   Ao chamar o endpoint `POST /process-smart-creation`, a API BenBridge irá validar os dados retornados pelo Datahub em tempo real. Foram definidos como **Dados Vitais**:
   - Dados Pessoais: Nome, Data de Nascimento, CPF, RG, Nome da Mãe.
   - Endereço: Endereço (Logradouro), Bairro, Cidade, CEP.
   - Dados do Benefício: Benefício, Espécie, Renda.
   - Dados Bancários: Banco, Agência, Conta.

2. **Notificação ao Frontend**
   Caso algum desses campos esteja nulo ou não retorne da fonte de dados, o endpoint ainda irá registrar a simulação inicial para iniciar a consulta da IN100, mas incluirá na resposta um novo array indicando o que faltou, por exemplo:
   ```json
   {
     "success": true,
     "internalId": 123,
     "missingData": ["banco", "agencia", "conta"],
     "message": "Atenção: faltam dados vitais do Datahub. Envie-os na próxima requisição (check-in100-and-finish). ..."
   }
   ```

3. **Intervenção do Cliente**
   O Frontend deve ler o array `missingData`. Se ele existir e for maior que zero, o usuário precisará preencher essas informações em um formulário na tela da aplicação.

4. **Retomada do Fluxo (Overrides)**
   Ao prosseguir e enviar a próxima requisição para finalizar a digitação no endpoint `POST /check-in100-and-finish/:internalId`, a aplicação deve enviar as informações coletadas no corpo da requisição usando a propriedade `borrowerDataOverrides`.

   **Exemplo de Payload com Overrides:**
   ```json
   {
     "latitude": "-23.5489",
     "longitude": "-46.6388",
     "borrowerDataOverrides": {
       "name": "João Silva",
       "creditBankAccount": {
         "bank": "341",
         "branch": "0001",
         "number": "12345",
         "digit": "6"
       }
     }
   }
   ```

5. **Merge e Continuação**
   A API irá fazer um *merge* das informações recebidas com a base da proposta já salva e prosseguirá normalmente com as etapas de análise de crédito e criação de contrato.

## Dados Mockados

Muitos dados irrelevantes ou de baixa criticidade (como Órgão Emissor, Data de Emissão, Estado Civil, Email, Estado e UF da naturalidade) continuarão sendo **mockados automaticamente** pelo backend quando não retornados, para agilizar a criação da proposta e minimizar o impacto para o usuário.
