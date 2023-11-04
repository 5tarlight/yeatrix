let canvas
let lastDrawTime = -1
let fpsCounter
const size = 32
const w = 10
const h = 20

function init() {
    canvas = document.getElementById('canvas')
    fpsCounter = document.getElementById('fps')
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

function draw() {
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false

    clearCanvas(ctx)
    drawGrid(ctx)

    calculateFps()
    requestAnimationFrame(draw)
}

document.addEventListener('DOMContentLoaded', init)
