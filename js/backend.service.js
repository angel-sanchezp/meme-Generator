
// var gImgs = [{ id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'cat'] }];

const KEY='MemeDB';
var gImgs = createImages();
var gMemeImg;
var gMemes = [];
var gMeme;


function createMeme(imgId) {
    return {
        selectedImg: imgId,
        url:`./imgs/${imgId}.jpg`,
        selectedLineIdx: 0,
        lines: [{
            txt: 'Your Text',
            size: 20,
            fontFamily: 'IMPACT',
            color: 'black',
            pos:null,
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
function getImg() {
    // console.log(gImgs);
    return gMemeImg;
}

function getMemeLines() {
    return gMeme.lines;
}

function CreateImg(id) {
    return {
        id,
        url: `./imgs/${id}.jpg`
    };
}
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
    console.log('hi')
    var memes=loadFromStorage(KEY)
    renderMemes(memes);
}