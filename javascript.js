const tabuleiro = document.getElementById("tabuleiro")
const quantCartas = document.getElementById("quantCartas")
const racertos = document.getElementById("acertos")
const rerros = document.getElementById("erros")
var cartas = []
var cartasViradas = 0
var jogando = []
let paletasdeCores = ["orange", "green", "purple", "red", "pink", "blue", "yellow"]
let coresSortidas = []
let acertos = 0
let erros = 0


class Cartas{
    constructor (corOriginal,corNova, c) {
        this.botao = document.createElement("button")
        this.botao.className = "carta"
        this.botao.id = c
        this.corOriginal = corOriginal
        this.corNova = corNova
        this.botao.style.backgroundColor = corOriginal
        this.botao.onclick = () => { testando(this.botao.id) }
    }

    gerarCartas (tabuleiro) {
        tabuleiro.appendChild(this.botao)
    }

    mudarCorNova() {
        this.botao.style.backgroundColor = this.corNova
    }

    mudarCorOriginal() {
        this.botao.style.backgroundColor = this.corOriginal
    }

    getcorOriginal() {
        return this.corOriginal
    }

    getCorAtual() {
        return this.botao.style.backgroundColor
    }

    getcorNova() {
        return this.corNova
    }

    setcorOriginal(corOriginal) {
        this.corOriginal = corOriginal
      }

    setcorNova(corNova) {
        this.corNova = corNova
    }
}

function gerarTabuleiro () {
    if (quantCartas.value < 1 || quantCartas.value % 2 == 1) {
        return alert("Valor Invalido")
    } else {
        tabuleiro.innerHTML = ""
        cartas.splice(0, cartas.length)
        c = 0
        coresSortidas.splice(0, coresSortidas.length)
    }
    for (let c = 0; c < quantCartas.value; c++) {
        novaCarta = new Cartas ("black", "orange", c)
        cartas.push(novaCarta)
    }

    for (let c = 0; c < quantCartas.value; c++) {
        cartas[c].gerarCartas(tabuleiro)
    }

    colocandoCoresNovas()
    mostrandoCores()
}

function mostrandoCores () {
    setTimeout (() => {
        for (let c in cartas) {
            cartas[c].mudarCorNova()
        }
    }, 1000)

    setTimeout (() => {
        for (let c in cartas) {
            cartas[c].mudarCorOriginal()
        }
    }, 2000)    
}

function colocandoCoresNovas () {
    let contador = 0
    vmax = quantCartas.value
    coresSortidas.length = cartas.length
    
    do {
        let corrandom = Math.floor(Math.random() * 8) // DEFININDO COR RANDOM
        contador = 0
        while (contador < 2) {
            let indiceRandom = Math.floor(Math.random() * coresSortidas.length) // DEFININDO UM INDICE RANDOM
            if (typeof coresSortidas[indiceRandom] === 'undefined') { // VERIFICIANDO SE O INDICE ESTA DISPONIVEL
                coresSortidas[indiceRandom] = corrandom
                contador++
                }
            }

        contador = 0
        for (let x = 0; x < coresSortidas.length; x++) { // VERIFICANDO SE FOI DEFINIDO TODAS AS CORES
            if (typeof coresSortidas[x] === 'undefined') {
                contador++
            }
        }

        if (contador == 0) {
            for (x in coresSortidas) { // ATRIBUINDO AS CORES NAS CARTAS
                valorCor = coresSortidas[x]
                coresSortidas[x] = paletasdeCores[valorCor]
                cartas[x].setcorNova(coresSortidas[x])
            }
        }
        
        console.log(coresSortidas)
    } while (contador != 0) 
}

function testando (botao) {
    console.log(cartas[botao])
    if (cartas[botao].getCorAtual() != 'black') {
        return alert("Carta Já Selecionada")
    }
    if (cartasViradas == 0) {
        cartas[botao].mudarCorNova()
        cartasViradas++
        jogando.push(botao)
    }else {
        cartas[botao].mudarCorNova()
        jogando.push(botao)
        verificacao(jogando[0], jogando[1])
    }
}

function verificacao(j1,j2) {
    if (cartas[j1].getcorNova() == cartas[j2].getcorNova()) {
        setTimeout(() => {
            alert("Acertou")
            acertos++
            racertos.innerText = `Acertos: ${acertos}`
            jogando.splice(0, jogando.length)
        }, 500)
        
    }else {
        setTimeout(() => {
            alert("Errou")
            erros++
            rerros.innerText = `Erros: ${erros}`
            cartas[j1].mudarCorOriginal()
            cartas[j2].mudarCorOriginal()
            jogando.splice(0, jogando.length)
        }, 500)   
    }
    cartasViradas = 0
    
}

