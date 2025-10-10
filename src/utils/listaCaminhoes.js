import { useEffect } from "react"
import { ethers } from "ethers"

const enderecoContrato = "0xeAB24340984F926d0B1a6C97309AD2d8B3a26cEe"
const abiContrato = ["function obterCaminhoes() view returns (address[])", "function placas(address) view returns (string)"]

async function getCaminhoes() {
    try {
        const provider = new ethers.JsonRpcProvider("https://testnet-passet-hub-eth-rpc.polkadot.io")
        const contrato = new ethers.Contract(enderecoContrato, abiContrato, provider)

        const enderecos = await contrato.obterCaminhoes()

        const placas = await Promise.all(
            enderecos.map(async (endereco) => {
                const placaCaminhao = await contrato.placas(endereco)
                return { endereco, placaCaminhao }
            })
        )
        return placas
    } catch (erro) {
        console.error("Erro ao consultar caminhões:", erro)
    }
}

export default {
    getCaminhoes,
}
