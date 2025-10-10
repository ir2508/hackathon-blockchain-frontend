import { createBrowserRouter } from "react-router-dom"
import LayoutDefault from "../layouts/LayoutDefault"
import Monitoramento from "../pages/Monitoramento"
import CadastrarCaminhao from "../pages/CadastrarCaminhao"
import NovoDistribuidor from "../pages/NovoDistribuidor"
import LayoutComprovante from "../layouts/LayoutComprovante"
import ComprovanteEntrega from "../pages/ComprovanteEntrega"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            { path: "/", element: <Monitoramento /> },
            { path: "/cadastro-caminhao", element: <CadastrarCaminhao /> },
            { path: "/seja-distribuidor", element: <NovoDistribuidor /> },
        ],
    },
    {
        path: "/comprovante/qrcode",
        element: <LayoutComprovante />,
        children: [{ path: ":idEntrega", element: <ComprovanteEntrega /> }],
    },
])
