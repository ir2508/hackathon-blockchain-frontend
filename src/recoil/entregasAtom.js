import { atom } from "recoil"

export const entregaSelecionadaState = atom({
    key: "entregaSelecionadaState",
    default: {
        idEntrega: "",
        detalhesEntrega: "",
        acao: ""
    },
})

export const entregasState = atom({
    key: "entregasState",
    default: [
        {
            id: 1,
            caminhao: "tesste",
            tipo: "tessste",
            status: "Em andamento"
        }
    ],
})
