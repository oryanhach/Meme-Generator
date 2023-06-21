'use strict'

let gElCanvas
let gCtx

function initCanvas() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
}

function renderImage(idx) {
    const meme = getImage(idx)
    const img = new Image()
    img.src = `${meme.url}`
    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function onSetLineTxt(ev) {
    setLineTxt(ev)
}

function onChangeFont(ev) {
    changeFont(ev.value)
    onClearText()
}

function onClearText() {
    clearText()
    clearCanvas()
    document.querySelector('.text-editor').value = ''
}

function renderMeme() {
    const MEME_INFO = getMemeInfo()
    const MEME_FONT = MEME_INFO.Lines[0].font
    const MEME_SIZE = MEME_INFO.Lines[0].size
    gCtx.fillStyle = 'black'
    gCtx.font = `${MEME_SIZE}em ${MEME_FONT}`
    gCtx.fillText(`${MEME_INFO.Lines[0].txt}`, (gElCanvas.width / 11), (gElCanvas.height / 8) + 8)
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}
