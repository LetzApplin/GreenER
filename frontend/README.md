# 🖥️ GreenER: Frontend

Aplicação web do GreenER, onde o usuário acompanha os serviços monitorados, o consumo de energia e as emissões de CO₂e estimadas.

Voltar para o [README principal](../README.md).

---

## 📋 Índice

- 🛠 Tecnologias
- 📂 Organização do Código
- 🧭 Telas
- 🔐 Configuração
- ▶️ Como Executar
- 📚 Documentação Relacionada

---

## 🛠 Tecnologias

- React com TypeScript
- Docker
- *Adicionar bibliotecas assim que decidirmos*

---

## 📂 Organização do Código

O código fica em `src/`, separado por responsabilidade:

| Pasta | Responsabilidade |
| --- | --- |
| `pages` | Telas da aplicação |
| `components` | Componentes reutilizáveis da interface |
| `services` | Chamadas HTTP ao backend |
| `hooks` | Hooks personalizados |
| `contexts` | Contextos React (estado compartilhado) |
| `providers` | Providers que disponibilizam os contextos à aplicação |

Estrutura geral:

```
frontend/
├── Dockerfile
└── src/
    ├── components/
    ├── pages/
    ├── services/
    ├── hooks/
    ├── contexts/
    └── providers/
```

- *Atualizar conforme as pastas forem sendo usadas de fato*

---

## 🧭 Telas

> Esta tabela é atualizada a cada sprint, com as telas que já foram implementadas.

| Tela | Descrição | Situação |
| --- | --- | --- |
| Dashboard | Apresentação dos dados dos serviços, do consumo de energia e das emissões de CO₂e | ⏳ Planejada |
| Login | Acesso à área de configuração | ⏳ Planejada |
| Configuração | Ajustes do monitoramento, com acesso protegido | ⏳ Planejada |

- *Ajustar de acordo com nossas telas*

---

## 🔐 Configuração

O frontend se comunica com o [backend](../backend/README.md) por meio de uma URL configurada em variável de ambiente. Use o [`.env.example`](../.env.example) como modelo.

| Variável | Descrição |
| --- | --- |
| _a definir_ | URL base da API do backend |

<!-- Preencher com o nome real da variável -->

---

## ▶️ Como Executar

### Com Docker (recomendado)

Na raiz do projeto:

```bash
docker compose up --build
```

### Localmente

Requisitos: Node.js e o backend em execução.

```bash
cd frontend
npm install
npm run dev
```

<!-- Confirmar os scripts do package.json e a porta de acesso -->

---

## 📚 Documentação Relacionada

- [`backend/README.md`](../backend/README.md): API consumida pelo frontend
- [`docs/api.md`](../docs/api.md): endpoints disponíveis
- [`docs/arquitetura.md`](../docs/arquitetura.md): fluxo dos dados entre as partes da aplicação
