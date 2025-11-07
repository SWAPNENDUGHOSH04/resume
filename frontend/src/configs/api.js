import axios from 'axios'
import  { useState } from "react"

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

export default api