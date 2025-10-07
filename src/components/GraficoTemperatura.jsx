import React from "react"
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend
} from "chart.js"
import { Line } from "react-chartjs-2"
import { format } from "date-fns"

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend)

const GraficoTemperatura = ({ afericoes, id }) => {
    const labels = afericoes.map((a) =>
        format(new Date(a.timestamp * 1000), "dd/MM/yyyy HH:mm")
    )

    const data = {
        labels,
        datasets: [
            {
                label: "Temperatura (°C)",
                data: afericoes.map((a) => a.temperatura),
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                tension: 0.3,
                pointRadius: 3
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx) => `${ctx.raw} °C`
                }
            }
        },
        scales: {
            x: {
                title: { display: true, text: "Horário" }
            },
            y: {
                title: { display: true, text: "Temperatura (°C)" }
            }
        }
    }

    return (
        <div>
            <Line width={500} height={200} key={`grafico-${id}`} data={data} options={options} />
        </div>
    )
}

export default GraficoTemperatura
