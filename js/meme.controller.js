'use strict'

let gElCanvas
let gCtx
let gCurrImgIdx
let gCurrLineIdx = 0
let gSelectedLine = 0

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
    renderImage(gCurrImgIdx)
    renderMeme()
}

function renderMeme() {
    const meme = getImage(gCurrImgIdx)
    const img = new Image()
    img.src = `${meme.url}`
    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        const MEME_INFO = getMemeInfo()
        MEME_INFO.Lines.forEach((line, index) => {
            const { txt, font, size, color } = line
            const LINE_HEIGHT = (index === 0) ? 8 : 350
            gCtx.fillStyle = color
            gCtx.font = `${size}em ${font}`
            gCtx.fillText(txt, (gElCanvas.width / 11), (gElCanvas.height / 8) + LINE_HEIGHT)
            gCtx.strokeText(txt, (gElCanvas.width / 11), (gElCanvas.height / 8) + LINE_HEIGHT)
            if (line.txt.length > 0) {
                renderRect(index, MEME_INFO.Lines, LINE_HEIGHT, size)
            }
        })
    }
}

function renderRect(index, lines, lineHeight, size) {
    const WIDTH = getTextWidth(index, lines)
    gCtx.strokeRect((gElCanvas.width / 11), (gElCanvas.height / 8) + lineHeight - 16 * size, WIDTH, size * 16)
}

function getTextWidth(lineIdx, lines) {
    const LINE = lines[lineIdx].txt
    let TEXT_WIDTH = gCtx.measureText(LINE).width
    if (TEXT_WIDTH === 0) TEXT_WIDTH = lines[lineIdx].width
    return TEXT_WIDTH
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

function onAddLine() {
    const elInput = document.querySelector('.text-editor')
    clearInput()
    elInput.blur()
}

function onSwitchLine() {
    switchLine()
    clearInput()
    switch (gCurrLineIdx) {
        case 0:
            gCurrLineIdx = 1
            updateLineInput(1)
            updateCurrLineIdx(gCurrLineIdx)
            break
        case 1:
            gCurrLineIdx = 0
            updateLineInput(0)
            updateCurrLineIdx(gCurrLineIdx)
            break
    }
}

function updateLineInput(idx) {
    const elInput = document.querySelector('.text-editor')
    const txtInput = getLineInput(idx)
    elInput.value = txtInput
}


// TODO - get rid of top bottom buttons.
// TODO - frame, when out of focus, remove frame.
// TODO - frame, use examples from inclass.
// TODO - after finishing phase 5 >>> check pdf for missing requirements >>> phase 6.