'use strict'
var gCanvas;
var gCtx;


function initCanvas() {
    gCanvas = document.querySelector('.my-canvas');
    gCtx = gCanvas.getContext('2d');
    addListeners();

}



function drawMeme() {
    var currImg = getImg();
    console.log(currImg);
    var img = new Image();
    img.src = currImg.url;
    // console.log(img.src);
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        addText();
    }

}

function addText() {
    var memeLines = getMemeLines();
    console.log(memeLines.length);

    for(var i=0;i<memeLines.length;i++){
        var text = memeLines[i].txt;
        var size = memeLines[i].size;
        var color =memeLines[i].color;
        var fontFamily=memeLines[i].fontFamily;
        var posX=memeLines[i].posX;
        var posY = memeLines[i].posY;
        saveLinePos(i, posX, posY);
        drawText(text, size, color, fontFamily, posX,posY);
    }

    // memeLines.forEach((line,idx) => {
    //     var text = line.txt;
    //     var size = line.size;
    //     var color =line.color;
    //     var posy = line.posy;
    //     drawText(text, size, color, posy);
    // });

}

function drawText(txt, size, color, fontFamily, x ,y) {
    // gCtx.font = '48px serif';
    // gCtx.fillText(txt, x, y);
    // gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'center';
    // gCtx.lineWidth =2;
    // gCtx.strokeStyle = 'red';
    // gCtx.font = '50px monospace';
    // console.log( meme.lines[0].size)
    gCtx.font = `${size}px ${fontFamily}`;
    gCtx.fillStyle = color;
    gCtx.fillText(txt,x, y);
    // gCtx.strokeText(txt, x, y);
}

function setLineText(textValue) {
    var selectedLine = getSelectedLine();
    if (selectedLine) selectedLine.txt = textValue;
    // console.log(meme.lines[0].txt)

}

function setColortext(txtColor) {
    var meme = getMeme();
    meme.lines[gMeme.selectedLineIdx].color = txtColor;
    // console.log(meme.lines[0])
}

function setFont(fontFamily){
    var selectedLine = getSelectedLine();
    if (selectedLine) selectedLine.fontFamily = fontFamily;
}

function saveLinePos(idx, posX,posY) {
    if (idx < 0 || idx >= gMeme.lines.length) return;

    var line = gMeme.lines[idx];
    line.posX = posX;
    line.posY = posY;

}

function setIncFSize(indicator) {
    var meme = getMeme();
    var sizeNum = meme.lines[gMeme.selectedLineIdx].size;
    sizeNum += indicator;
    meme.lines[gMeme.selectedLineIdx].size = sizeNum;
    // console.log(meme.lines[0]);

}

function setUpDown(index) {
    var meme = getMeme();
    var posy = meme.lines[gMeme.selectedLineIdx].posY;
    console.log(posy);
    // if(posY===500 ||posY===50) return;
    posy += index;
    meme.lines[gMeme.selectedLineIdx].posY = posy;
    // console.log(posY)
    // console.log(posY);

    // console.log( meme.lines[0])
}

function setClearTxt() {
    // var meme = getMeme();
    // meme.lines[0].txt = '';
    var lineIdx = gMeme.selectedLineIdx;
    gMeme.lines.splice(lineIdx, 1);
    if (lineIdx > 0) selectLine(lineIdx - 1);
    else selectLine(0);
}

function addRow() {
    var newLine = {
        txt: 'Your Text',
            size: 20,
            fontFamily: 'IMPACT',
            color: 'black',
            posX:250,
            posY:50,
            isDrag:false
    }
    if (gMeme) {
        gMeme.lines.push(newLine);
        selectLine(gMeme.lines.length - 1);
    }

    console.log(newLine);
    console.log(gMeme);

}

function selectLine(idx){
    gMeme.selectedLineIdx = idx;
}

function getSelectedLine(){
    if (!gMeme) return;
    if (gMeme.selectedLineIdx >= gMeme.lines.length) return null;
    var selectedLine = gMeme.lines[gMeme.selectedLineIdx];
    return selectedLine;
}

function saveMeme(){
    var meme=getMeme();
    // console.log(meme);
    gMemes.push(meme);
    _saveMemesToStorage();
}

function renderMemes(memes){
    console.log(memes);
    var strHtml = memes.map(img =>
        `<img src="${img.url}" onclick="imgClicked(${img.selectedImg})"/>`
    );

    var elGallery = document.querySelector('.memes-gallery');
    elGallery.innerHTML = strHtml.join('');
}

