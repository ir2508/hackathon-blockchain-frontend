import { atom } from "recoil"

export const walletAddressState = atom({
  key: "walletAddressState",
  default: "", // vazio significa "não conectado"
})
