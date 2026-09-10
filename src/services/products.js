import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getProducts({ type, search, isActive } = {}) {
    const params = new URLSearchParams()
    if (type) {
        params.set('type', type)
    }
    if (search) {
        params.set('search', search)
    }
    if (isActive) {
        params.set('isActive', isActive)
    }
    const response = await axios.get(`${BASE_URL}/products?${params}`)
    return response.data
}

export async function createProduct(data) {
    const response = await axios.post(`${BASE_URL}/products/create`, data)
    return response.data
}

export async function updateProduct(id, data) {
    const response = await axios.put(`${BASE_URL}/products/update/${id}`, data)
    return response.data
}

export async function updateProductStatus(id, status) {
    const response = await axios.patch(`${BASE_URL}/products/status/${id}`, status)
    return response.data
}

export async function deleteProduct(id) {
    await axios.delete(`${BASE_URL}/products/delete/${id}`)
}
