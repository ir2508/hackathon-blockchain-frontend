import { useEffect } from "react"
import { ethers } from "ethers"

const enderecoContratoCarnesBase = "0x42F904182B6653e7f910419b740D5eA84e94888f"
const abiContratoCarnes = ["function obterAfericoes(uint cargaId) view returns (tuple(int temperaturaDecimosCelsius, uint timestamp)[])"]

const AfericoesCarga = ({ cargaId, onAfericoesCarregadas }) => {
    const consultarAfericoes = async () => {
        try {
            const provider = new ethers.JsonRpcProvider("https://testnet-passet-hub-eth-rpc.polkadot.io")
            const contrato = new ethers.Contract(enderecoContratoCarnesBase, abiContratoCarnes, provider)

            const resultado = await contrato.obterAfericoes(cargaId)
            onAfericoesCarregadas(cargaId, resultado)
        } catch (erro) {
            console.error("Erro ao consultar aferições:", erro)
        }
    }

    useEffect(() => {
        if (cargaId) {
            consultarAfericoes()
        }
    }, [cargaId])

    return null // não renderiza nada
}

export default AfericoesCarga
