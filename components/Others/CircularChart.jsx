import React from 'react'
import { Doughnut, Chart} from 'react-chartjs-2';
import 'chart.js/auto';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { useState, useEffect } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const CircularChart = () => {

  const [chartData, setChartData] = useState({
    datasets: []
  })

  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    setChartData({
      labels: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      datasets: [
        {
          label: "Atividade",
          data: [65, 69, 35, 81, 166, 155]
        }
      ]
    })
  }, [])

  return (
    <div className="profile-graph-config">
      <Chart type="doughnut" data={chartData} options={chartOptions}/>
    </div>
  )
}

export default CircularChart