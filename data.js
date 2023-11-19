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

    constructor(x, y, shape) {
        this.x = x
        this.y = y
        this.shape = shape
        this.rotation = 0
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
}