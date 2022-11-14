export interface Product {
    id: number,
    name: string,
    price: number,
    stock: number,
    categoryId: number,
    productName: string,
    createdDate: string;
}
export interface Products {
    products: Product[]
}