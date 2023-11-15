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
    blocks
    type

    constructor(x, y, type) {
        
    }
}