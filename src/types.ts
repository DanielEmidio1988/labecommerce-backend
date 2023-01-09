//Daniel: Dados do cliente cadastrado
export type TClient = {
    id: string
    email: string
    password: string
}

export enum CATEGORY_PROD {
    ACESSORIES = "Acessórios",
    CLOTHES_AND_SHOES = "Roupas e Calçados",
    ELETRONICS = "Eletrônicos",
}

// Daniel: Dados do produto cadastrado
export type TProduct = {
    id: string
    name: string
    price: number
    category: CATEGORY_PROD
}

// Daniel: Compra que será realizada pelo cliente
export type TPurchase = {
    userId: string
    productId: string
    quantity: number
    totalPrice: number
}