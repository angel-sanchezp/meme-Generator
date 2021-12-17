'use strict'

function loadImages() {
    var elAppContainer = document.querySelector('.app-container');
    elAppContainer.style.display='none';
    var imgs = getImgs();
    var strHtml = imgs.map(img =>
        `<img src="${img.url}" onclick="imgClicked(${img.id})"/>`
    );

    var elGallery = document.querySelector('.gallery');
    elGallery.innerHTML = strHtml.join('');
}

function imgClicked(imgId) {
    var elGallery= document.querySelector('.gallery');
    elGallery.style.display='none';
    var elGalleryMemes= document.querySelector('.memes-gallery');
    elGalleryMemes.style.display='none';
    var elAppContainer = document.querySelector('.app-container');
    elAppContainer.style.display='flex'

    doMeme(imgId);
    renderMeme();

}

