import { ethers } from "ethers"

async function getWalletAddress() {
    if (window.ethereum) {
        try {
            // Solicita acesso à conta
            await window.ethereum.request({ method: "eth_requestAccounts" })

            // Cria o provider
            const provider = new ethers.BrowserProvider(window.ethereum)

            // Obtém o signer (usuário conectado)
            const signer = await provider.getSigner()

            // Obtém o endereço da carteira
            const address = await signer.getAddress()

            return address
        } catch (error) {
            console.error("Erro ao obter endereço da carteira:", error)
            return null
        }
    } else {
        console.error("MetaMask não está disponível.")
        return null
    }
}

// Exporta como objeto padrão
export default {
    getWalletAddress
}
