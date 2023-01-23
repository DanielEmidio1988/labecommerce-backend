import { 
    getProductById, 
    queryProductsByName,
    createPurchase,
    createUser,
    createProduct,
    getAllPurchasesFromClientId, 
    getAllClients,
    getAllProducts,
    clients,
    products,
    purchases
} from "./database";
import cors from 'cors';
import { TClient, TProduct, TPurchase, CATEGORY_PROD} from "./types";
import express, { Request, Response } from "express";
import { db } from "./database/knex";

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log("Servidor rodando localhost 3003");
});

//Daniel: teste de conexão
app.get('/ping',(req: Request, res:Response)=>{
    res.send('Pong!')
})

//Daniel: criar cliente
app.post('/users', async(req:Request,res:Response)=>{
    try {
    const id = req.body.id
    const email = req.body.email
    const password = req.body.password
    
    // const newClient:TClient={
    //     id:id,
    //     email:email,
    //     password:password,
    // }

        if (id !== undefined){
            
        if (typeof id !== "string"){
         res.status(400);
                throw new Error ("Id precisa ser uma string");
        }

        // const [client] = await db.raw(`
        //     SELECT * FROM clients
        //     WHERE id= "${id}";
        // `)

        // if(!client){

        // }

        // for (let i = 0; i < clients.length; i++){
        //         if (clients[i].id === id){
        //             res.status(400);
        //             throw new Error ("Já existe um cliente com esse ID");
        //         }
        //     }
        } else {
            res.status(400);
            throw new Error ("Cliente precisa ter uma ID");
        }

        if (email !== undefined){
            if (typeof email !== "string"){
                res.status(400);
                throw new Error ("E-mail do cliente precisa ser um string");
            }

            // // Nao pode haver repeticao de email
            // for (let i = 0; i < clients.length; i++){
            //     if (clients[i].email === email){
            //         res.status(400);
            //         throw new Error ("E-mail informado já existe");
            //     }
            // }
        } else {
            res.status(400);
            throw new Error ("É necessário cadastrar um e-mail");
        }

        if (password !== undefined){
            if (typeof password !== "string"){
                res.status(400);
                throw new Error ("Password do cliente deve ser uma string");
            }
        } else {
            res.status(400);
            throw new Error ("É necessário cadastrar uma senha");
        }

        await db.raw(`
        INSERT INTO clients (id, email, password)
        VALUES("${id}","${email}","${password}")
    `)

        // createUser(id, email, password);

    // clients.push(newClient)
    res.status(201).send('Cliente cadastrado com sucesso!')
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
        
    }

})

//Daniel: USUARIOS/CLIENTES
app.get('/users', async(req:Request, res:Response)=>{
    try {

        //Daniel: Intro Knex - refatorando
        const result = await db.raw(`
            SELECT * FROM clients;
        `)

        res.status(200).send(result)       
    } catch (error) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
                
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }      
    }
    
})

//Daniel: Pesquisar cliente pela id
app.get('/users/:id',(req:Request, res:Response)=>{
    try {
        const id = req.params.id

        const filterUser = clients.find((client) => client.id === id)

        if(!filterUser){
            res.status(404)
            throw new Error("Cliente não encontrado!")
        }
    
        if(filterUser){
            res.status(200).send(filterUser)
        }else{
            res.status(200).send("Usuário não encontrado")
        }
        
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)   
    }

})

//Daniel: Pesquisar compras pelo Id do cliente
app.get('/users/:id/purchases',async(req:Request, res:Response)=>{
    const id = req.params.id
    try{
            //Daniel: Intro Knex - refatorando
        const result = await db.raw(`
            SELECT * FROM purchases
            WHERE buyer_id="${id}";
        `)

        res.status(200).send(result)       
    } catch (error) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
                
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }      
    }
    // const filterPurchaseUser = purchases.find((purchase) => purchase.userId === id)

    // if(filterPurchaseUser){
    //     res.status(200).send(filterPurchaseUser)
    // }else{
    //     res.status(200).send("Compra não encontrada")
    // }
})

//Daniel: Deletar cliente pelo ID
app.delete('/users/:id',(req:Request, res:Response)=>{
    const id = req.params.id
    
    const filterDeleteUser = clients.findIndex((client) => client.id === id)

    if(filterDeleteUser >=0){
        clients.splice(filterDeleteUser,1)     
    }else{ 
            res.status(404);
            throw new Error ("Cliente não localizado!");   
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

    if (!filterUser){
        res.status(404);
        throw new Error ("Cliente não localizado!");
    }

    if (newEmail !== undefined){
        if (typeof newEmail !== "string"){
            res.status(400);
            throw new Error ("Email deve ser uma string");
        }
    }

    if (newPass !== undefined){
        if (typeof newPass !== "string"){
            res.status(400);
            throw new Error ("Senha deve ser uma string");
        }
    }
    

    if(filterUser){
        filterUser.id = newId || filterUser.id
        filterUser.email = newEmail || filterUser.email
        filterUser.password = newPass || filterUser.password
    }
    res.status(200).send("Atualização realizada com sucesso!")
})

app.get('/products', async (req:Request, res:Response)=>{
    try {

        const result = await db.raw( `
            SELECT * FROM products;
        `)
        res.status(200).send(result) 
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)   
        
    }
})

//Daniel: buscar produto por query
app.get('/products/search', async (req:Request, res:Response)=>{
try {
    const q = req.query.q as string;

        if (q !== undefined){
            if (q.length < 1){
                res.status(400);
                throw new Error ("'q' deve possuir ao menos um caracter");
            }
        } else {
            res.status(400);
            throw new Error ("'q' precisa ser definido");
        }

        const result = await db.raw(`
            SELECT * FROM products
            WHERE id="${q}";
        `)
        // const result = queryProductsByName(q);

        res.status(200).send(result);

    
} catch (error) {
        console.log(error)
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
}
    

})

//Daniel: Pesquisar produto pela id
app.get('/products/:id', async(req:Request, res:Response)=>{
    try {
        const id = req.params.id

        const result = await db.raw(`
            SELECT * FROM products
            WHERE id="${id}"
        `)

        res.status(200).send(result)

        // const filterUser = clients.find((client) => client.id === id)

        // if(!filterUser){
        //     res.status(404)
        //     throw new Error("Cliente não encontrado!")
        // }
    
        // if(filterUser){
        //     res.status(200).send(filterUser)
        // }else{
        //     res.status(200).send("Usuário não encontrado")
        // }
        
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)   
    }

})

//Daniel: criar produto
app.put('/products/:id', (req:Request, res:Response)=>{
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as CATEGORY_PROD | undefined

    const filterProd = products.find((product) => product.id === id)

    if (!filterProd){
        res.status(404);
        throw new Error ("Produto não localizado!");
    }

    if (newName !== undefined){
        if (typeof newName !== "string"){
            res.status(400);
            throw new Error ("Valor inválido! Nome do cliente precisa ser String");
        }
    }

    if (newPrice !== undefined){
        if (typeof newPrice !== "number"){
            res.status(400);
            throw new Error ("Valor inválido! Preço do produto precisa ser um numero");
        }
    }

    if (newCategory !== undefined){
        if (
            newCategory !== "Acessórios" &&
            newCategory !== "Roupas e Calçados" &&
            newCategory !== "Eletrônicos"
        ){
            res.status(400);
            throw new Error ("Valor inválido! A categoria do produto informada inexistente.");
        }
    }


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
    }else{
            res.status(404);
            throw new Error ("Produto não localizado!");
    }
    res.status(200).send("Produto excluido com sucesso")
})

app.get('/purchase',async (req:Request,res:Response)=>{

    const result = await db.raw(`
        SELECT * FROM purchases;
    `)
    res.status(200).send(result)
})

//Daniel: criar produto
app.post('/products', async (req:Request, res:Response)=>{

    try {
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const category = req.body.category
    
        // const newProduct:TProduct = {
        //     id: id,
        //     name: name,
        //     price: price,
        //     category: category,
        // }

        // for (let i = 0; i < products.length; i++){
        //     if (products[i].id === id){
        //         res.status(400);
        //         throw new Error ("Produto já existente");
        //     }
        // }
        // createProduct(id,name,price,category)

        await db.raw(`
            INSERT INTO products (id, name, price, category)
            VALUES ("${id}","${name}",${price},"${category}")
        `)
        res.status(201).send('Produto cadastrado com sucesso!')
        
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }

})

app.post('/purchase', async (req:Request, res:Response)=>{
    try {

	    const id = req.body.id;
        const total_price = req.body.total_price;
        const paid = req.body.paid;
        // const delivered_at = req.body.delivered_at;
        const buyer_id = req.body.buyer_id

	    // const productId = req.body.productId;
	    // const quantity = req.body.quantity;
      
	    

        if (id !== undefined){
            if (typeof id !== "string"){
                res.status(400);
                throw new Error ("Id do usuário precisa ser uma string");
            }

            // //Daniel: verificar se o cliente existe na base
            // const clientExists = clients.find((clients) => clients.id === userId);
            // if (!clientExists){
            //     res.status(404);
            //     throw new Error ("Não há cliente cadastrado com esta Id");
            // }
            
        } else {
            res.status(400);
            throw new Error ("Favor, inserir id de usuário.");
        }

        if (total_price !== undefined){
            if (typeof total_price !== "number"){
                res.status(400);
                throw new Error ("Valor de Preço Total inválido! Favor, informar um numero.");
            }

            // const product = products.find(product => product.id === productId);
            // const { price } = product;
            // if ((price * quantity) !== totalPrice){
            //     res.status(400);
            //     throw new Error ("Preço total da compra divergente da quantidade comprada.");
            // }
        } else {
            res.status(400);
            throw new Error ("Valor final da compra não informado.");
        }

        if (paid !== undefined){
            if (typeof paid !== "number"){
                res.status(400);
                throw new Error ("Confirmação de compra inválido! Favor, informar um numero.");
            }

            // const product = products.find(product => product.id === productId);
            // const { price } = product;
            // if ((price * quantity) !== totalPrice){
            //     res.status(400);
            //     throw new Error ("Preço total da compra divergente da quantidade comprada.");
            // }
        } else {
            res.status(400);
            throw new Error ("Confirmação de compra não informado.");
        }

        if (buyer_id === undefined){

            res.status(400);
            throw new Error ("Id de cliente não informado.");
            // if (typeof buyer_id !== "number"){
            //     res.status(400);
            //     throw new Error ("Id de cliente inválido! Favor, informar um numero.");
            // }

            // const product = products.find(product => product.id === productId);
            // const { price } = product;
            // if ((price * quantity) !== totalPrice){
            //     res.status(400);
            //     throw new Error ("Preço total da compra divergente da quantidade comprada.");
            // }
        }

        // if (productId !== undefined){
        //     if (typeof productId !== "string"){
        //         res.status(400);
        //         throw new Error ("Id do produto precisa ser uma string");
        //     }
            
        //     // const productExists = products.find(product => product.id === productId);
        //     // if (!productExists){
        //     //     res.status(404);
        //     //     throw new Error ("Não há produto cadastrado com essa ID");
        //     // }
        // } else {
        //     res.status(400);
        //     throw new Error ("Favor, inserir ID do produto");
        // }

        // if (quantity !== undefined){
        //     if (typeof quantity !== "number"){
        //         res.status(400);
        //         throw new Error ("Informação inválida! Favor, inserir números válidos para quantidade de itens comprados.");
        //     }
        
        // } else {
        //     res.status(400);
        //     throw new Error ("Favor, inserir uma quantidade de produtos a serem comprados.");
        // }


        await db.raw(`
            INSERT INTO purchases (id, total_price, paid, buyer_id) 
            VALUES ("${id}",${total_price}, ${paid}, "${buyer_id}"); 
        `)

        await db.raw(`
        UPDATE purchases
        SET delivered_at = DATE('now')
        WHERE id="${id}";`)
	
	    // createPurchase(userId, productId, quantity, totalPrice);
	
	    res.status(201).send("Compra realizada com sucesso");

    } catch (error) {
        console.log(error)
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }
})

// console.log(queryProductsByName("screen"));
// console.log(createPurchase("1", "1", 3, 15));