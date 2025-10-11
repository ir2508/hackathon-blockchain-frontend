# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 📦 Sistema de Transporte de Carnes Congeladas — Documentação Técnica

## 🔗 Contratos Envolvidos

| Contrato                | Responsabilidade Principal                                                                 |
|------------------------|---------------------------------------------------------------------------------------------|
| `DistribuidoraControle`| Gerencia o cadastro de distribuidoras autorizadas                                           |
| `CaminhaoCadastro`     | Permite que caminhoneiros registrem seus veículos                                           |
| `CargaEstado`          | Mantém o estado atual e histórico das cargas por caminhão                                   |
| `TransporteCarnesBase` | Coordena o ciclo de vida da carga: cadastro, aferições, finalização e controle de regras    |
| `AfericaoTemperatura`  | Registra aferições de temperatura e aplica regras de rejeição automática                    |

---

## 🧩 Componentes e Interações

### 1. `DistribuidoraControle`
- Qualquer endereço pode se registrar como distribuidora uma única vez.
- Armazena distribuidoras em `mapping(address => bool) administradoras`.
- Usado como verificação de permissão no contrato `TransporteCarnesBase`.

### 2. `CaminhaoCadastro`
- Caminhoneiros registram suas placas.
- Garante unicidade por endereço.
- Expõe lista de caminhões registrados via `obterCaminhoes()`.

### 3. `CargaEstado`
- Armazena:
  - Carga atual por caminhão (`cargaAtual`)
  - Histórico de cargas (`historico`)
- Só aceita comandos do contrato autorizado (`TransporteCarnesBase`).
- Serve como controle externo de estado, separando lógica de negócio da persistência.

### 4. `TransporteCarnesBase`
- Core do sistema: coordena o ciclo da carga.
- Permite:
  - Cadastro de carga (somente por distribuidoras registradas)
  - Finalização da carga (somente pelo caminhão vinculado)
  - Rejeição automática (via aferição de temperatura)
  - Registro de início da carga (via aferição)
- Armazena:
  - Dados da carga: caminhão, distribuidora, status, datas
  - Regras de negócio: rejeição por temperatura, controle de acesso

### 5. `AfericaoTemperatura`
- Caminhoneiros registram aferições de temperatura.
- Se for a primeira aferição → registra início da carga.
- Se temperatura > 0 → rejeita carga automaticamente.
- Armazena aferições por carga e emite eventos.

---

## 🔄 Fluxo de Operação

### 🏢 Cadastro de Distribuidora
- `registrarComoAdministradora()`
- Verificação impede duplicidade

### 🚚 Cadastro de Caminhão
- `cadastrarMeuCaminhao(placa)`
- Placa vinculada ao `msg.sender`

### 📦 Cadastro de Carga
- `cadastrarCarga(enderecoCaminhao)`
- Verifica se o caminhão está livre
- Cria nova `Carga` com status `EmAndamento`
- Registra no `CargaEstado`
- Emite evento `CargaCadastrada`

### 🌡️ Aferições de Temperatura
- `adicionarAfericao(cargaId, temperatura)`
- Se for a primeira aferição → define `dataInicio`
- Se temperatura > 0 → rejeita carga, define `dataFim`, finaliza no `CargaEstado`, emite `CargaRejeitada`

### ✅ Finalização
- `finalizarCarga(cargaId)`
- Define `dataFim`, atualiza status, finaliza no `CargaEstado`
- Emite `CargaFinalizada`

---

## 🛡️ Regras de Segurança e Acesso

| Ação                      | Restrição Aplicada                                      |
|---------------------------|---------------------------------------------------------|
| Cadastrar carga           | Apenas distribuidoras registradas                      |
| Adicionar aferição        | Apenas caminhão vinculado à carga                      |
| Finalizar carga           | Apenas caminhão vinculado à carga                      |
| Rejeitar carga            | Apenas contrato de aferição autorizado                 |
| Interagir com `CargaEstado`| Apenas contrato autorizado (`TransporteCarnesBase`)   |
| Registrar início da carga | Apenas contrato de aferição autorizado                 |

---

## 📊 Dados Disponíveis para Consulta

- `obterCaminhoes()` → lista de caminhões registrados
- `obterHistorico(caminhao)` → histórico de cargas por caminhão
- `obterAfericoes(cargaId)` → aferições registradas para uma carga
- `obterCarga(cargaId)` → dados básicos da carga (ID, caminhão, distribuidora, status, datas)


##  Endereço dos contratos que estão na rede Paseo PassetHub chainIdPasseo = "0x190F1B46" em hexadecimal // 420420422 em decimal

- `CaminhaoCadastro` → 0xA127207F272d19bec252f7f55110E7295d41d8c4
- `DistribuidoraControle` → 0x0E2E739DC04AfE340106F74672F019A469F6C226
- `CargaEstado` → 0x2a038995FC9694296933bbF825904C59fE1aa13B
- `TransporteCarnesBase` → 0x4A00241D669667C63372fA82BCC696Db9480465A
- `AfericaoTemperatura` → 0xCf720Bef4e632A69A82aE9dCe8869c9Fa91Adf92

