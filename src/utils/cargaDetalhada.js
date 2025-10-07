// utils/cargaDetalhada.js
import { ethers } from "ethers"

const enderecoContratoCarnes = "0x989De45fBE84E2E55E6A1ffC1EC4Fa56093958d7"
const abiContratoCarnes = [
    "function obterCarga(uint cargaId) view returns (uint, address, uint8)",
    "function obterAfericoes(uint cargaId) view returns (tuple(int temperaturaDecimosCelsius, uint timestamp)[])"
]

const statusTexto = (s) => {
    switch (s) {
        case 0:
            return "Em andamento"
        case 1:
            return "Finalizada"
        case 2:
            return "Rejeitada"
        default:
            return "Desconhecido"
    }
}

export const obterCargaDetalhada = async (cargaId, caminhoes) => {
    try {
        const provider = new ethers.JsonRpcProvider("https://testnet-passet-hub-eth-rpc.polkadot.io")
        const contrato = new ethers.Contract(enderecoContratoCarnes, abiContratoCarnes, provider)

        const [, address , statusRaw] = await contrato.obterCarga(cargaId)
    
        const afericoesResultado = await contrato.obterAfericoes(cargaId)

        // const caminhao = caminhoes.find((c) => c.detalhesCaminhao?.[0]?.endereco === address)
        // const placa = caminhao?.placaCaminhao || address // 

        const caminhao = caminhoes.find(
            (c) => c.endereco?.toLowerCase() === address.toLowerCase()
        )
        const placa = caminhao?.placaCaminhao 

        return {
            id: Number(cargaId),
            address: address,
            placaCaminhao: placa,
            status: statusTexto(Number(statusRaw)),
            afericoes: afericoesResultado.map((a) => ({
                temperatura: Number(a.temperaturaDecimosCelsius) / 10,
                timestamp: Number(a.timestamp)
            }))
        }
    } catch (erro) {
        console.error(`Erro ao consultar carga ${cargaId}:`, erro)
        return {
            id: Number(cargaId),
            status: null,
            afericoes: []
        }
    }
}
