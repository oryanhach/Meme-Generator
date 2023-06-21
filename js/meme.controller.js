'use strict'

let gElCanvas
let gCtx

function initCanvas() {
    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');
}

function renderMeme(idx) {
    const imgIdx = idx + 1
    const img = new Image()
    img.src = `./images/${imgIdx}.jpg`
    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}
