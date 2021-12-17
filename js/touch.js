
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gLine;
var gStartPos;


function isTextClicked(line, clickedPos) {

    var rectHeight = line.size + 10;
    var rectWidth = line.width + 20;

    const { pos } = line;
    var rectX = pos.x;
    var rectY = pos.y;
    var point1 = { x: rectX, y: rectY };
    var point2 = { x: rectWidth + rectX, y: rectY + rectHeight };
    // console.log(rectHeight);
    // console.log(rectWidth);
    // console.log(point1)
    // console.log(point2)
   const distance=  clickedPos.x >= point1.x && clickedPos.x <= point2.x &&
   clickedPos.y >= point1.y && clickedPos.y <= point2.y;
    // const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y- clickedPos.y) ** 2);
    // console.log(`distance ${distance} <= ${line.size}`);
    return distance 


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
    // console.log('ondown-pos', pos);
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