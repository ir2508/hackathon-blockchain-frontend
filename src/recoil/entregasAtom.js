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
    default: [],
})
