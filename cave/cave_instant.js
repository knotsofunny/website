var cols, rows;
var grid = [];

var current;
var mid;

var stack = [];

var prob = 0.65; //Probability of a cell to be converted
var w = 9;
var wallLimit = 4;
var wallThickness = 3;
var cavyness = 0.01;
var smoothness = 15;
var fps = 25;
var count = 0;

function setup() {
    createCanvas(1500, 900);
    cols = floor(width / w);
    rows = floor(height / w);

    frameRate(fps);

    for (var j = 0; j < rows; j += 1) {
        for (var i = 0; i < cols; i += 1) {
            grid.push(new Cell(i, j));
        }
    }


    current = grid[index(1, 1)];
    current.visited = true;
    current.wall = false;


    createMaze();
    randomizeMaze();
    for (var i = 0; i < smoothness; i += 1) {
        createRooms();
        randomizeMaze();
    }
    prob = 0.95;
    createRooms();
    createRooms();


}



function draw() {
    //  background(50);

    for (var i = 0; i < grid.length; i += 1) {
        grid[i].show();
    }
    //  if (count < smoothness) {
    //      createRooms();
    //      count += 1;
    //  }


}

function randomizeMaze() {
    for (var j = 1; j < rows - wallThickness; j += 1) {
        for (var i = 2; i < cols - wallThickness; i += 1) {
            if (Math.random() < cavyness) {
                grid[index(i, j)].wall = false;
            }
        }
    }
}

function createRooms() {
    var wallCount = 0;
    var wallList = [];
    for (var i = 1; i < cols - 2; i += 1) {
        for (var j = 1; j < rows - 2; j += 1) {
            wallList = grid[index(i, j)].getNeighbors();
            for (var k = 0; k < wallList.length; k += 1) {
                if (wallList[k].wall) {
                    wallCount += 1;
                }
            }
            var tempProb = prob;
            if (i < 4 || i > cols - 4 || j < 4 || j > rows - 4) {
                tempProb /= 2;
            }
            if (Math.random() < tempProb) {
                if (wallCount < wallLimit) {
                    grid[index(i, j)].wall = false;
                } else if (wallCount > wallLimit && grid[index(i, j)].visited == false) {
                    grid[index(i, j)].wall = true;
                }
                wallCount = 0;
            }
        }
    }
}


function createMaze() {
    var next = current.getRandomNeighbor();
    while (next || stack.length > 0) {
        if (current != grid[index(1, 1)]) {
            current.highlight();
        }
        if (next) {
            stack.push(current);
            next.visited = true;

            if (current.i - next.i < 0) { //WORKS
                for (var i = current.i; i < next.i; i += 1) {
                    grid[index(i, current.j)].wall = false;
                    grid[index(i, current.j)].visited = true;
                }
            } else if (current.i - next.i > 0) { //DOESNT WORK
                for (var i = next.i; i < current.i; i += 1) {
                    grid[index(i, current.j)].wall = false;
                    grid[index(i, current.j)].visited = true;
                }
            } else if (current.j - next.j > 0) { //DOESNT WORK
                for (var j = current.j; j > next.j; j -= 1) {
                    grid[index(current.i, j)].wall = false;
                    grid[index(current.i, j)].visited = true;
                }
            } else if (current.j - next.j < 0) { //WORKS
                for (var j = next.j; j > current.j; j -= 1) {
                    grid[index(current.i, j)].wall = false;
                    grid[index(current.i, j)].visited = true;
                }
            }


            //  mid = grid[index((current.i + next.i) / 2, (current.j + next.j) / 2)]

            current = next;
            current.wall = false;




            //  mid.wall = false;


        } else if (stack.length > 0) {
            current = stack.pop();
        }
        next = current.getRandomNeighbor();
    }
}

function index(i, j) {
    if (i < 1 || j < 1 || i > cols - 2 || j > rows - 2) {
        return -1;
    }
    return i + j * cols;
}
