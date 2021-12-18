'use strict'

var gFilterBy = 'ALL';
function initGallery() {
 renderImgs();

}

function renderImgs() {
    var elAppContainer = document.querySelector('.app-container');
    elAppContainer.style.display = 'none';
    var imgs =getImgsForDisplay();
    console.log(imgs)
    var strHtml = imgs.map(img =>
        `<img src="${img.url}" onclick="imgClicked(${img.id})"/>`
    );

    var elGallery = document.querySelector('.gallery');
    elGallery.innerHTML = strHtml.join('');
}



function getImgsForDisplay() {
    var imgs = [];
    imgs = filterImgs(gImgs);
    return imgs;
}

function filterImgs(imgs) {
   var userSearch = document.getElementById('search').value;
    if (userSearch === '') return imgs;
   return imgs.filter(function (img) {
        return img.keywords.some(function (keyword) {
            return keyword.substring(0, userSearch.length) === userSearch;
        });
    });
}

function imgClicked(imgId) {
    var elGallery = document.querySelector('.gallery-container');
    elGallery.style.display = 'none';
    var elGalleryMemes = document.querySelector('.memes-gallery');
    elGalleryMemes.style.display = 'none';
    var elPicFilter=document.querySelector('.pic-filter');
    elPicFilter.style.display='none';
    var elAppContainer = document.querySelector('.app-container');
    elAppContainer.style.display = 'flex'

    doMeme(imgId);
    renderMeme();

}

