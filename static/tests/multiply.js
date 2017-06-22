Utilities = {
    lerp: function(value, min, max)
    {
        return min + (max - min) * value;
    },
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Used when the point object is used as a size object.
    get width()
    {
        return this.x;
    }

    // Used when the point object is used as a size object.
    get height()
    {
        return this.y;
    }

/*
    // Used when the point object is used as a size object.
    get center()
    {
        return new Point(this.x / 2, this.y / 2);
    },

    str: function()
    {
        return "x = " + this.x + ", y = " + this.y;
    },

    add: function(other)
    {
        if(isNaN(other.x))
            return new Point(this.x + other, this.y + other);
        return new Point(this.x + other.x, this.y + other.y);
    },
*/

    subtract(other) {
        if(isNaN(other.x))
            return new Point(this.x - other, this.y - other);
        return new Point(this.x - other.x, this.y - other.y);
    }

    multiply(other) {
        if(isNaN(other.x))
            return new Point(this.x * other, this.y * other);
        return new Point(this.x * other.x, this.y * other.y);
    }

/*
    move: function(angle, velocity, timeDelta)
    {
        return this.add(Point.pointOnCircle(angle, velocity * (timeDelta / 1000)));
    },
*/

    length() {
        return Math.sqrt( this.x * this.x + this.y * this.y );
    }

/*
    normalize: function() {
        var l = Math.sqrt( this.x * this.x + this.y * this.y );
        this.x /= l;
        this.y /= l;
        return this;
    }*/
}

class Test {
    init(stageWidth, stageHeight) {
        const itemCount = 25;
        this.size = new Point(stageWidth, stageHeight);
        this.tiles = [];

        var tileSize = Math.round(this.size.height / itemCount);

        // Fill the scene with elements
        var x = Math.round((this.size.width - tileSize) / 2);
        var y = Math.round((this.size.height - tileSize) / 2);
        var tileStride = tileSize;
        var direction = 0;
        var spiralCounter = 2;
        var nextIndex = 1;
        var maxSide = Math.floor(y / tileStride) * 2 + 1;
        this._centerSpiralCount = maxSide * maxSide;
        for (var i = 0; i < this._centerSpiralCount; ++i) {
            this._addTile(x, y, tileSize, randomInt(0, 359));

            if (i == nextIndex) {
                direction = (direction + 1) % 4;
                spiralCounter++;
                nextIndex += spiralCounter >> 1;
            }
            if (direction == 0)
                x += tileStride;
            else if (direction == 1)
                y -= tileStride;
            else if (direction == 2)
                x -= tileStride;
            else
                y += tileStride;
        }

        this._sidePanelCount = maxSide * Math.floor((this.size.width - x) / tileStride) * 2;
        for (var i = 0; i < this._sidePanelCount; ++i) {
            var sideX = x + Math.floor(Math.floor(i / maxSide) / 2) * tileStride;
            var sideY = y - tileStride * (i % maxSide);

            if (Math.floor(i / maxSide) % 2 == 1)
                sideX = this.size.width - sideX - tileSize + 1;
            this._addTile(sideX, sideY, tileSize, randomInt(0, 359));
        }

        this._offsetIndex = this.tiles.length;
        this._distanceFactor = 1.5 * (1 - 0.5 * Math.max(this._offsetIndex - this._centerSpiralCount, 0) / this._sidePanelCount) / Math.sqrt(this._offsetIndex);
    }

    update(t) {
        var progress = t % 10000 / 10000;
        var bounceProgress = Math.sin(2 * Math.abs( 0.5 - progress));
        var l = Utilities.lerp(bounceProgress, 20, 50);
        var hslPrefix = "hsla(" + Utilities.lerp(progress, 0, 360) + ",100%,";

        for (var i = 0; i < this._offsetIndex; ++i) {
            var tile = this.tiles[i];
            tile.active = true;
            tile.element.style.visibility = "";
            tile.rotate += tile.step;
            tile.element.style.transform = "rotate(" + tile.rotate + "deg)";

            var influence = Math.max(.01, 1 - (tile.distance * this._distanceFactor));
            tile.element.style.backgroundColor = hslPrefix + l * Math.tan(influence / 1.25) + "%," + influence + ")";
        }

        for (var i = this._offsetIndex; i < this.tiles.length && this.tiles[i].active; ++i) {
            this.tiles[i].active = false;
            this.tiles[i].element.style.visibility = "hidden";
        }
    }

    deinit() {
    }

    _addTile(x, y, tileSize, rotateDeg) {
        var tile = addDiv({ class: "div-" + randomInt(0,6) });
        var halfTileSize = tileSize / 2;
        tile.style.left = x + 'px';
        tile.style.top = y + 'px';
        tile.style.width = tileSize + 'px';
        tile.style.height = tileSize + 'px';
        tile.style.visibility = "hidden";

        var distance = 1 / tileSize * this.size.multiply(0.5).subtract(new Point(x + halfTileSize, y + halfTileSize)).length();
        this.tiles.push({
            element: tile,
            rotate: rotateDeg,
            step: Math.max(3, distance / 1.5),
            distance: distance,
            active: false
        });
    }
}
