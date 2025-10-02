import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { RecoilRoot } from "recoil"
// import App from './App.jsx'

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RecoilRoot>
            <RouterProvider router={router}></RouterProvider>
        </RecoilRoot>
    </StrictMode>
)
