import { 
    getProductById, 
    queryProductsByName,
    createPurchase,
    getAllPurchasesFromClientId 
} from "./database";

console.log(queryProductsByName("screen"));
console.log(createPurchase("1", "1", 3, 15));