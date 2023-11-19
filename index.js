let canvas
let lastDrawTime = -1
let fpsCounter
let fps
const size = 32
const w = 10
const h = 20
let map = []
let stableMap = map
let currentBlock
let currentBlockType = 0
const colorPreset = [
    '#eb4034',
    '#eb8934',
    '#ebdb34',
    '#92eb34',
    '#03a9fc',
    '#5534eb',
    '#a834eb'
]
let downCool = 0

const white = '#ffffff'

function forEach(func) {
    for (let i = 0; i < w; i++)
        for (let j = 0; j < h; j++)
            func(i, j)
}

function copyMapToStable() {
    // Deep copy
    stableMap = map.map(v => v.filter(() => true))
}

function resetMap() {
    map = stableMap.map(v => v.filter(() => true))
}

function init() {
    canvas = document.getElementById('canvas')
    fpsCounter = document.getElementById('fps')
    for (let i = 0; i < w; i++)
        map.push([])
    forEach((x, y) => map[x].push(new Cell(x, y, true, white)))
    copyMapToStable()
    setInterval(updateFps, 500)

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
        downCool += gap
        fps = Math.round(1 / gap * 1000)
        lastDrawTime = time
    }
}

function updateFps() {
    fpsCounter.innerText = fps + ' FPS'
}

function renderMap(ctx) {
    forEach((x, y) => {
        ctx.fillStyle = map[x][y].color
        ctx.fillRect(x * size + 1, y * size + 1, size - 1, size - 1)
    })
}

function playGame() {
    if (!currentBlock)
        summonBlock()
    else
        downBlock()
}

function summonBlock() {
    currentBlock = new Block(4, 0, blocks[currentBlockType], colorPreset[currentBlockType])
    currentBlockType++
    if (currentBlockType === blocks.length)
        currentBlockType = 0
    currentBlock.applyMap()
}

function downBlock() {
    if (downCool >= 1000) {
        downCool = 0;

        if (!currentBlock.canGoDown()) {
            currentBlock = null
        } else {
            currentBlock.y += 1
            resetMap()
            currentBlock.applyMap()
        }
    }
}

function draw() {
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false

    playGame()
    clearCanvas(ctx)
    drawGrid(ctx)
    renderMap(ctx)

    calculateFps()
    requestAnimationFrame(draw)
}

document.addEventListener('DOMContentLoaded', init)
