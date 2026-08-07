A partir deste exemplo de retorno do endpoint '/v3/loan-product-rules/search/basic':

```json
{
    "scrollId": null,
    "count": 123,
    "offset": 0,
    "limit": 0,
    "page": 1,
    "pages": 1,
    "items": [
        {
            "id": "118352cd-6bdb-4bd9-bae6-dfb75bfe2994",
            "code": "000110",
            "name": "000110 Portabilidade + Refinanciamento 1,85%",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "95a73108-bfe9-43d8-9dfb-bf13e44a2e22",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.85,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": -1
        },
        {
            "id": "ea0caa70-150b-4eb1-b3e6-22929b01893e",
            "code": "000468",
            "name": "000468 PORT + REFIN 1,80% 96X Saldo de 2mil a 5.999,99 mil - CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "d02c81dc-1cdf-4fd6-9d41-58986eeb86b1",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "c5900f8d-940e-498b-afb5-b07e9dd4264e",
            "code": "000467",
            "name": "000467 PORT + REFIN 1,83% 96X Saldo de 2mil a 5.999,99 mil CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "5e5d47a3-607b-4548-a3c1-92511190938a",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.83,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "04244a8a-5d88-4b77-a4fc-0f7d7d131654",
            "code": "000466",
            "name": "000466 PORT REFIN 1,85% 96X Saldo de 2mil a 5.999,00 mil CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "aac3f600-214f-4766-952d-1b4d33eb7679",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.85,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "4d6a416a-9279-43b6-8425-09b04af70d7a",
            "code": "000465",
            "name": "000465 PORT + REFIN 1,66% 96X min 8 mil CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "952fb664-0cd1-4edc-b878-9de940e538a6",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.66,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "78e05a53-de39-4cc1-b614-1a433199ae50",
            "code": "000464",
            "name": "000464 PORT + REFIN 1,68% 96X min 8 mil CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "cf0cd073-c10e-4e53-b31c-986fb6c56a93",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.68,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "4301c18e-6ab8-4d5f-b381-5d22f5e2a4cd",
            "code": "000463",
            "name": "000463 PORT + REFIN 1,70% 96X min 8 mil CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "de8d6ec9-42e3-4e28-bf5e-8727b3db7d21",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.7,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "77053d69-eab7-4bf9-9d5e-58151979c2c9",
            "code": "000462",
            "name": "000462 PORT + REFIN 1,72% 96x min 8 mil CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "90725fbf-fc9a-4876-ba02-250048dc1ebc",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.72,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "22c64403-67eb-4564-bd52-7207f1e02bab",
            "code": "000461",
            "name": "000461 PORT + REFIN 1,75% 96X min 8 mil CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "ba7a7508-a574-449f-b858-4dfbb9f698e4",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.75,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "52ce17c2-80ad-4a82-a3b1-f6417c8350d4",
            "code": "000460",
            "name": "000460 PORT + REFIN 1,78% 96X min 8 mil CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "ac33b48c-2514-4e4b-8291-615d44d2c8d3",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.78,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "74cdd1c4-5f65-4f73-bded-95e60781b6d4",
            "code": "000459",
            "name": "000459 PORT + REFIN 1,80% 96X MIN 6 mil CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "a52be5f6-4d45-48be-9479-eea7125baa43",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "6528cfe2-c8e9-4aa8-8b69-fca16bd88cde",
            "code": "000458",
            "name": "000458  PORT + REFIN  1,83% 96X MIN 6 MIL CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "aeec8de3-e2e9-4384-ad20-7f8f7b978b29",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.83,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "4a4e239a-12ac-43a1-b09f-d60a4eb14014",
            "code": "000457",
            "name": "000457  PORT + REFIN 1,85% 96X MIN 6 MIL CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "073e0481-3bd3-475e-8957-eb0b4042ed51",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.85,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "d4652e33-2b33-4ca1-bc91-c1465802b523",
            "code": "000432",
            "name": "000432 PORT + REFIN 1,80% 108X Saldo de 2mil a 5.999,99 mil - S/ SEG CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "b015bb4e-087e-49c6-90af-fc980fc297ef",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "5ae69675-fca6-4b4c-9def-e16dd9259414",
            "code": "000431",
            "name": "000431 PORT + REFIN 1,83% 108X Saldo de 2mil a 5.999,99 mil - S/ SEG CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "6e652635-d203-486f-9d49-fc96fb8d2909",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.83,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "fb7ed2cf-fca3-40fe-b915-4bc76127a4a0",
            "code": "000430",
            "name": "000430 PORT + REFIN 1,85% 108X Saldo de 2mil a 5.999,99 mil - S/ SEG CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "3e8c9afc-64ba-481b-b7d8-d289a4b0f610",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.85,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "1d69334c-80ed-4630-bf65-b9553880edce",
            "code": "000429",
            "name": "000429 PORT + REFIN 1,60% 108X S/ SEG min 30mil CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "861c57c1-2a65-4ef1-9b16-9abdc206de79",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.6,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "d96b5c99-ed93-4bcd-a963-3deca6529cb8",
            "code": "000428",
            "name": "000428 PORT + REFIN 1,62% 108X S/ SEG min 30mil CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "db3456ff-2303-470a-8acf-3eebb1a33fb9",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.62,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "e63e56fb-75d9-4937-9c8a-d1dbfd91eea0",
            "code": "000427",
            "name": "000427 PORT + REFIN 1,64% 108X S/ SEG min 30mil CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "fda55924-51ea-4835-b9f7-15eee3e8e9e5",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.64,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "6988778b-6092-40d7-a834-3bd6958153d6",
            "code": "000426",
            "name": "000426 PORT + REFIN 1,66% 108X S/ SEG min 8 mil CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "d0f60235-a407-4c00-8e3a-9a778a04826d",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.66,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "9cddd95d-ec5d-4987-8eb8-5a2c61718dcc",
            "code": "000425",
            "name": "000425 PORT + REFIN 1,68% 108X S/ SEG min 8 mil CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "9bdfa913-8fd4-4359-9483-774fd3dcf1bb",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.68,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "f16e7622-719e-4c18-ba73-8c651604f2cb",
            "code": "000424",
            "name": "000424 PORT + REFIN 1,70% 108X S/ SEG min 8 mil CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "3db46b5a-1eca-4f2c-b4fb-819d58c10506",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.7,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "4cd333f9-826a-4114-abbd-d7c27f1c6fca",
            "code": "000423",
            "name": "000423 PORT + REFIN 1,72% 108x S/ SEG min 8 mil CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "830a399d-bbd2-443f-93af-231523248a84",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.72,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "85c0c78e-053d-43ef-991b-6758d72652bb",
            "code": "000422",
            "name": "000422  PORT + REFIN 1,75% 108X S/ SEG min 8 mil CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "5ece5631-a12b-485d-9f92-62b2dd3873f2",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.75,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "6d6177c8-cf1d-4f3f-a075-c91f371870a6",
            "code": "000421",
            "name": "000421 PORT + REFIN 1,78% 108X S/ SEG min 8 mil CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "1aaa3130-5773-4c45-8413-93e4057a252a",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.78,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "b5274fdc-385e-4e8a-9cda-81dfce4bdf36",
            "code": "000420",
            "name": "000420 PORT + REFIN 1,80% 108X S/ SEG MIN 6 mil CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "32d6e7a8-8dd1-403b-840c-ae3a1a2ad4ce",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "996a8dcc-c405-4bc9-bb4e-5eb516d3292e",
            "code": "000419",
            "name": "000419 PORT + REFIN 1,83% 108X S/ SEG MIN 6 MIL CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "fdaa6c18-5a52-4008-acd9-38fccc3381c8",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.83,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "8d0899f8-9cd2-472d-b8ef-9cb93f67ef6e",
            "code": "000418",
            "name": "000418 PORT + REFIN 1,85% 108X S/ SEG MIN 6 MIL CAR 90D",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "842d92fe-1101-4583-9969-9c607112703d",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.85,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "70e38dfc-9373-4ffc-b821-2ba702bedff9",
            "code": "000413",
            "name": "000413 PORT + REFIN 1,60% 108X S/ SEG min 30mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "6c8e8926-d111-4227-82db-dec9bdb9ccd2",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.6,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "8c28875f-dc1f-4ff8-9616-a135ded776a5",
            "code": "000412",
            "name": "000412 PORT + REFIN 1,62% 108X S/ SEG min 30mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "ba464341-cdd0-4d54-b6e3-0f7125f3ae3b",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.62,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "14c6a076-b37e-42be-afed-dbd2977cd15a",
            "code": "000411",
            "name": "000411 PORT + REFIN 1,64% 108X S/ SEG min 30mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "3e700748-0fad-4a52-a137-3c6bab04c346",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.64,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "2750d42a-dfe7-4038-b245-b4d404d9a706",
            "code": "000408",
            "name": "000408 PORT + REFIN 1,80% 108X Saldo de 2mil a 5.999,99 mil - S/ SEG",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "4ac0ed2b-8f98-495d-8ede-9317c17fcffa",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "f89b0639-3583-4b76-9134-4ba183a27311",
            "code": "000407",
            "name": "000407 PORT + REFIN 1,83% 108X Saldo de 2mil a 5.999,99 mil - S/ SEG",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "f3949b39-bdce-4be3-a307-ec8276fc4cb3",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.83,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "b94a145f-0ff9-4b9e-9aa5-05039fb888fa",
            "code": "000406",
            "name": "000406 PORT + REFIN 1,85% 108X Saldo de 2mil a 5.999,99 mil - S/ SEG",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "850a02fb-7769-4232-86b8-a55fdd7528f7",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.85,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "e2a451cf-53fc-43d2-a72c-fa97e374c7a9",
            "code": "000405",
            "name": "000405 PORT + REFIN 1,66% 108X S/ SEG min 8 mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "405ba2bb-f6b8-45ac-b2a4-8504a978518a",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.66,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 1,
                    "multiplier": 1,
                    "limitFactor": 1,
                    "limitMultiplier": 1,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "aee87cb5-9b1b-475b-87b2-e99f8bac1fef",
            "code": "000404",
            "name": "000404 PORT + REFIN 1,68% 108X S/ SEG min 8 mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "14441867-3b06-4a11-8721-96bea2a96fe1",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.68,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "5204f410-84dc-494f-817a-362d0b26f0ba",
            "code": "000403",
            "name": "000403 PORT + REFIN 1,70% 108X S/ SEG min 8 mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "2d08d23f-e7b8-44e2-96e1-3760fa9ecbfb",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.7,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "b73d9511-d991-4959-97a9-72309bc0dab3",
            "code": "000402",
            "name": "000402 PORT + REFIN 1,72% 108x S/ SEG min 8 mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "4133eea7-ce62-443c-9080-3016a233f3d8",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.72,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "ab204279-1df6-497d-82bf-55c9055e3407",
            "code": "000401",
            "name": "000401 PORT + REFIN 1,75% 108X S/ SEG min 8 mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "1e530b43-2949-4fab-9103-cd207196e3d9",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.75,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "29cdc470-1dad-4cd0-8d96-3c7607c2dbf0",
            "code": "000400",
            "name": "000400 PORT + REFIN 1,78% 108X S/ SEG min 8 mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "5e57b871-57eb-4817-9533-1a86cd3bdf6d",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.78,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "670a8c8e-56f8-4c26-a9a2-3de95619e7db",
            "code": "000399",
            "name": "000399 PORT + REFIN 1,80% 108X S/ SEG MIN 6 mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "c96c4fe4-9eb4-4c27-abfc-37c6f5d94583",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "eeb7a79f-88e5-4b01-8606-9f8df06ec127",
            "code": "000398",
            "name": "000398 PORT + REFIN 1,83% 108X S/ SEG MIN 6 MIL",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "0a020805-2bf9-4132-a282-7e8191d3e68f",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.83,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "f1b32562-d38a-4c0b-9989-27c636baa435",
            "code": "000397",
            "name": "000397 PORT + REFIN 1,85% 108X S/ SEG MIN 6 MIL",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "50e3ab1e-56ce-4a72-a545-4ef0326bcdc1",
                    "term": 108,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.85,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "7a07edac-a57b-44b9-b417-ab62807bb217",
            "code": "000371",
            "name": "000371 PORTABILIDADE + REFINANCIAMENTO 1,80% 96X Saldo de 2mil a 6 mil - SEM SEGURO",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "2413fb35-34e1-4b20-8811-80034b2658bf",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "ee5796c6-2174-4f7d-aa72-e6e9523657f4",
            "code": "000340",
            "name": "000340 PORTABILIDADE + REFINANCIAMENTO 1,83% 96X Saldo de 2mil a 6 mil - SEM SEGURO",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "129e11d3-a49c-4cc2-b245-f2600a797fb7",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.83,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "f969b891-813d-44ea-b6af-262c7a311953",
            "code": "000339",
            "name": "000339 PORTABILIDADE + REFINANCIAMENTO 1,85% 96X Saldo de 2mil a 6 mil - SEM SEGURO",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "ecf6a0a3-1ed2-4a5c-bb96-1bad729713f0",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.85,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "a03ff3b9-608a-4bf6-b80b-1aeda0c925bc",
            "code": "000312",
            "name": "000312 PORTABILIDADE + REFINANCIAMENTO 1,66% 96X SEM SEGURO min 8 mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "b12e4739-ccb9-4dde-873b-23e6c50b7356",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.66,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "968d8991-7996-47f3-9675-0be75cc7f5fe",
            "code": "000311",
            "name": "000311 PORTABILIDADE + REFINANCIAMENTO 1,68% 96X SEM SEGURO min 8 mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "88e20203-950e-4198-a00a-04f12398c8e8",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.68,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "a61d0ab6-c8b4-47da-9bd5-9c135d1b4c31",
            "code": "000310",
            "name": "000310 PORTABILIDADE + REFINANCIAMENTO 1,70% 96X SEM SEGURO min 8 mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "8227a799-1718-4d4d-b626-b556c7d8dfc1",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.7,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "2d1f915e-3e03-4dd5-ba81-ee07e3a4826d",
            "code": "000309",
            "name": "000309 PORTABILIDADE + REFINANCIAMENTO 1,72% 96x SEM SEGURO min 8 mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "ed91a2b9-4b5c-45b6-a70b-8a501c563758",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.72,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "ee32cb1e-08e0-44e3-a164-71d72c8c3ec8",
            "code": "000308",
            "name": "000308 PORTABILIDADE + REFINANCIAMENTO 1,75% 96X SEM SEGURO min 8 mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "54336b9a-f0f3-4d0d-8965-a8cc4a27b12c",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.75,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "6b808e42-75ab-484b-90e5-1ab5ef8c1a17",
            "code": "000307",
            "name": "000307 PORTABILIDADE + REFINANCIAMENTO 1,78% 96X SEM SEGURO min 8 mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "95eab43f-737b-49fa-ae61-bd7768ebed55",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.78,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "6f787834-5785-4881-93fb-3e1d2a87154b",
            "code": "000306",
            "name": "000306 PORTABILIDADE + REFINANCIAMENTO 1,80% 96X SEM SEGURO MIN 6 mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "73166358-cf28-443b-a364-4789c6e10fc0",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "d574e9b4-2f54-4f01-9a7b-1bb7f967dce0",
            "code": "000305",
            "name": "000305 PORTABILIDADE + REFINANCIAMENTO 1,83% 96X SEM SEGURO MIN 6 MIL",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "34f5e607-b610-4295-8b98-c8e1d338307d",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.83,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "de010a2e-0b75-4441-8e8b-6f41dfd6c026",
            "code": "000304",
            "name": "000304 PORTABILIDADE + REFINANCIAMENTO 1,85% 96X SEM SEGURO MIN 6 MIL",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "2150ea07-9b48-425b-b689-1839d931065c",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.85,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "5529732a-c44b-4c8f-ae9e-fbb9e067151c",
            "code": "000295",
            "name": "000295 PORTABILIDADE + REFINANCIAMENTO 1,80% 96X Saldo de 4mil a 6mil - SEM SEGURO",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "95b5ddf6-dbe8-4085-9d43-8f567afbdbd2",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "c862302e-5187-41fd-9a7f-50e5b7509010",
            "code": "000294",
            "name": "000294 PORTABILIDADE + REFINANCIAMENTO 1,85% 96X Saldo de 4mil a 6 mil - SEM SEGURO",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "29e99d51-407b-4c96-b1d6-6c55c57b7040",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.85,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "e46b6704-34b6-43d4-aefc-3da9febb31fa",
            "code": "000293",
            "name": "000293 PORTABILIDADE + REFINANCIAMENTO 1,80% 96X SEM SEGURO",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "0696358d-624c-4190-8d45-c5bf244daaad",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "d3e70e28-8d8c-4b11-97dd-b40c05301f94",
            "code": "000292",
            "name": "000292 PORTABILIDADE + REFINANCIAMENTO 1,85% 96X SEM SEGURO",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "a8258fcc-89cd-4e3b-b130-7a9a62da0634",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.85,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "bf739c06-737e-45c9-b097-cc89d546946f",
            "code": "000286",
            "name": "000286 PORTABILIDADE + REFINANCIAMENTO 1,80% 96X Saldo de 4mil a 8mil - SEM SEGURO LOAS 88",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "3c97de54-2945-4215-96b6-1f207bc07e3a",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "8e256f1f-9f17-43b0-bf9a-3baa988a3cc2",
            "code": "000285",
            "name": "000285 PORTABILIDADE + REFINANCIAMENTO 1,85% 96X Saldo de 4mil a 8mil - SEM SEGURO LOAS 88",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "97d787e3-88e0-4e4c-ba4d-5b62748db1e0",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.85,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "52539d0c-ae63-4449-997f-afecee4573ac",
            "code": "000284",
            "name": "000284 PORTABILIDADE + REFINANCIAMENTO 1,72% 96X SEM SEGURO LOAS 88",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "873492c4-ecfe-4655-bf78-efe736909d7a",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.72,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "e9d54e94-9d73-4c35-bd5f-4dd29362b416",
            "code": "000283",
            "name": "000283 PORTABILIDADE + REFINANCIAMENTO 1,75% 96X SEM SEGURO LOAS 88",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "ed442b30-199e-43b3-9677-3c1ceb0a0db8",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.75,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "4f8e3246-60b7-4dcb-b22f-52aaff1b2939",
            "code": "000282",
            "name": "000282 PORTABILIDADE + REFINANCIAMENTO 1,78% 96X SEM SEGURO LOAS 88",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "0c4a1263-0b77-408d-931d-05bb63d58523",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.78,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "e6cd6e8d-7fb2-47fb-9887-0879723e3271",
            "code": "000281",
            "name": "000281 PORTABILIDADE + REFINANCIAMENTO 1,80% 96X SEM SEGURO LOAS 88",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "3e7f3ab6-52ba-409f-a45b-a384b11c6044",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "1ce81c34-d93a-4d20-8fa0-4f8766ee189d",
            "code": "000280",
            "name": "000280 PORTABILIDADE + REFINANCIAMENTO 1,85% 96X SEM SEGURO LOAS 88",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "b5744521-3a2e-48d6-9b6f-7ad4a27c4a1a",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.85,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "5c6ada08-fb9a-4bff-b66c-6fc837e3bf26",
            "code": "000261",
            "name": "000261 PORTABILIDADE + REFINANCIAMENTO 1,66% 96X SEGURO PLUS",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "f5aa511c-14be-43c0-960c-802d86a567bd",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.66,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "5c0d1f91-baa5-4eee-8976-e8780ff5ba05",
            "code": "000229",
            "name": "000229 PORTABILIDADE + REFINANCIAMENTO 1,80% 96X Saldo de 4mil a 8mil - SEGURO PLUS LOAS 88",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "364ff892-4e06-4887-b5cc-b46f2fd25093",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "0460f69b-6f0c-4ead-b4ad-e5362039336e",
            "code": "000228",
            "name": "000228 PORTABILIDADE + REFINANCIAMENTO 1,85% 96X Saldo de 4mil a 8mil - SEGURO PLUS LOAS 88",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "589d8b57-a1c3-49b2-adde-569c0160099d",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.85,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "22da6296-5565-4d0e-aca4-a5d5fcb269ae",
            "code": "000227",
            "name": "000227 PORTABILIDADE + REFINANCIAMENTO 1,80% 96X Saldo de 4mil a 8mil - SEGURO MAX LOAS 88",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "e6e87798-09e6-43d0-9612-9b6af1135ebd",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "fb0c93ed-fc14-4eb6-bf07-f4fdfc1bb6a9",
            "code": "000226",
            "name": "000226 PORTABILIDADE + REFINANCIAMENTO 1,85% 96X Saldo de 4mil a 8mil - SEGURO MAX LOAS 88",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "c2605202-b988-4388-84e8-ca26cf73b6ef",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.85,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "fed6d0d5-35f8-4530-a3fe-ce5cf2ea7dcd",
            "code": "000225",
            "name": "000225 PORTABILIDADE + REFINANCIAMENTO 1,72% 96X SEGURO PLUS LOAS 88",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "576ec957-4482-4945-b235-2bae688eb8fa",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.72,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "6865f515-0a87-4d65-a193-e1b34d639ecb",
            "code": "000224",
            "name": "000224 PORTABILIDADE + REFINANCIAMENTO 1,75% 96X SEGURO PLUS LOAS 88",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "ca742380-684f-4602-8df1-1c4bcb9eff54",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.75,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "2c5da8c3-923f-4c99-b7ca-c21531abdc8d",
            "code": "000223",
            "name": "000223 PORTABILIDADE + REFINANCIAMENTO 1,78% 96X SEGURO PLUS LOAS 88",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "ed4cadab-38fc-4cda-8aad-27978822e91c",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.78,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "6bb687ba-3575-47a2-99e8-4a69eba45ee5",
            "code": "000222",
            "name": "000222 PORTABILIDADE + REFINANCIAMENTO 1,80% 96X SEGURO PLUS LOAS 88",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "2fe802f8-b535-4639-8645-8dd8f64578ec",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "e9a4c5d5-e5e7-42f0-b796-9d9df457a4c3",
            "code": "000221",
            "name": "000221 PORTABILIDADE + REFINANCIAMENTO 1,85% 96X SEGURO PLUS LOAS 88",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "9d038aba-6064-45da-a0e1-e981539949b2",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.85,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "8d4fb488-2839-4918-92da-f93872172b13",
            "code": "000220",
            "name": "000220 PORTABILIDADE + REFINANCIAMENTO 1,72% 96X SEGURO MAX LOAS 88",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "00853f39-e69c-4320-ade0-97c6a631a119",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.72,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "0ba28bbd-3fa8-4830-a69f-99e964078ca6",
            "code": "000219",
            "name": "000219 PORTABILIDADE + REFINANCIAMENTO 1,75% 96X SEGURO MAX LOAS 88",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "aa52cc05-26ae-4d62-803f-515be78c346f",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.75,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "8e4f57fc-044c-444d-a64b-2354d135b602",
            "code": "000218",
            "name": "000218 PORTABILIDADE + REFINANCIAMENTO 1,78% 96X SEGURO MAX LOAS 88",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "565cf3f8-ce65-4e52-a4c9-76a8b6ab7540",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.78,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "74344462-4d5e-4018-a671-75eef2976b4a",
            "code": "000217",
            "name": "000217 PORTABILIDADE + REFINANCIAMENTO 1,80% 96X SEGURO MAX LOAS 88",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "aecfdaba-e2cb-4a92-a1f1-0fa9b82ef57e",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "1b8258de-32fe-4dac-9cbb-7c1eaa08d40b",
            "code": "000211",
            "name": "000211 PORTABILIDADE + REFINANCIAMENTO 1,85% 96X Saldo de 4mil a 8 mil - SEM SEGURO",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "975a183c-d823-4879-841f-e60add7ad8b7",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.85,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "3699d8b2-c826-4d74-bad2-ec92e86231f8",
            "code": "000208",
            "name": "000208 PORTABILIDADE + REFINANCIAMENTO 1,75% 96X SEM SEGURO min 8 mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "2c543635-ea54-4201-afcb-604ff94bc010",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.75,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "72cb0150-a879-4fdc-8e15-fb1641d355db",
            "code": "000207",
            "name": "000207 PORTABILIDADE + REFINANCIAMENTO 1,78% 96X SEM SEGURO min 8 mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "260aa22d-e923-4354-b606-4b5d8cb0e63c",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.78,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "1890aac5-4078-43b7-8e3e-37d2cddd8c56",
            "code": "000206",
            "name": "000206 PORTABILIDADE + REFINANCIAMENTO 1,80% 96X SEM SEGURO",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "00e9d7c5-f263-418f-8741-c6ea3b7b9c02",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "4c39f49b-7cd6-41c8-a73c-ccfb177b8f13",
            "code": "000205",
            "name": "000205 PORTABILIDADE + REFINANCIAMENTO 1,66% 96X SEM SEGURO min 8 mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "8840f476-e2a6-43a6-b9f6-7a4d91fa7adb",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.66,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "8e3a3bfc-9bab-4b39-91ae-a589a1a39be1",
            "code": "000204",
            "name": "000204 PORTABILIDADE + REFINANCIAMENTO 1,68% 96X SEM SEGURO min 8 mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "0376c646-a8d1-4025-a715-bc3aa2543249",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.68,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "a190ff2d-5a07-40c3-a019-ae0d9f72044f",
            "code": "000203",
            "name": "000203 PORTABILIDADE + REFINANCIAMENTO 1,70% 96X SEM SEGURO min 8 mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "5f55606f-b207-4154-a6bd-0452ab6ad9a0",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.7,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "253de3a8-9b01-4a81-a62f-0976f1ddb894",
            "code": "000202",
            "name": "000202 PORTABILIDADE + REFINANCIAMENTO 1,72% 96x SEM SEGURO min 8 mil",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "46d58c2d-6149-43f1-b86b-e820940195c4",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.72,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "7c1d06b9-cd5e-4585-a7be-9bd77783b61e",
            "code": "000201",
            "name": "000201 PORTABILIDADE + REFINANCIAMENTO 1,85% 96X SEM SEGURO",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "79008492-37e0-4947-bd4f-7a2f420e6bd0",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.85,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "f77803ba-020b-415f-89ef-e48036a750ea",
            "code": "000199",
            "name": "000199 PORTABILIDADE + REFINANCIAMENTO 1,80% 96X Saldo de 4mil a 8mil - SEM SEGURO",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "49f46d66-59e6-4ab6-80da-ac32bd2b34df",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "04735378-b65a-47f1-aa8b-e37e75880fe3",
            "code": "000179",
            "name": "000179 Port + Refin 1,80% - Mínimo 4mil SEGURO MAX",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "fc1e209b-80fd-4888-bc53-174a3dad559d",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "ede55cb6-61c4-478a-be53-bec475b1b5c7",
            "code": "000178",
            "name": "000178 Port + Refin 1,80% - Mínimo 4mil SEGURO PLUS",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "70bcca4b-9436-4cc6-9ea0-ccf310eb1ae6",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "d58ee049-36c5-4cd9-877e-7338e69aad8b",
            "code": "000177",
            "name": "000177 PORTABILIDADE + REFINANCIAMENTO 1,66% 96X SEGURO MAX",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "983727c6-de24-4ab9-9bba-452e52cbfc6e",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.66,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "f39deba8-38d5-4ad4-9007-3da4377a0d08",
            "code": "000176",
            "name": "000176 PORTABILIDADE + REFINANCIAMENTO 1,68% 96X SEGURO MAX",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "3bb03a7d-70c8-4c98-9fb1-10f1ca76d653",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.68,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "c065b380-740e-4e6b-af2e-66058954021a",
            "code": "000175",
            "name": "000175 PORTABILIDADE + REFINANCIAMENTO 1,70% 96X SEGURO MAX",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "4b9b7c57-260e-4886-8c7f-f0e7d94c4ff9",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.7,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "55599554-f5b0-464c-9dd6-015dfbb8c106",
            "code": "000174",
            "name": "000174 PORTABILIDADE + REFINANCIAMENTO 1,72% 96X SEGURO MAX",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "a4bfbadc-91a5-4c51-af4d-7744892fd523",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.72,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "2bbdfef6-5de0-4c8a-9fe9-92fca64acfcf",
            "code": "000173",
            "name": "000173 PORTABILIDADE + REFINANCIAMENTO 1,75% 96X SEGURO MAX",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "617d9da5-f86d-451c-8062-dc8d4a2a6e16",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.75,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "100d33e5-36d3-43bf-a413-5b44bc0b899b",
            "code": "000172",
            "name": "000172 PORTABILIDADE + REFINANCIAMENTO 1,78% 96X SEGURO MAX",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "b76579cf-8a20-47be-831b-0d59a80d6ac4",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.78,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "2cb8b7fd-e8c8-4188-abc2-0935cab6e3c2",
            "code": "000171",
            "name": "000171 PORTABILIDADE + REFINANCIAMENTO 1,80% 96X SEGURO MAX",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "7067a643-e5ac-4b2c-a216-fe9a4b256ad5",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "5cdc8e77-17f5-4857-a65f-6987308be1f7",
            "code": "000170",
            "name": "000170 PORTABILIDADE + REFINANCIAMENTO 1,85% 96X SEGURO MAX",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "99227140-38e0-4737-8b16-e4fb13312ff1",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.85,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "2b7f420a-f6ac-4697-969e-32b4bf7bfbf9",
            "code": "000168",
            "name": "000168 PORTABILIDADE + REFINANCIAMENTO 1,68% 96X SEGURO PLUS",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "93b74757-20bf-4a38-8971-d64828c28da2",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.68,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "c075a2c6-b364-4e72-9312-3a1ae67e6e34",
            "code": "000167",
            "name": "000167 PORTABILIDADE + REFINANCIAMENTO 1,70% 96X SEGURO PLUS",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "e2884d85-79fe-4ca8-ad52-080afcc5bdc7",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.7,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "fbdd5145-1391-46fb-8a16-1aca9b999a67",
            "code": "000166",
            "name": "000166 PORTABILIDADE + REFINANCIAMENTO 1,72% 96X SEGURO PLUS",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "74f34765-08cf-4cf8-a454-da32a71cb64c",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.72,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "a87ac92b-7763-43b0-86f1-9b5271e9e750",
            "code": "000165",
            "name": "000165 PORTABILIDADE + REFINANCIAMENTO 1,75% 96X SEGURO PLUS",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "0a030feb-aad6-4b76-a0c6-bce5cb74d179",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.75,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "54fca15f-3a43-49f6-85dd-522a2bc7d0f9",
            "code": "000164",
            "name": "000164 PORTABILIDADE + REFINANCIAMENTO 1,78% 96X SEGURO PLUS",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "63a63861-f9ce-4a7a-a0e5-0ebc20753144",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.78,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "42ef5926-1418-496c-ad9b-1e7e8cbab498",
            "code": "000163",
            "name": "000163 PORTABILIDADE + REFINANCIAMENTO 1,80% 96X SEGURO PLUS",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "cf58d4c7-c075-45e5-b14c-441d8517f284",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "4fecd472-d639-4cc4-a3b1-ca3ccb1c1740",
            "code": "000162",
            "name": "000162 PORTABILIDADE + REFINANCIAMENTO 1,85% 96X SEGURO PLUS",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "41f448ff-de62-4612-83df-879bd1cc1edb",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.85,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "8858a901-fa60-4fb3-bbb1-7fa3a82296ad",
            "code": "000158",
            "name": "000158 PORTABILIDADE + REFINANCIAMENTO 1,75% 96X SEM SEGURO",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "c9f23923-ce17-4b0b-98e7-3105a92dcfae",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.75,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "3c5bcec1-d425-4321-acea-2196bb2b1a52",
            "code": "000157",
            "name": "000157 PORTABILIDADE + REFINANCIAMENTO 1,78% 96X SEM SEGURO",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "a412e303-57d8-4186-a695-754a17efc4b4",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.78,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "c39990e4-4a89-4c45-8b2c-b22d246f7840",
            "code": "000156",
            "name": "000156 PORTABILIDADE + REFINANCIAMENTO 1,80% 96X SEM SEGURO",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "d46a6f27-5d7c-4864-b1fe-b6438951c2c4",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "c8e4f9c9-b59b-4f7e-b0cb-d358abf07e98",
            "code": "000155",
            "name": "000155 Port + Refin 1,80% - Mínimo 4mil - SEM SEGURO",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "3aa6e96c-6e46-4f2e-81d7-0218e3f78a46",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "d2955b70-bbdf-47ad-97c9-1962d8c24110",
            "code": "000154",
            "name": "000154 PORTABILIDADE + REFINANCIAMENTO 1,66% 96X SEM SEGURO",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "d686fc6d-9721-4bd1-b68b-b6cb484a7f80",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.66,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "8407dab5-d766-4a11-a150-67aa7b9e5c74",
            "code": "000153",
            "name": "000153 PORTABILIDADE + REFINANCIAMENTO 1,68% 96X SEM SEGURO",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "47095c85-3c41-4565-aed3-ef2b7e462ddb",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.68,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "b9779409-f1db-4382-907a-7d3f50a910e5",
            "code": "000152",
            "name": "000152 PORTABILIDADE + REFINANCIAMENTO 1,70% 96X SEM SEGURO",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "51e254eb-9e65-4c2e-864b-57d3dd77d0eb",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.7,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "ce5a1d00-3a1c-48f0-94b7-a50b25b9ee2a",
            "code": "000151",
            "name": "000151 Portabilidade + Refinanciamento 1,72% 96x SEM SEGURO",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "454b49a1-2b69-43cc-ab04-feb0a868d416",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.72,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "ae81cc1a-9cba-41c7-8fbf-59f1559c4070",
            "code": "000149",
            "name": "000149 PORTABILIDADE + REFINANCIAMENTO 1,85% 96X SEM SEGURO",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "f93fde55-e04e-4aba-9213-6ee841ce8fb4",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.85,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "012b786e-84af-4b0c-81df-79e75823ec5e",
            "code": "000083",
            "name": "000083 Portabilidade + Refinanciamento 1,72% 96x",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "2d2a7e12-310f-4304-ac7f-30afc04f9a9d",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.72,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "2fb59554-caa2-40ce-87a3-b3ae9e10bb8c",
            "code": "000081",
            "name": "000081 Portabilidade + Refinanciamento 1,68% 96x",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "a8c32c24-7f56-4944-9ddd-e1d86bb3d62a",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.68,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "bba8bc55-a7f1-4871-8075-a310da92577e",
            "code": "000070",
            "name": "000070 Portabilidade + Refinanciamento 1,66% 96x",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "39aab33e-b7c6-4872-b5f6-cdcc3e5e1960",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.66,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "1dfe3baf-4017-4e17-a14e-0b11c791acf3",
            "code": "000060",
            "name": "000060 Port + Refin 1,78% - Mínimo 4mil ",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "ec14acbf-086b-4ec7-8bad-1ea19580ae96",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.78,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "1d9ff87b-458a-460d-a411-e46f24221b89",
            "code": "000052",
            "name": "000052 Portabilidade + Refinanciamento 1,75% 96x",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "494641ec-2e99-4683-b2f5-001ee9ee1418",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.75,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "eade2107-f5aa-4ea0-a479-b75cafd351da",
            "code": "000051",
            "name": "000051 Portabilidade + Refinanciamento 1,78% 96x",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "2482ef96-3f29-4d15-ab92-630f8a2d41ce",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.78,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        },
        {
            "id": "7f8165be-5539-4ae3-a32b-9b4234404496",
            "code": "000050",
            "name": "000050 Portabilidade + Refinanciamento 1,80% 96x",
            "product": {
                "id": "cc29bb49-288d-4058-a0db-cb3801ac7731",
                "code": 8,
                "name": "INSS - Portabilidade + Refinanciamento"
            },
            "type": {
                "code": 20,
                "name": "INSS"
            },
            "operation": {
                "code": 4,
                "name": "Portabilidade + Refinanciamento"
            },
            "items": [
                {
                    "id": "1ab10d64-4f4a-4fee-aa08-cc966ad4d9f5",
                    "term": 96,
                    "minTerm": 0,
                    "maxTerm": 0,
                    "rate": 1.8,
                    "minRate": 0,
                    "maxRate": 0,
                    "factor": 0,
                    "multiplier": 0,
                    "limitFactor": 0,
                    "limitMultiplier": 0,
                    "minAge": 0,
                    "maxAge": 0,
                    "default": false
                }
            ],
            "note": null,
            "index": 0
        }
    ]
}
```

Devemos pegar somente as regras (objetos) que atenderem aos seguintes critérios:

## Descartar Todas as Tabelas que:
- Tiverem escrito "90D", pois são de carência, e não trabalhamos com carência.
- Tiverem SEGURO, ou seja, só aceitamos tabelas SEM SEGURO ou S/ SEG, etc.

## Trabalho com Faixas de Saldo
Há tabelas que liberam entre 2k a 5999K e outras que possuem o mínimo de 6K. Nesse sentido, dependendo do valor de saldo quitação recebido no endpoint da digitação automática, deve-se levar em consideração diferentes conjuntos de tabelas (aqueles qualificados para a faixa do saldo recebido).

## Regras para Aprovação da Fase de Simulação
1. Deve-se ordenar as tabelas pela que possui a maior taxa para a menor.
2. Deve-se ir testando as regras do cálculo prévio uma por uma da tabela de maior taxa à menor taxa.
3. Cada vez que falhar em todas as tabelas, deve-se reduzir 5% do valor do saldo para tentar novamente a partir da tabela de maior taxa à menor com o novo saldo reduzido. 
4. Fazer isso somente duas vezes. Caso a simulação não seja aprovada após as 3 tentativas (1 inicial + 2 reduções de 5%), deve-se retornar erro para o usuário.

## Monitoramento no Console
Faz-se necessário que o sistema imprima no console todas as tabelas que ele identificar para as regras de saldo que foram inputadas no endpoint da digitação solicitado pelo cliente. Elas devem estar ordenadas na ordem em que o sistema vai seguir e virem com o ID do próprio objeto de regra. Segue um exemplo de como isso deve aparecer:

```console
==================================================
Regras encontradas para o saldo de R$ 6042,77:
==================================================
{
    "code": "000139",
    "ruleId": "000139",
    "operation": "Portabilidade + Refinanciamento",
    "tax": 1.84,
    "term": 84
}
}
```