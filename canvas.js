const tela = document.querySelector("canvas");
const pincel = tela.getContext("2d");

const movimentos = [
    [{ x: 15, y: 390, x1: 15, y1: 15 }],
    [{ x: 15, y: 15, x1: 175, y1: 15 }],
    [{ x: 175, y: 15, x1: 175, y1: 45 }],
    [{ x: 175, y: 75, x1: 30, y1: 0 }],
    [{ x: 175, y: 105, x1: 175, y1: 230 }],
    [
        { x: 175, y: 130, x1: 132.5, y1: 215 },
        { x: 175, y: 130, x1: 217.5, y1: 215 },
    ],
    [
        { x: 175, y: 230, x1: 132.5, y1: 320 },
        { x: 175, y: 230, x1: 207.5, y1: 320 },
    ],
];

pincel.fillStyle = "blue";
pincel.beginPath();
pincel.moveTo(5, 390);
pincel.lineWidth = 3;
pincel.lineTo(345, 390);
pincel.stroke();

function teste(n) {
    if (movimentos[n].length == 1) {
        desenhaLinha(n, movimentos[n][0]);
    } else {
        for (let i = 0; i < movimentos[n].length; i++) {
            desenhaLinha(n, movimentos[n][i]);
        }
    }
}

function desenhaLinha(n, { x, y, x1, y1 }) {
    if (n == 3) {
        pincel.beginPath();
        pincel.arc(x, y, x1, y1, 2 * Math.PI);
        pincel.stroke();
    } else {
        pincel.beginPath();
        pincel.moveTo(x, y);
        pincel.lineTo(x1, y1);
        pincel.stroke();
    }
}

function limparCanvas() {
    pincel.clearRect(5, 5, 340, 385);
}
