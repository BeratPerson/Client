import { Product } from "./Product";

export interface Category {
    id: number;
    name: string;
    categoryName: string;
    createdDate: string;
    products: Product[];
}

export interface Categories {
    categories: Category[]
}