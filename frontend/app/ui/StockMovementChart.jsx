import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registramos los componentes que vamos a utilizar en Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export const StockMovementChart = ({ data }) => {
  // Procesamos los datos para el gráfico
  const labels = data.map(({ nombre }) => nombre);
  const quantities = data.map(({ cantidad }) => cantidad);

  // Datos para el gráfico de torta
  const datas = {
    labels: labels,
    datasets: [
      {
        label: "Movimientos de Stock",
        data: quantities,
        backgroundColor: [
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(201, 203, 207, 0.8)",
          "rgba(255, 99, 132,0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
        ],
        borderColor: ["rgba(0, 0, 0,0.4)"],
        borderWidth: 1,
      },
    ],
  };

  // Opciones para personalizar el gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        fullSize: true,
        aling: "center",
        position: "bottom",
        labels: {
          boxWidth: 10,
          padding: 6,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} unidades`;
          },
        },
      },
    },
    layout: {
      padding: {
        top: 15,
        bottom: 15,
        left: 15,
        right: 15, // Ajusta este valor para aumentar o disminuir el espacio entre el gráfico y la leyenda
      },
    },
  };

  return <Doughnut data={datas} options={options} />;
};
