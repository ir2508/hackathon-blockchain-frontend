// utils/cargaDetalhada.js
import { ethers } from "ethers"
import { buscarTxIdCarga } from "../utils/txIdCarga"

const enderecoContratoCarnesBase = "0x4A00241D669667C63372fA82BCC696Db9480465A"
const enderecoContratoAfericao = "0xCf720Bef4e632A69A82aE9dCe8869c9Fa91Adf92"

const abiContratoCarnes = [
    "function obterCarga(uint256 cargaId) view returns (uint256, address, address, uint8, uint256, uint256)",
]
const abiContratoAfericao = [
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
        const contratoCarne = new ethers.Contract(enderecoContratoCarnesBase, abiContratoCarnes, provider)
        const contratoAfericao = new ethers.Contract(enderecoContratoAfericao, abiContratoAfericao, provider)

        const [, address , addressDistribuidora, statusRaw, dataInicio, dataFim ] = await contratoCarne.obterCarga(cargaId)
    
        const afericoesResultado = await contratoAfericao.obterAfericoes(cargaId)

        const caminhao = caminhoes.find(
            (c) => c.endereco?.toLowerCase() === address.toLowerCase()
        )
        const placa = caminhao?.placaCaminhao 

        const txId = await buscarTxIdCarga(cargaId)
        
        return {
            id: Number(cargaId),
            address: address,
            addressDistribuidora: addressDistribuidora,
            placaCaminhao: placa,
            dataInicio: dataInicio ? new Date(Number(dataInicio) * 1000) : null,
            dataFim: dataFim ? new Date(Number(dataFim) * 1000) : null,
            status: statusTexto(Number(statusRaw)),
            txId: txId,
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
