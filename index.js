// naming dom elements

const header = document.querySelector(".header")
const colorToGuess = document.querySelector(".color_guess")
const resetColor = document.querySelector(".reset")
const cheers = document.querySelector(".cheers")
const palette = document.querySelector("#palette")
const easy = document.querySelector(".difficulty li:nth-child(1)")
const medium = document.querySelector(".difficulty li:nth-child(2)")
const hard = document.querySelector(".difficulty li:nth-child(3)")
const colorPalette = document.querySelectorAll(".color_palette")
const normalPalette = document.querySelector("#normal_palette ul")
const hardPalette = document.querySelector("#hard_palette ul")

// random color generator

const generateRGB = () => {
    redRate = Math.floor(Math.random() * 256)
    greenRate = Math.floor(Math.random() * 256)
    blueRate = Math.floor(Math.random() * 256)
}

const pickColor = (domElement) => {  
    generateRGB()
    domElement.innerHTML = "rgb(" + redRate + ", " + greenRate + ", " + blueRate + ")"
}

const pickPaletteColor = (paletteSquare) => {
    generateRGB()
    paletteSquare.style.background = "rgb(" + redRate + ", " + greenRate + ", " + blueRate + ")"
}

// randomize color on the palette

const generatePalette = () => {
    colorPalette.forEach((e) => {
        pickPaletteColor(e)        
    })

    if (easy.classList.value === "active") {
        // pick a random number
        randomNumber = Math.floor(Math.random() * 3)
        // insert the good answer in the [random number] index of the array
        colorPalette[randomNumber].style.background = colorToGuess.innerHTML
    } else if (medium.classList.value === "active") {
        randomNumber = Math.floor(Math.random() * 6)
        colorPalette[randomNumber].style.background = colorToGuess.innerHTML
    } else if (hard.classList.value === "active") {
        randomNumber = Math.floor(Math.random() * 9)
        colorPalette[randomNumber].style.background = colorToGuess.innerHTML
    }
}

// displaying palette according to difficulty

const onEasyClick = () => {
    if (easy.classList.value !== "active") {
        easy.classList.add("active")
        medium.classList.remove("active")
        hard.classList.remove("active")
        normalPalette.style.display = "none"
        hardPalette.style.display = "none"
        onResetClick()
    }
}

const onMediumClick = () => {
    if (medium.classList.value !== "active") {
        medium.classList.add("active")
        easy.classList.remove("active")
        hard.classList.remove("active")
        normalPalette.style.display = "flex"
        hardPalette.style.display = "none"
        onResetClick()
    }
}

const onHardClick = () => {
    if (hard.classList.value !== "active") {
        hard.classList.add("active")
        medium.classList.remove("active")
        easy.classList.remove("active")
        normalPalette.style.display = "flex"
        hardPalette.style.display = "flex"
        onResetClick()
    }
}

const onResetClick = () => {
    pickColor(colorToGuess)
    generatePalette()
    cheers.innerHTML = ""
    resetColor.innerHTML = "autre couleurs"
    if (header.style.background !== "rgb(125, 196, 250)") {
        header.style.background = "rgb(125, 196, 250)"
    }
}

colorPalette.forEach((e) => {
    e.addEventListener("click", () => {
        if (e.style.background !== colorToGuess.innerHTML) {
            cheers.innerHTML = "essaie encore"
            e.style.background = "#222222"
        } else {
            cheers.innerHTML = "bien joué !"
            resetColor.innerHTML = "rejouer ?"
            header.style.background = colorToGuess.innerHTML
            colorPalette.forEach((square) => {
                square.style.background = colorToGuess.innerHTML
            })
        }
    })
})

// events listener

resetColor.addEventListener("click", onResetClick)
easy.addEventListener("click", onEasyClick)
medium.addEventListener("click", onMediumClick)
hard.addEventListener("click", onHardClick)

/* working functions */

pickColor(colorToGuess)
generatePalette()

