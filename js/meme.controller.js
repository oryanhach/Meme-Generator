'use strict'

let gElCanvas
let gCtx
let gCurrImgIdx
let gCurrLineIdx = 0
let gSelectedLine = 0
let gIsFocused = false
let gIsDragging = false
let movePos = { x: 0, y: 0 }

function initCanvas() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')

    addEventListeners()
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

function addEventListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    console.log(pos)
    isLineSelected(pos)
}

function onMove(ev) {
    if (gIsDragging) {
        let pos = getEvPos(ev)
        movePos.x = pos.x
        movePos.y = pos.y
        console.log('movePos:', movePos)
        const WIDTH = getTextWidth(gSelectedLine, getMemeInfo().Lines)
        const startY = (gSelectedLine === 0) ? 8 : 350
        const size = getMemeInfo().Lines[gSelectedLine].size
        onUpdateLinePos(gSelectedLine, movePos.x, movePos.y, WIDTH + (gElCanvas.width / 11), (gElCanvas.height / 8) + startY - 16 * size + size * 16)
        console.log(getMemeInfo().Lines)
    }
}

function onUp() {
    gIsDragging = false
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    return pos
}

function isLineSelected(pos) {
    const lines = getMemeInfo()
    for (var i = 0; i < 2; i++) {
        if (
            pos.x >= lines.Lines[i].pos.startX &&
            pos.x <= lines.Lines[i].pos.endX &&
            pos.y >= lines.Lines[i].pos.startY &&
            pos.y <= lines.Lines[i].pos.endY
        ) {
            if (i === 0) {
                console.log('First line selected')
                getEditor(i)
                updateCurrLineIdx(i)
                updateSelectedLine(i)
                gIsDragging = true
            } else if (i === 1) {
                console.log('Second line selected')
                getEditor(i)
                updateCurrLineIdx(i)
                updateSelectedLine(i)
                gIsDragging = true
            }
        }
    }
}

function getEditor(idx) {
    const elInput = document.querySelector('.text-editor')
    const line = getMemeInfo().Lines[idx]
    elInput.focus()
    updateLineInput(idx)

}

function onSetLineTxt(ev) {
    setLineTxt(ev)
    gIsFocused = true
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
            const startY = (index === 0) ? 8 : 350
            gCtx.fillStyle = color
            gCtx.font = `${size}em ${font}`
            gCtx.fillText(txt, (gElCanvas.width / 11), (gElCanvas.height / 8) + startY)
            gCtx.strokeText(txt, (gElCanvas.width / 11), (gElCanvas.height / 8) + startY)
            if (gIsFocused && line.isSelected) {
                renderRect(index, MEME_INFO.Lines, startY, size)
            }
        })
    }
}

function renderRect(index, lines, lineHeight, size) {
    const WIDTH = getTextWidth(index, lines)
    gCtx.strokeRect((gElCanvas.width / 11), (gElCanvas.height / 8) + lineHeight - 16 * size, WIDTH, size * 16)
    onUpdateLinePos(index, (gElCanvas.width / 11), (gElCanvas.height / 8) + lineHeight - 16 * size, WIDTH + (gElCanvas.width / 11), (gElCanvas.height / 8) + lineHeight - 16 * size + size * 16)
}

function onUpdateLinePos(index, startX, startY, endX, endY) {
    updateLinePos(index, startX, startY, endX, endY)
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
    elInput.blur()
    gIsFocused = false
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    clearInput()
    switch (gCurrLineIdx) {
        case 0:
            gCurrLineIdx = 1
            updateLineInput(1)
            updateCurrLineIdx(gCurrLineIdx)
            updateSelectedLine(1)
            break
        case 1:
            gCurrLineIdx = 0
            updateLineInput(0)
            updateCurrLineIdx(gCurrLineIdx)
            updateSelectedLine(0)
            break
    }
}

function updateLineInput(idx) {
    const elInput = document.querySelector('.text-editor')
    const txtInput = getLineInput(idx)
    elInput.value = txtInput
}


// TODO - after finishing phase 5 >>> check pdf for missing requirements >>> phase 6.