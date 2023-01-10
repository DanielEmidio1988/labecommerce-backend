import { 
    getProductById, 
    queryProductsByName,
    createPurchase,
    getAllPurchasesFromClientId, 
    getAllClients,
    getAllProducts,
    clients,
    products,
    purchases
} from "./database";
import { TClient, TProduct, TPurchase} from "./types";
import express, { Request, Response } from "express";

const app = express()

app.use(express.json())

app.listen(3003, () => {
    console.log("Servidor rodando localhost 3003");
});

app.get('/ping',(req: Request, res:Response)=>{
    res.send('Pong!')
})

app.get('/users',(req:Request, res:Response)=>{
    res.status(200).send(clients)
})

app.get('/products',(req:Request, res:Response)=>{
    res.status(200).send(products)
})

app.get('/purchase',(req:Request,res:Response)=>{
    res.status(200).send(purchases)
})

app.get('/products/search',(req:Request, res:Response)=>{
    const q = req.query.q as string
    const filterProducts = products.filter((product)=>
    product.name.toLowerCase().includes(q.toLowerCase()))
    res.send(filterProducts)
})

app.post('/users',(req:Request,res:Response)=>{
    
    const id = req.body.id
    const email = req.body.email
    const password = req.body.password
    

    const newClient:TClient={
        id:id,
        email:email,
        password:password,
    }

    clients.push(newClient)
    res.send('Cliente cadastrado com sucesso!')
})

app.post('/products',(req:Request, res:Response)=>{
    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const category = req.body.category

    const newProduct:TProduct = {
        id: id,
        name: name,
        price: price,
        category: category,
    }
    products.push(newProduct)
    res.send('Produto cadastrado com sucesso!')
})

app.post('/purchase',(req:Request, res:Response)=>{
    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice
    
    const newPurchase:TPurchase={
        userId:userId,
        productId:productId,
        quantity:quantity,
        totalPrice:totalPrice,
    }

    purchases.push(newPurchase)
    res.send('Compra cadastrada com sucesso!')
})

console.log(queryProductsByName("screen"));
console.log(createPurchase("1", "1", 3, 15));