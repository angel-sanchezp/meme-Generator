'use strict'

function onInit() {
    loadImages();
    initCanvas();
    // renderMeme();
}

function renderMeme() {
    gCtx.save();
    drawMeme();
    gCtx.restore();
}

function onChangeText(elInput) {
    setLineText(elInput.value)
    renderMeme();
}

function onChangeTextColor(inputColor) {
    setColortext(inputColor.value);
    renderMeme();
}

function onFSize(indicator) {
    setIncFSize(indicator);
    renderMeme();
}

function onUpDown(index) {
    setUpDown(index);
    renderMeme();
}

function onClear() {
    var inputTxt = document.querySelector('.text-input');
    inputTxt.value = '',
        setClearTxt();
    renderMeme();

}


function onSwitchTxt() {
    setSwitchLines();
    renderMeme();
}

function onAddRow() {
    addRow();
    renderMeme();
    focusText();
}

function focusText() {
    document.querySelector('.text-input').focus();
}

function onBackToGallery() {
    var elAppContainer = document.querySelector('.app-container');
    elAppContainer.style.display = 'none';
    var elGallery = document.querySelector('.memes-gallery');
    elGallery.style.display = 'none';
    var elGallery = document.querySelector('.gallery');
    elGallery.style.display = 'grid';

}

function onSave(elbtn) {
    saveMeme();
}

function onChangeFont(fontFamily) {
    setFont(fontFamily);
    renderMeme();
}

function onMoveX(index) {
    setMoveX(index);
    renderMeme();
}

function onGetSavedMemes() {
    console.log('hi')
    var elGallery = document.querySelector('.gallery');
    elGallery.style.display = 'none';
    var elAppContainer = document.querySelector('.app-container');
    elAppContainer.style.display = 'none'
    loadMemes();
}

function onDownloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-canvas';
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}