import { useEffect } from "react"
import { ethers } from "ethers"

const enderecoContrato = "0x09c664b9D6BE9b9bef7CEBf95D575B122E32863C"
const abiContrato = [
  "function obterCaminhoes() view returns (address[])",
  "function placas(address) view returns (string)"
]

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
