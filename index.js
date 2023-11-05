let canvas
let lastDrawTime = -1
let fpsCounter
const size = 32
const w = 10
const h = 20
const map = []

const white = '#ffffff'

function forEach(func) {
    for (let i = 0; i < w; i++)
        for (let j = 0; j < h; j++)
            func(i, j)
}

function init() {
    canvas = document.getElementById('canvas')
    fpsCounter = document.getElementById('fps')
    for (let i = 0; i < w; i++)
        map.push([])
    forEach((x, y) => map[x].push(new Cell(x, y, true, white)))

    requestAnimationFrame(draw)
}

function drawGrid(ctx) {
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            ctx.beginPath()
            ctx.moveTo(x * size, y * size)
            ctx.lineTo(x * size + size, y * size);
            ctx.lineWidth = 1
            ctx.strokeStyle = '#aeaeae'
            ctx.stroke()
            ctx.moveTo(x * size, y * size)
            ctx.lineTo(x * size, y * size + size);
            ctx.stroke()
        }
    }
}

function clearCanvas(ctx) {
    ctx.clearRect(0, 0, w, h)
}

function calculateFps() {
    const time = performance.now()
    if (lastDrawTime === -1)
        lastDrawTime = time
    else {
        const gap = time - lastDrawTime
        const fps = Math.round(1 / gap * 1000)
        fpsCounter.innerText = fps + ' FPS'
        lastDrawTime = time
    }
}

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

function renderMap(ctx) {
    forEach((x, y) => {
        ctx.fillStyle = map[x][y].color
        ctx.fillRect(x * size + 1, y * size + 1, size - 1, size - 1)
    })
}

function draw() {
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false

    clearCanvas(ctx)
    drawGrid(ctx)
    renderMap(ctx)

    calculateFps()
    requestAnimationFrame(draw)
}

document.addEventListener('DOMContentLoaded', init)
