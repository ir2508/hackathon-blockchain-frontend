import { useEffect } from "react"
import { ethers } from "ethers"

const enderecoContrato = "0xA127207F272d19bec252f7f55110E7295d41d8c4"
const abiContrato = ["function obterCaminhoes() view returns (address[])", "function placas(address) view returns (string)"]

const ConsultaCaminhoes = ({ onCaminhoesCarregados }) => {
    const consultarCaminhoes = async () => {
        try {
            const provider = new ethers.JsonRpcProvider("https://testnet-passet-hub-eth-rpc.polkadot.io")
            const contrato = new ethers.Contract(enderecoContrato, abiContrato, provider)

            const enderecos = await contrato.obterCaminhoes()

            const placas = await Promise.all(
                enderecos.map(async (endereco) => {
                    const placa = await contrato.placas(endereco)
                    return { endereco, placa }
                })
            )

            onCaminhoesCarregados(placas)
        } catch (erro) {
            console.error("Erro ao consultar caminhões:", erro)
        }
    }

    useEffect(() => {
        consultarCaminhoes()
    }, [])

    return null
}

export default ConsultaCaminhoes
