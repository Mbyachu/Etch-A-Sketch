// --- DOM elements ---
const grid = document.getElementById('grid')
const sizeRange = document.getElementById('sizeRange')
const sizeLabel = document.getElementById('sizeLabel')
const colorPicker = document.getElementById('colorPicker')
const clearBtn = document.getElementById('clearBtn')
const toggleDrag = document.getElementById('toggleDrag')

// --- Variables ---
let isMouseDown = false
let currentColor = colorPicker.value
let useDragToDraw = toggleDrag.checked

// --- Functions ---
function buildGrid(size) {
    grid.innerHTML = '' // clear old cells
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')

        // draw events
        cell.addEventListener('mousedown', () => {
            cell.style.backgroundColor = currentColor
        })

        cell.addEventListener('mouseover', () => {
            if (useDragToDraw && isMouseDown) {
                cell.style.backgroundColor = currentColor
            }
        })

        grid.appendChild(cell)
    }
}

// --- Event listeners ---
document.body.addEventListener('mousedown', () => (isMouseDown = true))
document.body.addEventListener('mouseup', () => (isMouseDown = false))

sizeRange.addEventListener('input', () => {
    const size = sizeRange.value
    sizeLabel.textContent = `${size} x ${size}`
    buildGrid(size)
})

colorPicker.addEventListener('input', () => {
    currentColor = colorPicker.value
})

clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.cell').forEach((cell) => {
        cell.style.backgroundColor = 'white'
    })
})

toggleDrag.addEventListener('change', () => {
    useDragToDraw = toggleDrag.checked
})

// --- Initialize default grid ---
buildGrid(16)
