# 🗄️ GreenER: Banco de Dados

Banco de dados relacional do GreenER, responsável por armazenar os serviços monitorados, as coletas de métricas e os dados necessários aos cálculos de energia e CO₂e.

Voltar para o [README principal](../README.md).

---

## 📋 Índice

- 🛠 Tecnologias
- 📂 Arquivos
- 🧱 Modelo de Dados
- ▶️ Como Aplicar os Scripts
- 🔎 Onde Ficam as Consultas da Aplicação
- 📚 Documentação Relacionada

---

## 🛠 Tecnologias

- PostgreSQL
- Docker, com volume persistente para preservar os dados após reiniciar os containers

---

## 📂 Arquivos

| Arquivo | Conteúdo |
| --- | --- |
| [`schema.sql`](schema.sql) | Comandos DDL que criam tabelas, chaves primárias e estrangeiras e restrições |

---

## 🧱 Modelo de Dados

> Esta seção é atualizada conforme o esquema evolui, sempre de acordo com o `schema.sql`.

| Tabela | Descrição |
| --- | --- |
| _a definir_ | _a definir_ |

- *Colocar tabelas reais assim que decidirmos*

---

## ▶️ Como Aplicar os Scripts

Os scripts devem ser aplicados em um banco PostgreSQL **vazio**.

### Com Docker

Com os containers em execução (na raiz do projeto):

```bash
docker compose exec -T <servico-do-banco> psql -U <usuario> -d <nome-do-banco> < database/schema.sql
```

### Localmente

```bash
psql -U <usuario> -d <nome-do-banco> -f database/schema.sql
```

<!-- Substituir os valores entre < > pelos definidos no compose.yaml e no .env.example -->

---

## 🔎 Onde Ficam as Consultas da Aplicação

As operações de inserção, consulta, atualização e exclusão usadas pela aplicação ficam nos **repositories** do backend, em `backend/src/modules/<modulo>/<modulo>.repository.ts`. Todas usam SQL explícito e valores enviados como parâmetros, sem concatenação de texto.

Veja a organização do backend em [`backend/README.md`](../backend/README.md).

---

## 📚 Documentação Relacionada

- [`backend/README.md`](../backend/README.md): como o backend se conecta ao banco
- [`docs/arquitetura.md`](../docs/arquitetura.md): fluxo dos dados entre as partes da aplicação
- [`docs/calculos.md`](../docs/calculos.md): fórmulas e premissas do cálculo de energia e CO₂e
