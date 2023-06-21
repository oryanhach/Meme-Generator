'use strict'

function goToGenerator(idx){
    const elSearchBar = document.querySelector('.search-bar')
    const elGallery = document.querySelector('.gallery-container')
    const elGenerator = document.querySelector('.generator-layout')

    elSearchBar.style.display = 'none'
    elGallery.style.display = 'none'
    
    elGenerator.style.display = 'grid'
    initCanvas()
    renderImage(idx)
}

function goToGallery(){
    const elSearchBar = document.querySelector('.search-bar')
    const elGallery = document.querySelector('.gallery-container')
    const elGenerator = document.querySelector('.generator-layout')

    elGenerator.style.display = 'none'
    
    elSearchBar.style.display = 'block'
    elGallery.style.display = 'flex'
}