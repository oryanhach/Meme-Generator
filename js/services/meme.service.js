'use strict'

var gImgs = []
var gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    Lines: [
        {
            txt: '',
            font: 'impact',
            size: 2,
            color: 'white',
            width: 100,
            height: 30,
            isSelected: true,
            pos: {
                startX: 40.90909090909091,
                startY: 64.25,
                endX: 0,
                endY: 34.25,
            }
        },
        {
            txt: '',
            font: 'impact',
            size: 2,
            color: 'white',
            width: 30,
            height: 30,
            isSelected: false,
            pos: {
                startX: 40.9,
                startY: 406.25,
                endX: 0,
                endY: 376.25,
            }
        }
    ]
}

_createGallery()

function getGallery() {
    return gImgs
}

function _createGallery() {
    gImgs.push(
        { id: 1, url: './images/1.jpg', keywords: ['word1', 'word2'] },
        { id: 2, url: './images/2.jpg', keywords: ['word1', 'word2'] },
        { id: 3, url: './images/3.jpg', keywords: ['word1', 'word2'] },
        { id: 4, url: './images/4.jpg', keywords: ['word1', 'word2'] },
        { id: 5, url: './images/5.jpg', keywords: ['word1', 'word2'] },
        { id: 6, url: './images/6.jpg', keywords: ['word1', 'word2'] },
        { id: 7, url: './images/7.jpg', keywords: ['word1', 'word2'] },
        { id: 8, url: './images/8.jpg', keywords: ['word1', 'word2'] },
        { id: 9, url: './images/9.jpg', keywords: ['word1', 'word2'] },
        { id: 10, url: './images/10.jpg', keywords: ['word1', 'word2'] },
        { id: 11, url: './images/11.jpg', keywords: ['word1', 'word2'] },
        { id: 12, url: './images/12.jpg', keywords: ['word1', 'word2'] },
        { id: 13, url: './images/13.jpg', keywords: ['word1', 'word2'] },
        { id: 14, url: './images/14.jpg', keywords: ['word1', 'word2'] },
    )
}

function getImage(idx) {
    gMeme.selectedImgId = idx
    return gImgs.find((image) => image.id - 1 === idx)
}

function setLineTxt(ev) {
    gMeme.Lines[gMeme.selectedLineIdx].txt = ev.value
    renderMeme()
}

function changeFont(fontName) {
    gMeme.Lines[gMeme.selectedLineIdx].font = fontName
    renderImage(gMeme.selectedImgId)
    renderMeme()
}

function fontSizeChange(symbol) {
    const currLineIdx = gMeme.selectedLineIdx
    if (symbol === '-' && gMeme.Lines[currLineIdx].size >= 1) gMeme.Lines[currLineIdx].size -= 0.5
    if (symbol === '+') gMeme.Lines[currLineIdx].size += 0.5
}

function changeColor(color) {
    gMeme.Lines[gMeme.selectedLineIdx].color = color
}

function getMemeInfo() {
    return gMeme
}

function clearText() {
    gMeme.Lines[gCurrLineIdx].txt = ''
    renderMeme()
}

function updateCurrLineIdx(idx) {
    gMeme.selectedLineIdx = idx
}

function updateSelectedLine(index) {
    if (index === 0) {
        gMeme.Lines[0].isSelected = true
        gMeme.Lines[1].isSelected = false
        renderMeme()
    } else {
        gMeme.Lines[1].isSelected = true
        gMeme.Lines[0].isSelected = false
        renderMeme()
    }
}

function switchLine() {
    switch (gMeme.selectedLineIdx) {
        case 0:
            gMeme.selectedLineIdx = 1
            break
        case 1:
            gMeme.selectedLineIdx = 0
            break
    }
}

function getLineInput(idx) {
    const txtInput = gMeme.Lines[idx].txt
    return txtInput

}

function updateLinePos(index, startX, startY, endX, endY) {
    gMeme.Lines[index].pos.startX = startX
    gMeme.Lines[index].pos.startY = startY
    gMeme.Lines[index].pos.endX = endX
    gMeme.Lines[index].pos.endY = endY
}
