'use strict'

let gElCanvas
let gCtx
let gCurrImgIdx
let gCurrLineIdx = 0
let gSelectedLine = 0
let gIsFocused = false
let gIsDragging = false
let gDragStartPos = { x: 0, y: 0 }
let gisClicked = false

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
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    isLineSelected(pos)
}

function onMove(ev) {

    if (gIsDragging) {
        let mouseX = ev.offsetX
        let mouseY = ev.offsetY

        let dx = mouseX - gDragStartPos.x
        console.log('dx:',dx)
        let dy = mouseY - gDragStartPos.y

        let currLine = getMemeInfo().Lines[gMeme.selectedLineIdx]
        currLine.pos.startX = dx
        currLine.pos.startY = dy
        currLine.pos.endX = dx
        currLine.pos.endY = dy
        renderMeme()
    }
}

function onUp(ev) {
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
            pos.y <= lines.Lines[i].pos.startY &&
            pos.y >= lines.Lines[i].pos.endY
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
    renderMeme()
}

function onFontSizeChange(symbol) {
    fontSizeChange(symbol)
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
            const { txt, font, size, color, pos } = line
            gCtx.fillStyle = color
            gCtx.font = `${size}em ${font}`
            gCtx.fillText(txt, pos.startX, pos.startY)
            gCtx.strokeText(txt, pos.startX, pos.startY)
            if (gIsFocused && line.isSelected) {
                renderRect(index, MEME_INFO.Lines, size)
            }
        })
    }
}

function renderRect(index, lines, size) {
    const WIDTH = getTextWidth(index, lines)
    const startX = lines[index].pos.startX
    const startY = lines[index].pos.startY
    const endX = startX + WIDTH
    const endY = startY - (size * 16)
    gCtx.strokeRect(startX, startY, WIDTH, -size * 16)
    onUpdateLinePos(index, startX, startY, endX, endY)
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
