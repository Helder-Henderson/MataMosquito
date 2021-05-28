var width = 0
var height = 0
var vidas = 1
var tempo = 10
var criaMosquitoTempo = 1500

var nivel = window.location.search
//retira lá ? dos parametros....
nivel = nivel.replace('?', '')

if (nivel === 'normal') {
  criaMosquitoTempo = 1500
} else if (nivel === 'dificil') {
  criaMosquitoTempo = 1000
} else if (nivel === 'insano') {
  criaMosquitoTempo = 750
}

function ajustaTamanhoTelaJogo() {
  width = window.innerWidth
  height = window.innerHeight
}

var cronometro = setInterval(function () {
  tempo -= 1
  if (tempo < 0) {
    clearInterval(cronometro)
    clearInterval(criaMosquito)
    window.location.href = "vitoria.html"
  } else {
    //inserindo dentro das tag's
    document.getElementById('cronometro').innerHTML = tempo
  }
}, 1000)

ajustaTamanhoTelaJogo()

function posicaoRandomica() {
  //removendo o mosquito anterior (caso exista)
  var elemento = document.getElementById('mosquito')
  if (elemento) {
    document.getElementById('mosquito').remove()

    //afetando a primeira vida conforme não é clicado no mosquito

    if (vidas > 3) {
      //lógica do game over
      window.location.href = "fim_de_jogo.html"
    }

    document.getElementById("vida" + vidas).src = "imagens/coracao_vazio.png"
    vidas++
  }

  //pegando posicao aleatoria de X e Y 
  var posicaoX = Math.floor(Math.random() * width) - 90
  var posicaoY = Math.floor(Math.random() * height) - 90

  posicaoX = posicaoX < 0 ? 0 : posicaoX
  posicaoY = posicaoY < 0 ? 0 : posicaoY

  //criar elemento HTML 
  var mosquito = document.createElement('img')
  //adicionando o local do elemento
  mosquito.src = 'imagens/mosquito.png'
  //adicionando tamanho aleatorio com base em uma funcao
  mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
  mosquito.style.left = posicaoX + "px"
  mosquito.style.top = posicaoY + "px"
  mosquito.style.position = "absolute"
  //vamos fazer a verificação com o uso do ID
  mosquito.id = "mosquito"
  mosquito.onclick = function () {
    //faz referencia ao proprio elemento executador da função
    this.remove()
  }
  //adicionando elemento ao body
  document.body.appendChild(mosquito)

}

function tamanhoAleatorio() {
  //retornando valores entre 0 e 2 
  var tamanho = Math.floor(Math.random() * 3)

  switch (tamanho) {
    case 0:
      return 'tamanho_mosquito'
    case 1:
      return 'tamanho_mosquito2'
    case 2:
      return 'tamanho_mosquito3'
  }
}

function ladoAleatorio() {
  //retornando valores entre 0 e 1 
  var classe = Math.floor(Math.random() * 2)

  switch (classe) {
    case 0:
      return 'ladoA'
    case 1:
      return 'ladoB'
  }
}