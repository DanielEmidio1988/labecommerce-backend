const argsUser = process.argv[2].toLowerCase()
const numUser = process.argv[3]

const argsNPC = argsUser.toLowerCase() === "par" ? "impar" : "par"
const numNPC = Math.floor(Math.random()*10)

console.log(`Usuário pediu ${argsUser} e lançou ${numUser}.\nComputador ficou com ${argsNPC} e lançou ${numNPC}`)

const resultado = (numUser + numNPC)%2
if(resultado === 0 && argsUser === "par"){
    console.log("Parabéns, você venceu! :D")
}else{
    console.log("Que pena! O NPC ganhou... :(")
}