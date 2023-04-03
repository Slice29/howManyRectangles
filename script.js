const form = document.getElementById('form1');
const form2 = document.getElementById("form2")
const input1 = document.getElementById("gridInput")
const input2 = document.getElementById("pairs")


const next = document.getElementById("nextButton")
const prev = document.getElementById("prevButton")

const canvas = document.getElementById('canvas');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const ctx = canvas.getContext('2d');


const display = document.getElementById('displayBox');

let gridSize;

let pointsArray = [];
let lineWidth;
let lineHeight;

let xSize;
let ySize;
let grid = [];



function matrixRepresentation(array) {
    let matrix = [];
    let index = 0;
    for (let i = 0; i < array.length / 2; i++) {
        matrix[i] = [];
        for (var j = 0; j < 2; j++) {
            matrix[i][j] = parseInt(array[index]);
            index++;
        }
    }
    return matrix;

}

let pointsMatrix = [];


form1.addEventListener('submit', (event) => {
    event.preventDefault();
    ctx.clearRect(0, 0, canvasHeight, canvasWidth);

    gridSize = input1.value;

    let intArray = gridSize.split(',');



    let points = input2.value;

    let k = 0;
    for (let i = 0; i <= points.length; i++) {
        if (points[i] == parseInt(points[i])) {
            pointsArray[k] = points[i]
            k++;
        }

    }
    // console.log(pointsArray)

    pointsMatrix = matrixRepresentation(pointsArray);

    nrPuncte = pointsMatrix.length;

    // console.log(pointsMatrix.length);
    xSize = parseInt(intArray[0])
    ySize = parseInt(intArray[1]);
    lineWidth = canvasWidth / ySize;
    lineHeight = canvasHeight / xSize;


    //Horizontal lines of the grid
    for (let i = 0; i < xSize; i++) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'grey'
        //ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.moveTo(0, lineHeight * i);
        ctx.lineTo(canvasWidth, lineHeight * i);
        ctx.stroke();
    }

    for (let i = 0; i < ySize; i++) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'grey'
        // ctx.setLineDash([2, 2]);
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

});







let rectCounter = 0;

next.addEventListener("click", () => {
    rectCounter++;
    if (rectCounter < rectangleArray.length) {
        sterge(...rectangleArray[rectCounter - 1])
        draw(...rectangleArray[rectCounter])

    }
    else {
        sterge(...rectangleArray[rectangleArray.length - 1])
        rectCounter = 0;
        draw(...rectangleArray[rectCounter])

    }

    console.log(rectCounter)


})


prev.addEventListener("click", () => {
    rectCounter--;
    if (rectCounter == rectangleArray.length) {
        sterge(...rectangleArray[rectangleArray.length - 1])
        rectCounter = 0;
        draw(...rectangleArray[rectCounter])

    }
    else if (rectCounter <= 0) {
        sterge(...rectangleArray[rectangleArray.length - 1])
        rectCounter = rectangleArray.length;
        draw(...rectangleArray[rectCounter - 1])

    }
    else {
        sterge(...rectangleArray[rectCounter - 1])
        draw(...rectangleArray[rectCounter])
    }


    console.log(rectCounter)

})



function binaryInsertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let left = 0;
        let right = i - 1;
        const key = arr[i];
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid][0] > key[0]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        for (let j = i - 1; j >= left; j--) {
            arr[j + 1] = arr[j];
        }
        arr[left] = key;
    }
    return arr;
}



function binarySearch(arr, start, end, target) {
    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        if (arr[mid][0] < target[0]) {
            start = mid + 1;
        } else if (arr[mid][0] > target[0]) {
            end = mid - 1;
        } else if (arr[mid][1] < target[1]) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return start;
}



function cautare(arr, target, start = 0, end = arr.length - 1) {
    let left = start;
    let right = end;
    for (let i = left; i < right; i++) {
        if (arr[i][0] == target[0] && arr[i][1] == target[1])
            return i;
    }
    return false;

}




function sterge(c1, c2, c3, c4) {
    console.log("Astea sterg:" + c1, c2, c3, c4);
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = lineWidth / 30 + 2;
    ctx.beginPath();
    ctx.strokeRect(c1[0] * lineWidth, c1[1] * lineHeight, (c2[1] - c1[1]) * lineWidth, (c4[0] - c2[0]) * lineHeight)
    console.log(c1[0] * lineWidth, c1[1] * lineHeight, (c2[1] - c1[1]) * lineWidth, (c4[0] - c2[0]) * lineHeight);



    ctx.strokeStyle = 'grey'
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.strokeRect(c1[0] * lineWidth, c1[1] * lineHeight, (c2[1] - c1[1]) * lineWidth, (c4[0] - c2[0]) * lineHeight)

    // ctx.beginPath();
    // ctx.moveTo(c1[1] * lineWidth, c1[0] * lineHeight);
    // ctx.lineTo(c2[1] * lineWidth, c2[0] * lineHeight);
    // ctx.lineTo(c3[1] * lineWidth, c3[0] * lineHeight);
    // ctx.lineTo(c4[1] * lineWidth, c4[0] * lineHeight);
    // ctx.closePath();
    // ctx.stroke();


    for (let i = 0; i < nrPuncte; i++) {
        ctx.fillStyle = 'blue'
        ctx.beginPath();
        ctx.arc(pointsMatrix[i][1] * lineWidth, pointsMatrix[i][0] * lineHeight, lineWidth / 10, 0, 2 * Math.PI)
        ctx.fill();
    }


}


function draw(c1, c2, c3, c4) {
    console.log("Astea desenez " + c1, c2, c3, c4)
    ctx.strokeStyle = 'black'
    ctx.lineWidth = lineWidth / 30;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(c1[1] * lineWidth, c1[0] * lineHeight);
    ctx.lineTo(c2[1] * lineWidth, c2[0] * lineHeight);
    ctx.lineTo(c3[1] * lineWidth, c3[0] * lineHeight);
    ctx.lineTo(c4[1] * lineWidth, c4[0] * lineHeight);
    ctx.closePath();
    ctx.stroke();





}



function sortArray(arr) {
    for (let i = 1; i < arr.length; i++) {
        const curr = arr[i];
        const index = binaryInsertionSort(arr, 0, i - 1, curr);
        arr.splice(index, 0, curr);
        arr.splice(i + 1, 1);
    }

    return arr;
}



let rectangleArray = [];
let p = 0;

function Rectangles(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i; j < matrix.length; j++) {
            if (matrix[i][0] > matrix[j][0]) {
                matrix.splice(i, 0, j);
                matrix.splice(i + 1, 1);
            }


            else if (matrix[i][0] == matrix[j][0]) {
                if (matrix[i][1] > matrix[j][1])
                    matrix.splice(i, 0, j);
                matrix.splice(i + 1, 1);
            }
        }
    }
    //sortArray(matrix);
    console.log(matrix)
    let noRect = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i; j < matrix.length; j++) {
            if (matrix[i][0] != matrix[j][0] && matrix[i][1] != matrix[j][1]) {
                let targetNode1 = [matrix[i][0], matrix[j][1]];
                let targetNode2 = [matrix[j][0], matrix[i][1]];
                if (cautare(matrix, targetNode1) > i && cautare(matrix, targetNode2) > i) {
                    noRect++;
                    console.log(`Colturile dreptunghiului ${noRect} sunt : ${matrix[i]} ${targetNode1} ${matrix[j]}  ${targetNode2}`)
                    rectangleArray[p] = [matrix[i], targetNode1, matrix[j], targetNode2];
                    p++;

                }


            }
        }
    }


    // for (let i = 0; i < p; i++) draw(...rectangleArray[i]);
    draw(...rectangleArray[0]);
    if (noRect === 0)
        display.value = 'no rectangles found';
    else if (noRect === 1) display.value = '1 rectangle found'
    else {
        display.value = `${noRect} rectangles`
    }
    console.log(noRect);
}


let nrPuncte;





form2.addEventListener('submit', (event) => {

    event.preventDefault();

    let pointsMatrix = matrixRepresentation(pointsArray);
    Rectangles(pointsMatrix);


})

