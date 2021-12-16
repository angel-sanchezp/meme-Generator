
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gLine;
var gStartPos;


function isTextClicked(line, clickedPos) {
    // console.log(line,clickedPos);
    if (!line || !line.posY && !line.posX) return;

    // var rectHeight = line.size + 10;
    // var rectWidth = line.width + 20;

    var rectX = line.posX;
    var rectY = line.posY;

    var point1 = { x: rectX, y: rectY };
    // var point2 = { x: rectWidth + rectX, y: rectY + rectHeight };
    // console.log(point2)
    // var isTouched = clickedPos.x >= point1.x && clickedPos.x <= point2.x &&
    //     clickedPos.y >= point1.y && clickedPos.y <= point2.y;
    console.log(clickedPos.x,clickedPos.y)
    console.log(point1.x,point1.y)
    var isTouched = clickedPos.x >= point1.x && clickedPos.y >= point1.y;
    console.log(isTouched)


    return isTouched;
}


function setTextDrag(selectedLine, isDrag) {
    if (!selectedLine) return;
    selectedLine.isDrag = isDrag;
    if (isDrag) gLine = selectedLine;

}

function moveLine(dx, dy) {
    gLine.pos.x += dx
    gLine.pos.y += dy
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
    gCanvas.addEventListener('touchmove', onMove, event)
    gCanvas.addEventListener('touchstart', onDown, event)
    gCanvas.addEventListener('touchend', onUp)
}


function onDown(ev) {
    var lines = getMemeLines();
    const pos = getEvPos(ev);
    var touchedLine = lines.find(line => isTextClicked(line, pos));
    console.log(touchedLine)

    if (!touchedLine) {
        selectLine(-1);
        renderMeme();
        return;
    }
    var lineIdx = lines.findIndex(line => line.pos === touchedLine.pos);
    setTextDrag(touchedLine, true)
    selectLine(lineIdx);
    gLine = getSelectedLine();
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
    renderMeme();

}

function onMove(ev) {
    var lines = getMemeLines();
    // console.log(lines)
    const pos = getEvPos(ev)
    // console.log(pos)

    var touchedLine = lines.find(line => isTextClicked(line, pos));
    console.log(touchedLine)

    if (!touchedLine) {
        document.body.style.cursor = 'default';
        return;
    }

    document.body.style.cursor = 'grab';
    console.log(gLine,gLine.isDrag)
    if (gLine && gLine.isDrag) {
        const pos = getEvPos(ev)
        console.log(pos)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy)
        gStartPos = pos
        renderMeme();
    }
}

function onUp() {
    setTextDrag(gLine, false);
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
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}