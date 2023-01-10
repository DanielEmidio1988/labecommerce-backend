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
import { TClient, TProduct, TPurchase, CATEGORY_PROD} from "./types";
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

//Daniel: Pesquisar cliente pela id
app.get('/users/:id',(req:Request, res:Response)=>{
    const id = req.params.id

    const filterUser = clients.find((client) => client.id === id)

    if(filterUser){
        res.status(200).send(filterUser)
    }else{
        res.status(200).send("Usuário não encontrado")
    }
})

//Daniel: Pesquisar compras pelo Id do cliente
app.get('/users/:id/purchases',(req:Request, res:Response)=>{
    const id = req.params.id

    const filterPurchaseUser = purchases.find((purchase) => purchase.userId === id)

    if(filterPurchaseUser){
        res.status(200).send(filterPurchaseUser)
    }else{
        res.status(200).send("Compra não encontrada")
    }
})

//Daniel: Deletar cliente pelo ID
app.delete('/users/:id',(req:Request, res:Response)=>{
    const id = req.params.id
    
    const filterDeleteUser = clients.findIndex((client) => client.id === id)

    if(filterDeleteUser >=0){
        clients.splice(filterDeleteUser,1)     
    }
    res.status(200).send("Cliente excluido com sucesso")
})

//Daniel: editar cliente pelo ID
app.put('/users/:id', (req:Request, res:Response)=>{
    const id = req.params.id
    
    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPass = req.body.password as string | undefined

    const filterUser = clients.find((client) => client.id === id)

    if(filterUser){
        filterUser.id = newId || filterUser.id
        filterUser.email = newEmail || filterUser.email
        filterUser.password = newPass || filterUser.password
    }
    res.status(200).send("Atualização realizada com sucesso!")
})

app.get('/products',(req:Request, res:Response)=>{
    res.status(200).send(products)
})

//Daniel: buscar produto por query
app.get('/products/search',(req:Request, res:Response)=>{
    const q = req.query.q as string
    const filterProducts = products.filter((product)=>
    product.name.toLowerCase().includes(q.toLowerCase()))
    res.send(filterProducts)
})

app.put('/products/:id', (req:Request, res:Response)=>{
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as CATEGORY_PROD | undefined

    const filterProd = products.find((product) => product.id === id)

    if(filterProd){
        filterProd.id = newId || filterProd.id
        filterProd.name = newName || filterProd.name
        filterProd.price = newPrice || filterProd.price 
        filterProd.category = newCategory || filterProd.category
    }
    res.status(200).send("Atualização realizada com sucesso!")
})

//Daniel: Deletar produto pelo ID
app.delete('/products/:id',(req:Request, res:Response)=>{
    const id = req.params.id
    
    const filterProdUser = products.findIndex((product) => product.id === id)

    if(filterProdUser >=0){
        products.splice(filterProdUser,1)     
    }
    res.status(200).send("Produto excluido com sucesso")
})

app.get('/purchase',(req:Request,res:Response)=>{
    res.status(200).send(purchases)
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

// console.log(queryProductsByName("screen"));
// console.log(createPurchase("1", "1", 3, 15));