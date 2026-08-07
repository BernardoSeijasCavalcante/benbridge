## Pré-requisito (Passo 1.5): Upload de Documentos de Identificação (Por URL)

**Método:** `POST`
**Endpoint:** `/v3/files/upload-by-url`

### 1. A Necessidade
Antes de disparar a criação da simulação (Passo 2), a bancarizadora exige que os documentos de identificação do tomador já estejam armazenados em sua plataforma para uso posterior, como a anexação à proposta[cite: 16]. 

A API da JoinBank realiza a importação do arquivo através de uma URL pública[cite: 16]. Isso significa que a sua aplicação deverá hospedar temporariamente a imagem do documento do cliente em um link público (como um *storage* em nuvem temporário com acesso de leitura) para que o sistema da bancarizadora possa acessá-lo e copiá-lo.

### 2. A Consequência: O que é carregado para o próximo passo?
Ao realizar a requisição informando a URL, a API fará a captura do arquivo e retornará um identificador único (UUID)[cite: 16]. 

Este identificador (`file_id`) deverá ser guardado em memória pela sua aplicação, pois ele será utilizado para popular o array `files[]` no corpo da requisição do **Passo 2 (Criação da Simulação)**, substituindo os *placeholders* `{{doc_front_id}}` e `{{doc_back_id}}`.

### 3. Como realizar a requisição

#### 3.1. Fomentando o Cabeçalho (Headers)
A requisição requer autenticação, utilizando a chave que garante o controle de acesso às operações[cite: 16].

*   **apikey**: `{{sua_api_key_aqui}}`
*   **Content-Type**: `application/json`

#### 3.2. Fomentando o Corpo (Body)
O corpo da requisição deve ser enviado no formato JSON e conter obrigatoriamente a propriedade `url`, que informará a URL pública de onde o arquivo deve ser importado[cite: 16].

**Exemplo de Payload a ser enviado no Body:**
```json
{
  "url": "[https://dieghernan.github.io/assets/img/samples/sample_1.3mb.jpg](https://dieghernan.github.io/assets/img/samples/sample_1.3mb.jpg)"
}
```

#### 3.3. Tratamento da Resposta e Injeção no Passo 2
Você deverá executar essa requisição **duas vezes**: uma para importar a URL contendo a frente do documento e outra para importar o verso.

1. Faça o request enviando a URL da imagem frontal. Capture o `id` (UUID) retornado.
2. Faça o request enviando a URL da imagem traseira (verso). Capture o `id` (UUID) retornado.
3. No payload do **Passo 2**, estruture o array `files` referenciando os respectivos IDs resgatados:

```json
  "files": [
    {
      "id": "UUID_obtido_para_a_frente",
      "type": "doc_front"
    },
    {
      "id": "UUID_obtido_para_o_verso",
      "type": "doc_back"
    }
  ]

```

> **Dica de Validação:** Caso seja necessário conferir os dados e metadados de um arquivo previamente enviado, a API disponibiliza o endpoint de seleção `GET /v3/files/{{file_id}}`, bastando injetar o UUID retornado na rota.
> 
> 

---
