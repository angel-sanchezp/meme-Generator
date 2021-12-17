
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gLine;
var gStartPos;


function isTextClicked(line, clickedPos) {

    
    const { pos } = line;
    const heigth= line.size+10;
    const width=line.width+40;
    const area=(heigth*width);
    console.log(area)
    // console.log('isClicked', pos);
//    const distance= Math.hypot(clickedPos.x -width, clickedPos.y - heigth); 
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y- clickedPos.y) ** 2);
    console.log(`distance ${distance} <= ${line.size}`);
    return distance <= area;


}


function setTextDrag(line, isDrag) {
    line.isDrag = isDrag;

}

function moveLine(dx, dy) {
    var line = getSelectedLine();
    line.pos.x += dx
    line.pos.y += dy
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}


function onDown(ev) {
    var line = getSelectedLine();
    console.log(line.pos)
    const pos = getEvPos(ev);
    console.log('ondown-pos', pos);
    if (!isTextClicked(line, pos)) return;
    console.log('hi')
    setTextDrag(line, true);
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';

}

function onMove(ev) {
    var line = getSelectedLine();
    console.log(line.isDrag);
    if (!line.isDrag) return;
    const pos = getEvPos(ev)
    console.log('ondown-pos', pos);
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    gStartPos = pos
    renderMeme();
}

function onUp() {
    setTextDrag(false);
    document.body.style.cursor = 'grab';

}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            // x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            // y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}