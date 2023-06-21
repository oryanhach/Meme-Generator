'use strict'

function onInit() {
    const gallery = onGetGallery()
    renderGallery(gallery)
}

function onGetGallery() {
    return getGallery()
}

function renderGallery(gallery) {
    let galleryHTML = ''
    galleryHTML += gallery.map((picture, idx) => {
        return `
        <article onclick="onClickedGalleryItem(${idx})" class="card">
        <img src="${picture.url}"/>
        </article>
        `
    }).join('')

    document.querySelector('.gallery-container').innerHTML = galleryHTML
}

function onClickedGalleryItem(idx) {
    console.log(idx)
    goToGeneratorPage()
}