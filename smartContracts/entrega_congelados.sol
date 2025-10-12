// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract DistribuidoraControle {
    mapping(address => bool) public administradoras;

    /// Qualquer um pode se registrar como administradora
    function registrarComoAdministradora() public {
        require(!administradoras[msg.sender], "Distribuidora ja cadastrada");
        administradoras[msg.sender] = true;
    }
}

contract CaminhaoCadastro {
    mapping(address => string) public placas;
    address[] public listaDeCaminhoes;

    function cadastrarMeuCaminhao(string memory placa) public {
        require(bytes(placas[msg.sender]).length == 0, "Ja cadastrado");
        placas[msg.sender] = placa;
        listaDeCaminhoes.push(msg.sender);
    }

    function obterCaminhoes() public view returns (address[] memory) {
        return listaDeCaminhoes;
    }
}

contract CargaEstado {
    address public contratoAutorizado;

    // Mapeia o caminhão para a carga atual
    mapping(address => uint) public cargaAtual;

    // Mapeia o caminhão para o histórico de cargas
    mapping(address => uint[]) public historico;

    // Garante que apenas o contrato autorizado possa interagir
    modifier apenasContratoAutorizado() {
        require(msg.sender == contratoAutorizado, "Apenas contrato autorizado");
        _;
    }

    // Define o contrato autorizado no momento do deploy
    constructor(address contratoAutorizado_) {
        contratoAutorizado = contratoAutorizado_;
    }

    // Permite registrar uma nova carga para um caminhão
    function registrarCarga(address chaveCaminhao, uint cargaId) public apenasContratoAutorizado {
        require(cargaAtual[chaveCaminhao] == 0, "Ja tem carga");
        cargaAtual[chaveCaminhao] = cargaId;
        historico[chaveCaminhao].push(cargaId);
    }

    // Finaliza a carga atual de um caminhão
    function finalizarCarga(address chaveCaminhao) public apenasContratoAutorizado {
        cargaAtual[chaveCaminhao] = 0;
    }

    // Retorna o histórico de cargas de um caminhão
    function obterHistorico(address chaveCaminhao) public view returns (uint[] memory) {
        return historico[chaveCaminhao];
    }

    // Permite redefinir o contrato autorizado
    function definirContratoAutorizado(address novoContrato) public {
        require(msg.sender == contratoAutorizado, "Somente contrato atual pode alterar");
        contratoAutorizado = novoContrato;
    }
}

interface ICargaEstado {
    function registrarCarga(address chaveCaminhao, uint cargaId) external;
    function finalizarCarga(address chaveCaminhao) external;
    function cargaAtual(address chaveCaminhao) external view returns (uint);
}

interface IDistribuidoraControle {
    function administradoras(address) external view returns (bool);
}

contract TransporteCarnesBase {
    enum StatusCarga { EmAndamento, Finalizada, Rejeitada }

    event CargaCadastrada(uint indexed cargaId, address indexed caminhao, address indexed distribuidora);
    event CargaFinalizada(uint indexed cargaId, address indexed caminhao);
    event CargaRejeitada(uint indexed cargaId, address indexed caminhao);
    event InicioCargaRegistrado(uint indexed cargaId, uint timestamp);
    event AfericaoRegistrada(uint indexed cargaId, int temperaturaDecimosCelsius, uint timestamp);


    struct Carga {
        uint id;
        address caminhao;
        address distribuidora;
        StatusCarga status;
        uint dataInicio;
        uint dataFim;
    }

    mapping(uint => Carga) public cargas;
    uint public proximaCargaId = 1;

    address public afericaoContract;
    address public controleDistribuidora;
    address public estadoContract;

    modifier apenasDistribuidora() {
        require(IDistribuidoraControle(controleDistribuidora).administradoras(msg.sender), "Apenas distribuidora");
        _;
    }

    modifier apenasCaminhao(uint cargaId) {
        require(cargas[cargaId].caminhao == msg.sender, "Nao autorizado");
        _;
    }

    modifier cargaEmAndamento(uint cargaId) {
        require(cargas[cargaId].status == StatusCarga.EmAndamento, "Carga encerrada");
        _;
    }

    constructor(address _estado, address _controle, address _afericao) {
        estadoContract = _estado;
        controleDistribuidora = _controle;
        afericaoContract = _afericao;
    }

    function cadastrarCarga(address chaveCaminhao) public apenasDistribuidora {
        require(ICargaEstado(estadoContract).cargaAtual(chaveCaminhao) == 0, "Ja tem carga");

        cargas[proximaCargaId] = Carga({
            id: proximaCargaId,
            caminhao: chaveCaminhao,
            distribuidora: msg.sender,
            status: StatusCarga.EmAndamento,
            dataInicio: 0,
            dataFim: 0
        });

        ICargaEstado(estadoContract).registrarCarga(chaveCaminhao, proximaCargaId);
        emit CargaCadastrada(proximaCargaId, chaveCaminhao, msg.sender);

        proximaCargaId++;
        
    }

    function finalizarCarga(uint cargaId) public apenasCaminhao(cargaId) cargaEmAndamento(cargaId) {
        cargas[cargaId].status = StatusCarga.Finalizada;
        cargas[cargaId].dataFim = block.timestamp;
        emit CargaFinalizada(cargaId, msg.sender);
        ICargaEstado(estadoContract).finalizarCarga(msg.sender);
    }

    function rejeitarCarga(uint cargaId) external {
        require(msg.sender == afericaoContract, "Somente afericao pode rejeitar");
        Carga storage carga = cargas[cargaId];
        require(carga.status == StatusCarga.EmAndamento, "Carga encerrada");

        carga.status = StatusCarga.Rejeitada;
        carga.dataFim = block.timestamp;
        emit CargaRejeitada(cargaId, carga.caminhao);
        ICargaEstado(estadoContract).finalizarCarga(carga.caminhao);
    }

    function obterCarga(uint cargaId)
        public
        view
        returns (uint, address, address, StatusCarga, uint, uint)
    {
        Carga storage c = cargas[cargaId];
        return (c.id, c.caminhao, c.distribuidora, c.status, c.dataInicio, c.dataFim);
    }


    function registrarInicioCarga(uint cargaId) external {
        require(msg.sender == afericaoContract, "Somente afericao pode iniciar");
        Carga storage carga = cargas[cargaId];
        require(carga.dataInicio == 0, "Inicio ja registrado");
        carga.dataInicio = block.timestamp;
        emit InicioCargaRegistrado(cargaId, block.timestamp);
    }

}

interface ITransporteCarnesBase {
    function obterCarga(uint cargaId) external view returns (uint, address, address, uint8, uint, uint);
    function rejeitarCarga(uint cargaId) external;
    function registrarInicioCarga(uint cargaId) external;
}

contract AfericaoTemperatura {
    struct Afericao {
        int temperaturaDecimosCelsius;
        uint timestamp;
    }

    event AfericaoRegistrada(uint indexed cargaId, int temperaturaDecimosCelsius, uint timestamp);


    mapping(uint => Afericao[]) public afericoes;
    address public transporteCarnesBase;

    constructor(address baseAddress) {
        transporteCarnesBase = baseAddress;
    }

    /// Registra uma nova aferição de temperatura para uma carga
    function adicionarAfericao(uint cargaId, int temperaturaDecimosCelsius) public {
        ITransporteCarnesBase base = ITransporteCarnesBase(transporteCarnesBase);
        (, address caminhao, , uint8 status, , ) = base.obterCarga(cargaId);

        require(caminhao == msg.sender, "Nao autorizado");
        require(status == 0, "Carga encerrada"); // StatusCarga.EmAndamento = 0

        // Se for a primeira aferição, registra o início da carga
        if (afericoes[cargaId].length == 0) {
            base.registrarInicioCarga(cargaId);
        }

        // Armazena a aferição
        afericoes[cargaId].push(Afericao({
            temperaturaDecimosCelsius: temperaturaDecimosCelsius,
            timestamp: block.timestamp
        }));

        // Se a temperatura for inválida, rejeita a carga
        if (temperaturaDecimosCelsius > 0) {
            base.rejeitarCarga(cargaId);
        }

        emit AfericaoRegistrada(cargaId, temperaturaDecimosCelsius, block.timestamp);

    }

    /// Retorna todas as aferições registradas para uma carga
    function obterAfericoes(uint cargaId) public view returns (Afericao[] memory) {
        return afericoes[cargaId];
    }

    /// Permite redefinir o contrato base autorizado
    function definirBase(address novaBase) public {
        require(msg.sender == transporteCarnesBase, "Somente contrato atual pode alterar");
        transporteCarnesBase = novaBase;
    }
}
