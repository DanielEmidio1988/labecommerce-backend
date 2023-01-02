const userChoice = process.argv[2].toLowerCase()
const randomPlay = ["pedra", "papel", "tesoura"]
const npcChoice = randomPlay[Math.floor(Math.random()*2)]

if(userChoice === "pedra"){
    if(npcChoice === "pedra"){
        console.log("Empate")
    }else if(npcChoice === "papel"){
        console.log("Papel envolve Pedra, você perdeu! :(")
    }else{
        console.log("Pedra quebra Tesoura! Você ganhou! :D")
    }
}else if(userChoice === "papel"){
    if(npcChoice === "pedra"){
        console.log("Papel envolve Pedra, você ganhou! :D")
    }else if(npcChoice === "papel"){
        console.log("Empate!")
    }else{
        console.log("Tesoura corta papel! Você perdeu :(")
    }
}else if(userChoice === "tesoura"){
    if(npcChoice === "pedra"){
        console.log("Pedra quebra tesoura! Você perdeu :(")
    }else if(npcChoice === "papel"){
        console.log("Tesoura corta Papel! Você venceu! :D")
    }else{
        console.log("Empate!")
    }
}