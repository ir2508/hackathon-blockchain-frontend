import { ethers } from "ethers"

const RPC_URL = "https://testnet-passet-hub-eth-rpc.polkadot.io"
const contratoEndereco = "0x4A00241D669667C63372fA82BCC696Db9480465A"

const abiContratoCarnes = [
    "event CargaCadastrada(uint indexed cargaId, address indexed caminhao, address indexed distribuidora)",
]

export async function buscarTxIdCarga(cargaId, fromBlock = 0, toBlock = "latest") {
    try {
        const provider = new ethers.JsonRpcProvider(RPC_URL)
        const iface = new ethers.Interface(abiContratoCarnes)

        const latestBlock = await provider.getBlockNumber()
        const endBlock = toBlock === "latest" ? latestBlock : toBlock

        // Gera o tópico do evento manualmente
        const eventTopic = ethers.id("CargaCadastrada(uint256,address,address)")

        const filtro = {
            address: contratoEndereco,
            topics: [eventTopic],
            fromBlock,
            toBlock: endBlock
        }

        const logs = await provider.getLogs(filtro)

        for (const log of logs) {
            const parsed = iface.parseLog(log)
            if (parsed.args.cargaId.toString() === cargaId.toString()) {
                return log.transactionHash
            }
        }

        return null
    } catch (error) {
        console.error("Erro ao buscar txId da carga:", error)
        return null
    }
}
