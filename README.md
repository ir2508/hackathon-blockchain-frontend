# React + Vite

## Como executar o projeto

Para instalar as dependências e iniciar o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

---


# SOBRE O PROJETO

Site para demostração: https://entrega-congelada.nanoarena.xyz/

## ❄️ Desperdício de Alimentos Congelados: Um Problema Invisível, Mas Gigante

O desperdício de alimentos é um dos grandes desafios globais — e os alimentos congelados, embora pareçam mais protegidos, não estão imunes. A cadeia de frio, que envolve o transporte e armazenamento em temperaturas controladas, é extremamente vulnerável. Uma falha no sistema de refrigeração, mesmo que breve, pode comprometer a qualidade dos produtos, levando à contaminação, perda nutricional e descarte prematuro.

Em muitos casos, caminhões frigoríficos enfrentam problemas técnicos, falta de monitoramento contínuo ou negligência operacional. O resultado? Alimentos que chegam ao destino com temperatura acima do ideal, sem que o consumidor ou o distribuidor perceba. Isso não só representa risco à saúde, como também gera prejuízos financeiros e ambientais significativos.

---

## 🚚 A Solução: Blockchain + IoT para Entregas Confiáveis

Pensando nesse cenário, desenvolvemos uma solução que une **blockchain** e **sensores IoT** para garantir a integridade das entregas de alimentos congelados.

### Como funciona:
- Distribuidoras cadastram suas frotas de caminhões na plataforma.
- Cada caminhão é vinculado a um sensor de temperatura IoT.
- Durante o trajeto, o sensor realiza aferições constantes e envia os dados diretamente para a blockchain.
- Esses dados são imutáveis, auditáveis e acessíveis em tempo real.
- Se a temperatura ultrapassar **0°C**, a carga é automaticamente rejeitada, garantindo segurança e transparência.

O formulário digital presente na interface representa a abstração do sensor IoT — simulando o comportamento do dispositivo físico e permitindo testes no ambiente de desenvolvimento.

---

## 🌐 Benefícios Comerciais

- **Confiança do consumidor**: Transparência total sobre a qualidade da entrega.
- **Redução de perdas**: Menos desperdício, mais eficiência.
- **Rastreabilidade**: Cada etapa da entrega é registrada e pode ser auditada.
- **Sustentabilidade**: Menos descarte, menos impacto ambiental.
- **Escalabilidade**: A solução pode ser aplicada em diferentes regiões e tipos de alimentos.

---

Essa é mais do que uma inovação tecnológica — é uma revolução na forma como lidamos com alimentos congelados.



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



## 🧭 Diagrama de Fluxo — Transporte de Carnes congeladas

```text
[DistribuidoraControle]
        |
        v
[Distribuidora] -- registra --> [DistribuidoraControle]
        |
        v
[TransporteCarnesBase] ←-- verifica permissão --←
        |
        v
[CaminhaoCadastro]
        |
        v
[Caminhoneiro] -- registra caminhão --> [CaminhaoCadastro]
        |
        v
[TransporteCarnesBase] ←-- recebe caminhão --←
        |
        v
[Distribuidora] -- cadastra carga --> [TransporteCarnesBase]
        |
        v
[CargaEstado] ←-- registra carga --←
        |
        v
[Caminhoneiro] -- adiciona aferição --> [AfericaoTemperatura]
        |                                     |
        |                                     |-- temperatura ≤ 0 --> registra aferição
        |                                     |
        |                                     |-- temperatura > 0 --> rejeita carga
        |                                                               |
        |                                                               v
        |                                                    [TransporteCarnesBase] atualiza status
        |
        |-- finaliza carga manualmente --> [TransporteCarnesBase]
                                             |
                                             v
                                     atualiza status para Finalizada
                                     finaliza carga no [CargaEstado]
```

##  Fluxo grama da operação visual mermaid flowchart
```mermaid
flowchart TD
    A[DistribuidoraControle] --> B[Distribuidora]
    B -->|Registra| A
    B --> C[TransporteCarnesBase]
    D[CaminhaoCadastro] --> E[Caminhoneiro]
    E -->|Registra caminhão| D
    E --> C
    B -->|Cadastra carga| C
    C --> F[CargaEstado]
    E -->|Adiciona aferição| G[AfericaoTemperatura]
    G -->|Temperatura ≤ 0| G
    G -->|Temperatura > 0| C
    E -->|Finaliza carga| C
    C -->|Finaliza| F



