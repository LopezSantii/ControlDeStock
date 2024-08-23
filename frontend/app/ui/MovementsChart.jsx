import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registramos los componentes que vamos a utilizar en Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const MovementsChart = ({ movements, products, selectedProduct }) => {
  // Ordenamos los movimientos por fecha
  const sortedMovements = movements.sort(
    (a, b) => new Date(a.fecha) - new Date(b.fecha)
  );

  // Procesamos los datos para el gráfico
  const labels = sortedMovements.map(({ fecha }) =>
    new Date(fecha).toLocaleDateString()
  );

  const entradas = movements.map(({ tipo, cantidad }) =>
    tipo === "entrada" ? cantidad : 0
  );

  const salidas = movements.map(({ tipo, cantidad }) =>
    tipo === "salida" ? cantidad : 0
  );

  // Filtramos para obtener el nombre del producto
  const productName = (productId) =>
    products.find((product) => product.id === productId)?.nombre ||
    "Desconocido";

  // Obtén el nombre del producto basado en el primer movimiento
  const nombreProducto = productName(movements[0]?.producto_id);

  const datas = {
    labels: labels, // Ejemplo de meses
    datasets: [
      {
        label: "Entradas",
        data: entradas, // Datos de entradas
        borderColor: "rgb(50,205,50)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4, // Para hacer la línea más curva
      },
      {
        label: "Salidas",
        data: salidas, // Datos de salidas
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.4, // Para hacer la línea más curva
      },
    ],
  };

  // Opciones para personalizar el gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        padding: {
          bottom: 10,
          // Ajusta este valor para aumentar o disminuir el espacio entre el gráfico y la leyenda
        },
        aling: "center",
        display: true,
        text: `Movimientos ${selectedProduct ? nombreProducto : "totales"}`,
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

  // Opciones para personalizar el gráfico

  return <Line data={datas} options={options} />;
};
