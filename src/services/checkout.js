import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getCheckoutHistory() {
    const response = await axios.get(`${BASE_URL}/checkout/history`)
    return response.data
}

export async function createCheckoutHistory(data) {
    const response = await axios.post(`${BASE_URL}/checkout`, data)
    return response.data
}