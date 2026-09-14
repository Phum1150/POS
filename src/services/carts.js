import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getCarts() {
    const response = await axios.get(`${BASE_URL}/carts`)
    return response.data
}

export async function getCartsById(id) {
    const response = await axios.get(`${BASE_URL}/carts/${id}`)
    return response.data
}

export async function createCarts(data) {
    const response = await axios.post(`${BASE_URL}/carts/create`, data)
    return response.data
}

export async function updateCarts(id, data) {
    const response = await axios.put(`${BASE_URL}/carts/update/${id}`, data)
    return response.data
}

export async function deleteCarts(id) {
    await axios.delete(`${BASE_URL}/carts/delete/${id}`)
}