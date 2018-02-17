//create the grid
const screen = document.querySelector('.screen');
var side = 256;
var squaresPerSide = 16;


function createGrid() {
    screen.style.cssText = 'grid-template-columns: repeat(' + squaresPerSide + ', 1fr); grid-template-rows: repeat(' + squaresPerSide + ',1fr)';
    for (let i = 0; i < side; i++) {
        var square = document.createElement('div');
        square.classList.add('white');
        screen.appendChild(square);
    }
}

createGrid();
makeItBlack();

function createNewGrid() {
    var lastGrid = document.querySelector('.screen');
    while (lastGrid.firstChild) {
        lastGrid.firstChild.remove();
    }
    createGrid();
    if (currentColorChoice === 'blackOrWhite') {
        makeItBlack();
    } else if (currentColorChoice === 'colorDarker') {
        makeTheColorDarker();
    }
    else makeItRainbow();
}

function askSquaresPerSide() {
    let squaresPerSide;
    while (squaresPerSide == undefined || squaresPerSide < 1 || squaresPerSide > 128 || (isNaN(squaresPerSide))) {
        squaresPerSide = prompt("Enter a number between 1 and 128 to specify pixels per side");
        if (squaresPerSide == null) return;
    }
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (button.id == 'rainbow') {
            makeItRainbow();
        } else if (button.id == 'blackAndWhite') {
            makeItBlack();
        } else if (button.id == 'colorDarker') {
            makeTheColorDarker();
        } else if (button.id == 'newGrid') {
            askSquaresPerSide();
            side = squaresPerSide * squaresPerSide;
            createNewGrid();
        }
    })
})

function makeItBlack() {
    var cellsToChangeColor = document.querySelectorAll('.white');
    for (let j = 0; j < cellsToChangeColor.length; j++) {
        cellsToChangeColor[j].addEventListener('mouseover', function (e) {
            e.target.removeAttribute('style');
            e.target.classList.toggle('black');
            return currentColorChoice = 'blackOrWhite';
        });
    }
}

function makeItRainbow() {
    var cellsToChangeColor = document.querySelectorAll('.white');
    for (let j = 0; j < cellsToChangeColor.length; j++) {
        cellsToChangeColor[j].addEventListener('mouseover', function (e) {
            newColor = getRandomColor();
            e.target.style.backgroundColor = newColor;
            return currentColorChoice = 'rainbow';
        });
    }
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}