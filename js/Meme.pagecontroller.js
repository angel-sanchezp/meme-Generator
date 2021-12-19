'use strict'

function onInit() {
    initGallery();
    initCanvas();
    // renderMeme();
}

function renderMeme() {
    gCtx.save();
    drawMeme();
    gCtx.restore();
}
function onSetFilter() {
  renderImgs();
}

function onAddStiker(id){
    addRowSticker(id);
    renderMeme();
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
    console.log('hi');
    var elAppContainer = document.querySelector('.app-container');
    elAppContainer.style.display = 'none';
    var elGallery = document.querySelector('.memes-gallery');
    elGallery.style.display = 'none';
    var elPicFilter=document.querySelector('.header-gallery');
    elPicFilter.style.display='block';
    var elGallery = document.querySelector('.gallery-container');
    elGallery.style.display = 'block';
}

function onSave() {
    saveMeme();
}

function onChangeFont(fontFamily) {
    setFont(fontFamily);
    renderMeme();
}

function onIncreasFont(word){
    var words=getWords();
    words[word]=words[word]+5;
    renderKeyWord();
}

function onMoveX(index) {
    setMoveX(index);
    renderMeme();
}

function onGetSavedMemes() {
    console.log('onGetSavedMemes')
    var elGallery = document.querySelector('.gallery-container');
    elGallery.style.display = 'none';
    var elAppContainer = document.querySelector('.app-container');
    elAppContainer.style.display = 'none'
    var elPicFilter=document.querySelector('.header-gallery');
    elPicFilter.style.display='none';
    var elMemeGallery = document.querySelector('.memes-gallery')
    elMemeGallery.style.display = 'grid'
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