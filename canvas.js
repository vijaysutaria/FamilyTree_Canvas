
var canvas = document.getElementById('familytree');
var ctx = canvas.getContext('2d');
ctx.font = "Arial";
ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
var boxSizeX = 80;
var boxSizeY = 10;
var deltaXText = 4;
var deltaYText = 8;
var startX = 5;
var startY = 5;
var verticalSpacing=10;
var horizontalSpacing=10;

var windowWidth = canvas.width;
var windowHeight = canvas.height;

console.log(windowWidth);
console.log(windowHeight);

var json = {
    name: 'Test1',
    sibling: [{
        name: 'Test1-Wife',
        relation: 'Spouse'
    }],
    child: [{
        name: 'Test1-Child1',
        sibling: [{
            name: 'Test1-Child1-Wife',
            relation: 'Spouse'
        }],
        child: [{
            name: 'Test1-Child1-Child1'
        }]
    }, {
        name: 'Test1-Child2',
        sibling: [{
            name: 'Test1-Child2-Wife',
            relation: 'Spouse'
        }],
        child: [{
            name: 'Test1-Child2-Child1'
        }]
    }]

}


function drawRect(x, y, text) {
    ctx.fillText(text, x + deltaXText, y + deltaYText);
    ctx.fillRect(x, y, boxSizeX, boxSizeY);
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
}

///Draw all Siblings
function drawSiblings(siblings, x, y) {
    if (siblings && siblings.length > 0) {
        for (var s in siblings) {
            var sibling = siblings[s];
            //x += boxSizeX + 10;
            //startY += boxSizeY;
            drawLine(x + boxSizeX, y, boxSizeX + 15, y);
            x += boxSizeX + horizontalSpacing;

            drawRect(x, y, sibling.name);

        }
    }
}

/// Draw all Childrens
function drawChildrens(childrens, x, y) {
    if (childrens && childrens.length > 0) {
        y = y + verticalSpacing;
        y += boxSizeY;
        for (var s in childrens) {
            var child = childrens[s];
            drawRect(x, y, child.name);
            drawSiblings(child.sibling, x, y);
            drawChildrens(child.child, x, y);

            x += boxSizeX + (boxSizeX * (child.sibling && child.sibling.length > 0 ? child.sibling.length : 1)) + 20;
        }
    }
}

//Root
drawRect(startX, startY, json.name);
drawSiblings(json.sibling, startX, startY);
drawChildrens(json.child, startX, startY);