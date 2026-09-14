import * as XLSX from 'xlsx'
import { getProducts } from '@/services/products'

const TEMPLATE_HEADERS = ['name', 'price', 'type', 'isActive']
const TEMPLATE_EXAMPLE_ROW = ['กาแฟเย็น', 45, 'DRINK', true]
const EXPORT_HEADERS = ['id', 'name', 'price', 'type', 'isActive']
const VALID_TYPES = ['DRINK', 'SWEET']

export function downloadProductTemplate() {
    const worksheet = XLSX.utils.aoa_to_sheet([TEMPLATE_HEADERS, TEMPLATE_EXAMPLE_ROW])
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products')
    XLSX.writeFile(workbook, 'product-template.xlsx')
}

export async function downloadAllProducts() {
    const products = await getProducts()
    const rows = products.map((product) => EXPORT_HEADERS.map((key) => product[key]))
    const worksheet = XLSX.utils.aoa_to_sheet([EXPORT_HEADERS, ...rows])
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products')
    XLSX.writeFile(workbook, 'products.xlsx')
}

export async function parseProductExcelFile(file) {
    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer, { type: 'array' })
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: undefined })

    const products = []
    const errors = []

    rows.forEach((row, index) => {
        const rowNumber = index + 2
        const name = typeof row.name === 'string' ? row.name.trim() : ''
        const price = Number(row.price)
        const type = typeof row.type === 'string' ? row.type.trim().toUpperCase() : ''
        const isActive = row.isActive === undefined ? true : Boolean(row.isActive)

        if (!name) {
            errors.push(`แถวที่ ${rowNumber}: ไม่มีชื่อสินค้า (name)`)
            return
        }
        if (!Number.isFinite(price) || price < 0) {
            errors.push(`แถวที่ ${rowNumber}: price ไม่ถูกต้อง (${row.price})`)
            return
        }
        if (!VALID_TYPES.includes(type)) {
            errors.push(`แถวที่ ${rowNumber}: type ต้องเป็น ${VALID_TYPES.join(' หรือ ')} (พบ "${row.type}")`)
            return
        }

        products.push({ name, price, type, isActive })
    })

    return { products, errors }
}
