const bancoDePalavras = ["casa", "carro", "desafio", "honra", "espelho"];

const letrasPrecionadas = [];
let palavraSorteada;
let tentativa = 0;
let teclado = 0; //

//nodes
const alt = document.querySelectorAll(".alt");
const adicionaPalavra = document.querySelector(".adicionar-palavra");
const input = document.querySelector(".nova-palavra");
const novoJogo = document.querySelector("#novo-jogo");
const valido = document.querySelector(".valido");
const nulo = document.querySelector(".nulo");
const mobile = document.querySelector(".mobile"); //

//events
window.addEventListener("click", mobileTeclado); //
mobile.firstElementChild.addEventListener("keypress", teclasMobile);

window.addEventListener("load", function () {
    alt.forEach((e) => {
        e.addEventListener("click", alternarInterfaces);
    });
});
adicionaPalavra.addEventListener("click", verificaSePalavraExite);
novoJogo.addEventListener("click", resetarJogo);
window.addEventListener("keypress", validacaoLetras);
input.addEventListener("keypress", function (e) {
    if (!validar(e) || input.value.length >= 8) {
        e.preventDefault();
    }
});

//functions de preparação do jogo.
function alternarInterfaces(e) {
    if (this.parentNode.tagName == "SECTION") {
        this.parentNode.style.display = "none";
    } else {
        this.parentNode.parentNode.style.display = "none";
    }

    if (e.target.classList.contains("game")) {
        let telaGame = document.querySelector(".main-game");
        telaGame.style.display = "flex";
        resetarJogo();
    } else if (e.target.classList.contains("add")) {
        let telaAdd = document.querySelector(".main-add");
        telaAdd.style.display = "flex";
        input.focus();
    } else {
        let index = document.querySelector(".main-index");
        index.style.display = "flex";
        limparInput();
    }
}
function resetarJogo() {
    let qtdFilhos = valido.childElementCount;

    for (let i = 0; i < qtdFilhos; i++) {
        let child = valido.firstElementChild;
        valido.removeChild(child);
    }

    qtdFilhos = nulo.childElementCount;

    for (let i = 0; i < qtdFilhos; i++) {
        child = nulo.firstElementChild;
        nulo.removeChild(child);
    }

    letrasPrecionadas.splice(0);
    tentativa = 0;
    sorteiaNumeroAleatorio();
    limparCanvas();
    window.focus();
    window.addEventListener("keypress", validacaoLetras);
}
function sorteiaNumeroAleatorio() {
    let numerAleatorio = Math.floor(Math.random() * bancoDePalavras.length);

    return gerarPalavra(numerAleatorio);
}
function gerarPalavra(num) {
    palavraSorteada = bancoDePalavras[num];

    for (let i = 0; i < palavraSorteada.length; i++) {
        valido.append(criarSpan());
    }
}
function criarSpan() {
    let span = document.createElement("span");

    return span;
}

//functions adição de novas Palavras
function verificaSePalavraExite() {
    if (input.value !== "") {
        let word = input.value.toLowerCase();

        let palavraNova;

        if (word.length <= 8) {
            for (let i = 0; i < bancoDePalavras.length; i++) {
                if (word == bancoDePalavras[i]) {
                    console.log("palavra já existente");
                    limparInput();
                    input.style.border = "1px solid red";
                    input.focus();
                    palavraNova = false;
                    break;
                } else {
                    palavraNova = true;
                }
            }

            if (palavraNova) {
                input.style.border = "none";
                adicionarPalavraNoArray(word);
                input.focus();
            }
        }
    } else {
        input.focus();
    }
}
function adicionarPalavraNoArray(word) {
    bancoDePalavras.push(word);
    console.log(`Palavra ${word} adicionada.`);
    limparInput();
}
function limparInput() {
    input.value = "";
    input.style.border = "none";
}

//functions do jogo ativo
function validacaoLetras(event) {
    if (valido.parentElement.style.display == "flex") {
        if (validar(event)) {
            let letra = String.fromCharCode(event.keyCode);
            let temNoArray = verificaSeLetraJaFoiPrecionada(
                letra,
                letrasPrecionadas
            );

            if (!temNoArray) {
                letrasPrecionadas.push(letra);

                if (verificaSeLetraEstaNaPalavra(letra)) {
                    let indexDaLetraNaPalavraSorteada = gerarIndex(letra);
                    exibirLetrasCorretasNaTela(
                        letra,
                        indexDaLetraNaPalavraSorteada
                    );
                    checarVitoria();
                } else {
                    console.log("A palavra não possui essa letra");
                    exibirLetraErradaNaTela(letra);
                    checarDerrota(tentativa);
                    teste(tentativa);
                    tentativa++;
                }
            } else {
                return console.log("Letra já Precionada anteriomente");
            }
        }
    }
}
function verificaSeLetraJaFoiPrecionada(letter, callback) {
    let temNoArray = false;

    callback.forEach((letra) => {
        if (letter == letra) {
            temNoArray = true;
        }
    });

    return temNoArray;
}
function verificaSeLetraEstaNaPalavra(letter) {
    let temNaPalavra = false;

    if (valido.parentElement.style.display == "flex") {
        if (palavraSorteada.includes(letter)) {
            temNaPalavra = true;
        }
        return temNaPalavra;
    }
}
function gerarIndex(letra) {
    let arr = [];

    for (let i = 0; i < palavraSorteada.length; i++) {
        if (palavraSorteada[i] == letra) {
            arr.push(i);
        }
    }
    return arr;
}
function exibirLetrasCorretasNaTela(letter, arr) {
    let letra = letter.toUpperCase();

    for (let i = 0; i < arr.length; i++) {
        valido.children[arr[i]].textContent = letra;
    }
}
function exibirLetraErradaNaTela(letter) {
    let letra = letter.toUpperCase();
    let span = criarSpan();
    span.append(letra);
    document.querySelector(".nulo").append(span);
}
function checarVitoria() {
    let resultado = "";
    let numeroDeCasas = valido.childElementCount;

    for (let i = 0; i < numeroDeCasas; i++) {
        if (valido.children[i] != "") {
            resultado += valido.children[i].textContent;
        }
    }

    if (resultado.toLowerCase() == palavraSorteada) {
        window.removeEventListener("keypress", validacaoLetras);
        console.log("Parabéns, você venceu!!!");
    }
}
function checarDerrota(n) {
    if (n >= 6) {
        window.removeEventListener("keypress", validacaoLetras);
        console.log("Você perdeu..");
    }
}

function validar(event) {
    if (event.keyCode >= 97 && event.keyCode <= 122) {
        return true;
    } else {
        return false;
    }
}

function cambiarra(keyCode) {
    console.log(keyCode);
    if (keyCode >= 97 && keyCode <= 122) {
        let letra = String.fromCharCode(keyCode);
        let temNoArray = verificaSeLetraJaFoiPrecionada(
            letra,
            letrasPrecionadas
        );

        if (!temNoArray) {
            letrasPrecionadas.push(letra);

            if (verificaSeLetraEstaNaPalavra(letra)) {
                let indexDaLetraNaPalavraSorteada = gerarIndex(letra);
                exibirLetrasCorretasNaTela(
                    letra,
                    indexDaLetraNaPalavraSorteada
                );
                checarVitoria();
            } else {
                console.log("A palavra não possui essa letra");
                exibirLetraErradaNaTela(letra);
                checarDerrota(tentativa);
                teste(tentativa);
                tentativa++;
            }
        } else {
            return console.log("Letra já Precionada anteriomente");
        }
    }
}

function teclasMobile() {
    let letra = mobile.firstElementChild.value;

    cambiarra(letra.charCodeAt(0));

    mobile.firstElementChild.value = "";
}

function mobileTeclado() {
    if (teclado == 0) {
        mobile.firstElementChild.focus();
        teclado = 1;
    } else {
        mobile.firstElementChild.blur();
        teclado = 0;
    }
}
