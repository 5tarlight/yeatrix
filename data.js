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
        // BUG : THIS DOES NOT WORK WELL AS INTENDED!
        const s = this.getShape()
        const height = s.length - 1
        let isBottom = false
        s[height].forEach(c => {
            if (isBottom || c === 0)
                return

            if (this.y + height >= h)
                isBottom = true
            else {
                for (let i = 0; i < s[0].length; i++) {
                    if (!map[this.x + i][this.y + height].isAir) {
                        isBottom = true
                        break
                    }
                }
            }
        })

        return isBottom
    }

    applyMap() {
        const s = this.getShape()
        for (let i = 0; i < s.length; i++) {
            for (let j = 0; j < s[0].length; j++) {
                if (s[i][j] === 1) {
                    map[this.x + i][this.y + j] = new Cell(this.x + i, this.y + j, false, this.color)
                    console.log(this.x + i, this.y + j, this.color)
                }
            }
        }
    }
}