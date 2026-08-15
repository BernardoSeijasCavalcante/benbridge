Ao desenhar a distribuição de tarefas dessa funcionalidade, o ideal é dividir as responsabilidades estruturais entre chamadas síncronas, rotinas em segundo plano (workers) e a lógica estrita da sua regra de negócio.

Abaixo está o plano arquitetural detalhado para orquestrar essa operação.

## Plano de Implementação: Orquestração da IN100 e Análise de Crédito

### 1. Iniciação da Consulta (O Gatilho)

* **Ação:** O seu backend dispara a requisição `POST` para `[https://integration.ajin.io/v3/query-inss-balances/finder](https://integration.ajin.io/v3/query-inss-balances/finder)`.
* **Payload:** Envie obrigatoriamente os campos `identity` (CPF do titular) e `benefitNumber` (Número do benefício INSS).
* **Persistência:** Capture o identificador único (UUID) retornado no response e salve-o no banco de dados da sua aplicação, vinculado ao cadastro do cliente.
* **Captura do Link:** Isole a URL de autorização devolvida pelo banco no payload inicial.

### 2. Consentimento do Cliente

* **Pausa na Esteira:** O status interno da proposta no seu sistema deve mudar para algo como "Aguardando Autorização IN100". O fluxo sistêmico congela até a ação humana.

### 3. Resgate dos Dados (Worker / Polling)

* **Ação:** Como o cliente pode levar horas para assinar, implemente uma rotina de repetição que verifica periodicamente o status das consultas paralisadas.
* **Execução:** O seu worker deve disparar um `GET` para o endpoint `[https://integration.ajin.io/v3/query-inss-balances/](https://integration.ajin.io/v3/query-inss-balances/){{query_inss_balance_id}}`, injetando na URL o UUID salvo na Etapa 1.
* **Condição de Sucesso:** A rotina deve parar de consultar quando a requisição retornar o resultado completo da consulta IN100, incluindo os saldos e reservas preenchidos.

### 4. Motor de Análise de Crédito (A Regra de Negócio)

* **Ação:** Faça o *parse* do JSON retornado na Etapa 3 e extraia o valor exato da chave `availableTotalBalance`.
* **Lógica de Validação:** Implemente a verificação estipulada pela sua regra.

```javascript
// Exemplo lógico de implementação
const saldoDisponivel = responseIN100.availableTotalBalance;

if (saldoDisponivel >= 0) {
    // Análise Aprovada: Cliente possui margem positiva ou zerada.
    // Gatilho: Seguir para a próxima etapa.
    executarPasso5(simulation_id); 
} else {
    // Análise Reprovada: Cliente possui margem negativa.
    // Gatilho: Interromper fluxo e notificar recusa.
    reprovarPropostaInternamente();
}

```

### 5. Efetivação da Proposta (O Passo 5)

* **Ação:** Acionada exclusivamente pelo sucesso do bloco condicional da Fase 4.
* **Execução:** O seu sistema realiza a requisição final (o comando `create_loans` detalhado anteriormente no seu fluxo) para formalizar a proposta de fato, emitindo a documentação de crédito final para o cliente assinar.