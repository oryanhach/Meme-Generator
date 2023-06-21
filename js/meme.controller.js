'use strict'

let gElCanvas
let gCtx

function initCanvas() {
    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');

    window.addEventListener('resize', ()=>{
        resizeCanvas()
    })
}

function resizeCanvas(){
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
}

function renderMeme(idx){
    
}
