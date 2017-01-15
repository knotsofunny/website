function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.wall = true;
    this.visited = false;

    this.floorMax = 85;
    this.floorMin = 78;
    this.wallMax = 25;
    this.wallMin = 30;

    this.floorColor = [floor(Math.random() * (this.floorMax - this.floorMin) + this.floorMin),
        floor(Math.random() * (this.floorMax - this.floorMin) + this.floorMin),
        floor(Math.random() * (this.floorMax - this.floorMin) + this.floorMin)
    ];

    this.wallColor = [floor(Math.random() * (this.wallMax - this.wallMin) + this.wallMin),
        floor(Math.random() * (this.wallMax - this.wallMin) + this.wallMin),
        floor(Math.random() * (this.wallMax - this.wallMin) + this.wallMin)
    ];

    this.getRandomNeighbor = function() {
        var neighbor = [];

        var top = grid[index(i, j - wallThickness)];
        var right = grid[index(i + wallThickness, j)];
        var bottom = grid[index(i, j + wallThickness)];
        var left = grid[index(i - wallThickness, j)];

        if (top && !top.visited) {
            neighbor.push(top);
        }
        if (right && !right.visited) {
            neighbor.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbor.push(bottom);
        }
        if (left && !left.visited) {
            neighbor.push(left);
        }
        if (neighbor.length > 0) {
            var r = floor(random(0, neighbor.length));
            return neighbor[r];
        } else {
            return undefined;
        }

    }

    this.getNeighbors = function() {
        var neighbor = [];
        var temp = [grid[index(i, j - 1)],
            grid[index(i + 1, j)],
            grid[index(i, j + 1)],
            grid[index(i - 1, j)],
            grid[index(i + 1, j - 1)],
            grid[index(i + 1, j + 1)],
            grid[index(i - 1, j + 1)],
            grid[index(i - 1, j - 1)]
        ];

        for (var a = 0; a < temp.length; a += 1) {
            if (temp[a]) {
                neighbor.push(temp[a]);
            }
        }
        if (neighbor.length > 0) {
            return neighbor;
        } else {
            return undefined;
        }
    }

    //  fill(floor(Math.random(20, 40)), floor(Math.random(20, 40)), floor(Math.random(20, 40)));
    this.show = function() {
        var x = this.i * w;
        var y = this.j * w;

        if (this.wall) {
            fill(this.wallColor[0], this.wallColor[1], this.wallColor[2]);

        } else {
            //  fill(84, 84, 84);
            fill(this.floorColor[0], this.floorColor[1], this.floorColor[2]);
        }
        noStroke();
        rect(x, y, w, w);
    }

    this.highlight = function() {
        var x = this.i * w;
        var y = this.j * w;
        noStroke();
        fill(0, 255, 0);
        rect(x, y, w, w);

    }

}
