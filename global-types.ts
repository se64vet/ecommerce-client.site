export interface Product {
    id: string,
    category: Category,
    name: string,
    price: string,
    isFeatured: boolean,
    size: Property,
    color: Property,
    images: Image[],
}

export interface Image {
    id: string,
    url: string,
}

export interface Property {
    id: string,
    name: string,
    value: string,
}

export interface Category {
    id: string,
    name: string,
    billboard: Billboard   
}

export interface Billboard {
    id: string,
    label: string,
    imgUrl: string,
}