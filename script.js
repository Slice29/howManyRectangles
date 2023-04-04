// creating objects of all relevant elements of the page
const form = document.getElementById('form1');
const form2 = document.getElementById("form2")
const input1 = document.getElementById("gridInput")
const input2 = document.getElementById("pairs")
const textArea = document.getElementById("textArea");
const numbersDisplay = document.getElementById("numbersDisplay")

const next = document.getElementById("nextButton")
const prev = document.getElementById("prevButton")

const canvas = document.getElementById('canvas');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const ctx = canvas.getContext('2d');

let noRect;
const display = document.getElementById('displayBox');

// global variable declaration
let gridSize;
let nrPuncte;
let pointsArray = [];
let lineWidth;
let lineHeight;

let xSize;
let ySize;
let grid = [];
let pointsMatrix = [];
let rectCounter = 0;
let intArray = []





// function that draws the grid and the points
function desen() {
    ctx.clearRect(0, 0, canvasHeight, canvasWidth);
    pointsMatrix = matrixRepresentation(pointsArray);
    //console.log(pointsMatrix)
    nrPuncte = pointsMatrix.length;
    xSize = parseInt(intArray[0])
    ySize = parseInt(intArray[1]);
    lineWidth = canvasWidth / ySize;
    lineHeight = canvasHeight / xSize;


    //Horizontal lines of the grid
    for (let i = 0; i < xSize; i++) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'grey'
        ctx.beginPath();
        ctx.moveTo(0, lineHeight * i);
        ctx.lineTo(canvasWidth, lineHeight * i);
        ctx.stroke();
    }

    // Vertical lines of the grid
    for (let i = 0; i < ySize; i++) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'grey'
        ctx.beginPath();
        ctx.moveTo(lineWidth * i, 0);
        ctx.lineTo(lineWidth * i, canvasHeight);
        ctx.stroke();
    }


    for (let i = 0; i < pointsMatrix.length; i++) {
        ctx.fillStyle = 'blue'
        ctx.beginPath();
        ctx.arc(pointsMatrix[i][1] * lineWidth, pointsMatrix[i][0] * lineHeight, lineWidth / 10, 0, 2 * Math.PI)
        ctx.fill();
    }
}


// function parses the array to be bi-dimensional array
function matrixRepresentation(array) {
    let matrix = [];
    let index = 0;
    for (let i = 0; i < array.length / 2; i++) {
        matrix[i] = [];
        for (var j = 0; j < 2; j++) {
            matrix[i][j] = (array[index]);
            index++;
        }
    }
    return matrix;

}

// function to extract all numbers from a string
function getNumbersFromString(str) {
    const regex = /\d+/g;
    const matches = str.match(regex); // array of all matches
    return matches.map(Number);
}

// searching for the node, linear O(n) complexity
function cautare(arr, target, start = 0, end = arr.length - 1) {
    let left = start;
    let right = end;
    for (let i = left; i < right; i++) {
        if (arr[i][0] == target[0] && arr[i][1] == target[1])
            return i;
    }
    return false;

}

// function used to display the rectangles
function draw(c1, c2, c3, c4) {
    xSize = parseInt(intArray[0])
    ySize = parseInt(intArray[1]);
    lineWidth = canvasWidth / ySize;
    lineHeight = canvasHeight / xSize;

    // redrawing the grid
    desen();
    // drawing the rectangle
    ctx.strokeStyle = 'red'
    ctx.lineWidth = lineWidth / 15;
    ctx.setLineDash([]);
    ctx.beginPath();
    // flipped coordinates as it was easier for me to work with them this way
    ctx.moveTo(c1[1] * lineWidth, c1[0] * lineHeight);
    ctx.lineTo(c2[1] * lineWidth, c2[0] * lineHeight);
    ctx.lineTo(c3[1] * lineWidth, c3[0] * lineHeight);
    ctx.lineTo(c4[1] * lineWidth, c4[0] * lineHeight);
    ctx.closePath();
    ctx.stroke();
}


// sorting the matrix by the x coordinate, ordering by the y coordinate when
// the x's are equal
function sortArray(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i; j < matrix.length; j++) {
            if (matrix[i][0] > matrix[j][0]) {
                let ajutor = [];
                ajutor[0] = matrix[j][0];
                ajutor[1] = matrix[j][1];

                matrix[j][0] = matrix[i][0];
                matrix[j][1] = matrix[i][1];

                matrix[i][0] = ajutor[0];
                matrix[i][1] = ajutor[1];


            }
            else if (matrix[i][0] == matrix[j][0]) {
                if (matrix[i][1] > matrix[j][1]) {
                    let ajutor = [];
                    ajutor[0] = matrix[j][0];
                    ajutor[1] = matrix[j][1];

                    matrix[j][0] = matrix[i][0];
                    matrix[j][1] = matrix[i][1];

                    matrix[i][0] = ajutor[0];
                    matrix[i][1] = ajutor[1];

                }
            }
        }
    }
    return matrix;
}


let dreptString = [];
let rectangleArray = [];
let p = 0;


// the bread and butter of the algorithm, complexity O(n^3)
function Rectangles(matrix) {
    noRect = 0;
    p = 0;
    // sorting the matrix
    matrix = sortArray(matrix);
    //console.log(matrix)


    //iterating over the matrix to find possible opposite corners of a rectangle 
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i; j < matrix.length; j++) {
            if (matrix[i][0] != matrix[j][0] && matrix[i][1] != matrix[j][1]) {
                // initializing the other two vertices to look for
                let targetNode1 = [matrix[i][0], matrix[j][1]];
                let targetNode2 = [matrix[j][0], matrix[i][1]];
                // searching for the vertices, which we know are in the interval [i,j] because the array is sorted
                if (cautare(matrix, targetNode1, i + 1, j) && cautare(matrix, targetNode2, i + 1, j)) {
                    noRect++;
                    // adding text to the string that is displayed in the text box
                    dreptString[p] = (`Current rectangle: (${matrix[i]}), (${targetNode1}), (${matrix[j]}), (${targetNode2})`)
                    // saving the rectangle to an array
                    rectangleArray[p] = [matrix[i], targetNode1, matrix[j], targetNode2];
                    p++;
                }


            }
        }
    }
    if (noRect !== 0)
        draw(...rectangleArray[0]);

    // displaying the text about the number of found rectangles

    if (noRect === 0)
        numbersDisplay.innerHTML = 'no rectangles found';
    else if (noRect === 1) {
        numbersDisplay.innerHTML = '1 rectangle found'
        textArea.value = dreptString[0];
    }
    else {
        numbersDisplay.innerHTML = `${noRect} rectangles found`
        textArea.value = dreptString[0];
    }
    console.log(noRect + " rectangles");
}




// event listener for the first button
form1.addEventListener('submit', (event) => {
    event.preventDefault();

    gridSize = input1.value;

    // parsing the grid size
    intArray = gridSize.split(',');


    // extracting the points from the second input
    let points = input2.value;
    pointsArray = getNumbersFromString(points);
    desen();




});


// event listener for the 'Look for rectangles!' button
form2.addEventListener('submit', (event) => {
    textArea.value = '';
    rectCounter = 0;
    event.preventDefault();
    if (rectangleArray.length > 0)
        rectangleArray = Array(rectangleArray.length).fill(null)
    Rectangles(pointsMatrix);
    //console.log(rectangleArray.length);
})



// event listener for the next button
next.addEventListener("click", () => {
    if (noRect > 0) {
        rectCounter++;
        console.log(rectCounter)
        if (rectCounter < rectangleArray.length) {
            draw(...rectangleArray[rectCounter])
            textArea.value = dreptString[rectCounter];
        }
        else if (rectCounter >= rectangleArray.length) {
            rectCounter = 0;
            console.log(rectCounter)
            draw(...rectangleArray[rectCounter])
            textArea.value = dreptString[rectCounter];
        }
    }

})





