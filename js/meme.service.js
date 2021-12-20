'use strict'
var gCanvas;
var gCtx;


function initCanvas() {
    gCanvas = document.querySelector('.my-canvas');
    gCtx = gCanvas.getContext('2d');
    addListeners();

}

function getCanvas() {
    return gCanvas;
}

function drawMeme() {
    var currImg = getImg();
    // console.log(currImg);
    var img = new Image();
    img.src = currImg.url;
    // console.log(img.src);
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        addText();
        addSticker();
       
    }

}

function drawStiker(id,x=0,y=0){
    var img = new Image();
    img.src = `./stickers/${id}.png`;
    // console.log(img.src);
    img.onload = () => {
        gCtx.drawImage(img,x,y);
    }
}

function addSticker(){
    var memeLines = getMemeLines();
    for(var i=0;i<memeLines.length;i++){
        if(memeLines[i].txt)continue
        var stickerId=memeLines[i].id;
        var {x,y}=memeLines[i].pos;
        drawStiker(stickerId,x,y)
    }
}



function addText() {
    var memeLines = getMemeLines();
    // console.log('meme lines',memeLines);

    for (var i = 0; i < memeLines.length; i++) {
        if(memeLines[i].sticker) {
            addSticker();
            continue;
        }
        var text = memeLines[i].txt;
        var size = memeLines[i].size;
        var color = memeLines[i].color;
        var fontFamily = memeLines[i].fontFamily;
        var pos = memeLines[i].pos;
        var txtWidth = memeLines[i].width;
        if (!pos || !txtWidth) {
            pos = getLinePosIdxBased(i);
            txtWidth = getTextWidth(text);
        }
        saveLinePos(i, pos);
        saveWidthLine(i, txtWidth);
        drawText(text, size, color, fontFamily, pos);
    }
}

function drawText(txt, size, color,fontFamily, pos) {
    gCtx.beginPath();
    gCtx.textAlign = 'center';
    var rectHeight = size + 10;
    var rectWidth = (gCtx.measureText(txt).width + 40);
    // console.log('meseure before touch', rectWidth)
    markText(pos.x, pos.y, rectHeight, rectWidth);
    gCtx.font = `${size}px ${fontFamily}`;
    gCtx.fillStyle = color;
    gCtx.setLineDash([0]);
    gCtx.fillText(txt, (pos.x + rectWidth/2), (pos.y + rectHeight / 2));
    gCtx.closePath();
    // gCtx.strokeText(txt, x, y);
}

function setLineText(textValue) {
    var selectedLine = getSelectedLine();
    if (selectedLine) selectedLine.txt = textValue;

}

function getTextWidth(txt) {
    return gCtx.measureText(txt).width;
}

function setColortext(txtColor) {
    var meme = getMeme();
    meme.lines[gMeme.selectedLineIdx].color = txtColor;
    // console.log(meme.lines[0])
}

function setFont(fontFamily) {
    var selectedLine = getSelectedLine();
    if (selectedLine) selectedLine.fontFamily = fontFamily;
}

function saveLinePos(idx, pos) {
    if (idx < 0 || idx >= gMeme.lines.length) return;
    var line = gMeme.lines[idx];
    line.pos = pos;
}

function saveWidthLine(idx, width) {
    var line = gMeme.lines[idx];
    line.width = width;
}

function setIncFSize(indicator) {
    var meme = getMeme();
    var sizeNum = meme.lines[gMeme.selectedLineIdx].size;
    sizeNum += indicator;
    meme.lines[gMeme.selectedLineIdx].size = sizeNum;

}

function setMoveX(index) {
    var selectedLine = getSelectedLine();
    if (selectedLine) {
        if (index === 1) selectedLine.pos.x = 250;
        selectedLine.pos.x += index;
    }
}

function setSwitchLines() {
    var newIdx = gMeme.selectedLineIdx + 1
    if (newIdx === 0) {
        newIdx = gMeme.lines.length - 1;
    } else if (newIdx === gMeme.lines.length) {
        newIdx = 0;
    }
    
    selectLine(newIdx);


}

function setUpDown(index) {
    var selectedLine = getSelectedLine();
    console.log(selectedLine);
    if (selectedLine) selectedLine.pos.y += index; 
}



function setClearTxt() {
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
        pos: null,
        width: null,
        isDrag: false
    }
    if (gMeme) {
        gMeme.lines.push(newLine);
        selectLine(gMeme.lines.length - 1);
    }

    // console.log(newLine);
    // console.log(gMeme);

}

function addRowSticker(id) {
    var newLine = {
        id,
        sticker:`./stickers/${id}.png`,
        size: 71,
        fontFamily: 'IMPACT',
        color: 'none',
        pos: {x:0,y:0},
        width: 75,
        isDrag: false
    }
    if (gMeme) {
         gMeme.lines.push(newLine);
        selectLine(gMeme.lines.length - 1);
    }
    // console.log(newLine);
    // console.log(gMeme);

}

function selectLine(idx) {
    gMeme.selectedLineIdx = idx;
}

function getSelectedLine() {
    if (!gMeme) return;
    if (gMeme.selectedLineIdx >= gMeme.lines.length) return null;
    var selectedLine = gMeme.lines[gMeme.selectedLineIdx];
    return selectedLine;
}

function saveMeme() {
    var meme = getMeme();
    // console.log(meme);
    gMemes.push(meme);
    console.log(gMemes)
    showModal("Your Meme saved!");
    _saveMemesToStorage();
}

function renderMemes(memes) {
    console.log(memes);
    var strHtml = memes.map(img =>
        `<img src="${img.url}" onclick="imgAction(${img.selectedImg})"/>`
    );

    var elGallery = document.querySelector('.memes-gallery');
    elGallery.innerHTML = strHtml.join('');
}

function imgAction(imgId) {
    if (window.confirm("Press OK to Delete Meme/CANCEL to Modify Meme")) {
        var selectedImg = imgId;
        console.log(gMemes);
        gMemes.splice(selectedImg, 1);
        showModal("your Meme was Delete!");
        _saveMemesToStorage();
        renderMemes();
    }
    else {
        imgClicked(imgId);
    }
}

function showModal(txt) {
    console.log('hi');
    const elModal = document.querySelector('.modal');
    elModal.querySelector('h2').innerText = txt;
    elModal.style.display = 'block';
    setTimeout(() => {
        closeModal();
    }, 2000);
}

function closeModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
    clearTimeout();
}

// MARK TEXT ON CANVAS
function markText(x, y, rectHeight, rectWidth) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'white';
    gCtx.setLineDash([2]);
    // console.log(rectWidth,rectHeight)
    drawArc(x + rectWidth, y + rectHeight)
    gCtx.strokeRect(x, y, rectWidth, rectHeight);
}

//Default yPosition
function getLinePosIdxBased(lineIdx) {
    //Middle pos
    var pos = { x: 210, y: gCanvas.height / 2 };
    switch (lineIdx) {
        //1st line will be at the top of the canvas-about 50px from start
        case 0:
            // pos.x= 200;
            pos.y = 50;
            break;
        //2nd line will be at the bottom of the canvas-about 30px from end
        case 2:
            // pos.x= 200;
            pos.y = gCanvas.height - 40;
            break;
        //3nd line will be at the bottom of the canvas-about 50px from end
        case 3:
            // pos.x= 200;
            pos.y = gCanvas.height - 70;
            break;
    }
    return pos;
}

function drawArc(x, y, size = 5, color = 'orange') {
    gCtx.beginPath()
    gCtx.arc(x, y, size, 0, 2 * Math.PI)
    gCtx.stroke()
    gCtx.fillStyle = color
    gCtx.fill()
    gCtx.closePath();
}

