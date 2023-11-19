class Cell {
    x
    y
    isAir
    color

    constructor(x, y, isAir, color) {
        this.x = x
        this.y = y
        this.isAir = isAir
        this.color = color
    }

    isBottom() {
        if (this.y >= h - 1)
            return true
        else if (!map[this.x][this.y + 1].isAir)
            return true

        return false
    }
}

class Block {
    x
    y
    shape
    rotation
    color

    constructor(x, y, shape, color) {
        this.x = x
        this.y = y
        this.shape = shape
        this.rotation = 0
        this.color = color
    }

    getShape() {
        return this.shape[this.rotation]
    }

    rotate() {
        this.rotation++
        if (this.rotation === this.shape.length)
            this.rotation = 0
    }

    canGoDown() {
        const s = this.getShape()
        const width = s.length - 1
        const height = s[0].length - 1

        for (let i = 0; i <= width; i++) {
            if (s[i][height] === 1) {
                if (map[this.x + i][this.y + height].isBottom())
                    return false
            }
        }

        return true
    }

    applyMap() {
        const s = this.getShape()
        for (let i = 0; i < s.length; i++) {
            for (let j = 0; j < s[0].length; j++) {
                if (s[i][j] === 1) {
                    map[this.x + i][this.y + j] = new Cell(this.x + i, this.y + j, false, this.color)
                }
            }
        }
    }
}