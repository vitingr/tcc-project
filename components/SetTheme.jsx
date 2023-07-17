"use client"

import React from 'react'
import { userTheme } from '@utils/ThemeContext'

const setTheme = ({children}) => {

    const {tema} = userTheme()
    if (tema === "light") {
        document.documentElement.style.setProperty('--font-color', '#2f3234');
        document.documentElement.style.setProperty('--font-color-low-emphasis', 'rgba(0, 0, 0, 0.6)');
        document.documentElement.style.setProperty('--color1', '#F2508B');
        document.documentElement.style.setProperty('--color2', '#D4467A');
        document.documentElement.style.setProperty('--color3', '#ED4E89');
        document.documentElement.style.setProperty('--color4', '#d38ea7');
        document.documentElement.style.setProperty('--color5', '#6E243F');
        document.documentElement.style.setProperty('--color6', '#e394b1');
        document.documentElement.style.setProperty('--background-color', '#e2e6e9');
        document.documentElement.style.setProperty('--container-color', '#fafafa');
    }

    if (tema === "dark") {
        document.documentElement.style.setProperty('--font-color', '#f0efff');
        document.documentElement.style.setProperty('--font-color-low-emphasis', 'f0efff7e');
        document.documentElement.style.setProperty('--color1', '#5864fd');
        document.documentElement.style.setProperty('--color2', '#243f82');
        document.documentElement.style.setProperty('--color3', '#6570dc');
        document.documentElement.style.setProperty('--color4', '#5864fd');
        document.documentElement.style.setProperty('--color5', '#2c3972');
        document.documentElement.style.setProperty('--color6', '#b0b7f5');
        document.documentElement.style.setProperty('--background-color', '#252145');
        document.documentElement.style.setProperty('--container-color', '#2f2c55');
    }

  return (
    <div>
        {children}
    </div>
  )
}

export default setTheme