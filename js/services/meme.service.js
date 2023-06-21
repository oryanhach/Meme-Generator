'use strict'

var gImgs = []
var gMeme = {
    selectedImgId: null,
    selectedLine: 'top',
    Lines: [
        {
            txt: '',
            font: 'impact',
            size: 2,
            color: null
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
    gMeme.Lines[0].txt = ev.value
    renderMeme()
}

function changeFont(ev) {
    gMeme.Lines[0].font = ev
    renderImage(gMeme.selectedImgId)
}

function fontSizeChange(symbol) {
    if (symbol === '-' && gMeme.Lines[0].size >= 1) gMeme.Lines[0].size -= 0.5
    if (symbol === '+') gMeme.Lines[0].size += 0.5
}

function getMemeInfo() {
    return gMeme
}

function clearText() {
    gMeme.Lines[0].txt = ''
    renderMeme()
}

