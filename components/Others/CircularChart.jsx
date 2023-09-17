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
import { infoUser } from '@utils/userContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const CircularChart = () => {

  const {data} = infoUser()

  const [chartData, setChartData] = useState({
    datasets: []
  })

  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    setChartData({
      labels: ["Visualizações no Perfil", "Buscas de Perfil"],
      datasets: [
        {
          label: "Atividade",
          data: [data.profile_views, data.profile_searchs]
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