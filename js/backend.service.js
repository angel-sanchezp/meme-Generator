
// var gImgs = [{ id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'cat'] }];

const KEY='MemeDB';
var gImgs = createImages();
// var gStickers=createStickers();
var gMemeImg;
var gMemes = [];
var gMeme;

function createMeme(imgId) {
    return {
        selectedImg: imgId,
        url:`./imgs/${imgId}.jpg`,
        selectedLineIdx: 0,
        selectedStikerIdx:0,
        lines: [{
            txt: 'Your Text',
            size: 20,
            fontFamily: 'IMPACT',
            color: 'black',
            pos:null,
            width: null,
            isDrag:false
        }
        ]
        
    }
}

function getMeme() {
    return gMeme;
}

function getImgs() {
    // console.log(gImgs);
    return gImgs;
}

function getMemeStickers(index){
    return gMeme.lines[index];
}
function getImg() {
    // console.log(gImgs);
    return gMemeImg;
}

function getMemeLines() {
    return gMeme.lines;
}

function CreateImg(id) {
   switch(id){

    case 1:return{
        id,
        url: `./imgs/${id}.jpg`,
        keywords: ['funny', 'politics'] 
    }
    case 2:return{
        id,
        url: `./imgs/${id}.jpg`,
        keywords:  ['pets'] 
    }
    case 3:return{
        id,
        url: `./imgs/${id}.jpg`,
        keywords: ['babys', 'pets'] 
    }
    case 4:return{
        id,
        url: `./imgs/${id}.jpg`,
        keywords:  ['pets'] 
    }
    case 5:return{
        id,
        url: `./imgs/${id}.jpg`,
        keywords:  ['babys','funny'] 
    }
    case 6:return{
        id,
        url: `./imgs/${id}.jpg`,
        keywords:  ['another'] 
    }
    case 7:return{
        id,
        url: `./imgs/${id}.jpg`,
        keywords:  ['babys','funny'] 
    }
    case 8:return{
        id,
        url: `./imgs/${id}.jpg`,
        keywords:  ['another'] 
    }
    case 9:return{
        id,
        url: `./imgs/${id}.jpg`,
        keywords:  ['babys','funny'] 
    }
    case 10:return{
        id,
        url: `./imgs/${id}.jpg`,
        keywords:  ['politics','funny'] 
    }
    case 11:return{
        id,
        url: `./imgs/${id}.jpg`,
        keywords:  ['another'] 
    }
    case 12:return{
        id,
        url: `./imgs/${id}.jpg`,
        keywords:['another']
    }
    case 13:return{
        id,
        url: `./imgs/${id}.jpg`,
        keywords:  ['famous'] 
    }
    case 14:return{
        id,
        url: `./imgs/${id}.jpg`,
        keywords:  ['famous'] 
    }
    case 15:return{
        id,
        url: `./imgs/${id}.jpg`,
        keywords:  ['another'] 
    }
    case 16:return{
        id,
        url: `./imgs/${id}.jpg`,
        keywords:  ['famous'] 
    }
    case 17:return{
        id,
        url: `./imgs/${id}.jpg`,
        keywords:  ['politics'] 
    }
    case 18:return{
        id,
        url: `./imgs/${id}.jpg`,
        keywords:  ['funny'] 
    }
   }
    
}
// start to render sticker
// function createSticker(id){
//     return{
//         id,
//         url:`./stickers/${id}.png`
//     };
// }

// function createStickers(){
//     var stickers=[];
//     for(var i=1;i<=3;i++){
//         var newSticker=createSticker(i);
//         stickers.push(newSticker);
//     }

//     return stickers;
// }
function createImages() {
    var imgs = [];
    for (var i = 1; i <= 18; i++) {
        var newImg = CreateImg(i);
        imgs.push(newImg);
    }

    return imgs;
}

function doMeme(imgId) {
    var selectedImg = gImgs.find(img => img.id === imgId);
    gMemeImg = selectedImg;
    var newMeme = createMeme(imgId);
    // gMemes.push(newMeme);
    gMeme = newMeme;

}

function _saveMemesToStorage() {
    saveToStorage(KEY, gMemes)
}

function loadMemes(){
    // console.log('hi')
    var memes=loadFromStorage(KEY)
    console.log(memes);
    renderMemes(memes);
}