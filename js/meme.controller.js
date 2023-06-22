'use strict'

let gElCanvas
let gCtx
let gCurrImgIdx
let gCurrLineIdx = 0

function initCanvas() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
}

function renderImage(idx) {
    gCurrImgIdx = idx
    const meme = getImage(idx)
    const img = new Image()
    img.src = `${meme.url}`
    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        renderMeme()
    }
}

function onSetLineTxt(ev) {
    setLineTxt(ev)
}

function onChangeFont(ev) {
    changeFont(ev.value)
    clearInput()
}

function onClearText() {
    clearText()
    clearCanvas()
}

function onChangeColor(color) {
    changeColor(color)
    renderImage(gCurrImgIdx)
}

function onFontSizeChange(symbol) {
    fontSizeChange(symbol)
    clearText()
    renderImage(gCurrImgIdx)
    renderMeme()
    clearInput()
}

function onSetRowIdx(direction) {
    clearInput()
    setRowIdx(direction)
    if (direction === 'top') gCurrLineIdx = 0
    if (direction === 'bottom') gCurrLineIdx = 1
    updateCurrLineIdx(gCurrLineIdx)
}

function renderMeme() {
    const MEME_INFO = getMemeInfo()
    MEME_INFO.Lines.forEach((line, index) => {
        const { txt, font, size, color } = line
        const lineHeight = (index === 0) ? 8 : 350
        gCtx.fillStyle = color
        gCtx.font = `${size}em ${font}`
        gCtx.fillText(txt, (gElCanvas.width / 11), (gElCanvas.height / 8) + lineHeight)
    })
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function clearInput() {
    const elInput = document.querySelector('.text-editor')
    elInput.value = ''
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

