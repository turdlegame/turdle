const targetWords = [];
const dictionary = {};
const guessGrid = document.querySelector("[data-guess-grid]")
const WORD_LENGTH = 5
const alertContainer = document.querySelector("[data-alert-container")
let shareable = ''

startInteraction();

function startInteraction() {
    document.addEventListener('click',handleMouseClick);
    document.addEventListener('keydown',handleKeyPress);
}

function stopInteraction() {
    document.removeEventListener('click',handleMouseClick);
    document.removeEventListener('keydown',handleKeyPress);
}

function handleMouseClick(e) {
    if (e.target.matches("[data-key]")) {
        pressKey(e.target.datatset.key)
        return;
    }

    if (e.target.matches("[data-enter]")) {
        submitGuess();
        return;
    }

    if (e.target.matches("[date-delete]")) {
        deleteKey();
        return;
    }
};

function handleKeyPress(e) {
    if (e.key === "Enter") {
        submitGuess();
        return;
    }

    if (e.key === "Backspace" || e.key === "Delete") {
        deleteKey();
        return;
    }

    if (e.key.match(/^[a-z]$/)) {
        pressKey(e.key);
        return;
    }
};

function deleteKey() {
    const activeTiles = getActiveTiles();
    const lastTile = activeTiles[activeTiles.length-1];
    if (lastTile == null) {return}
    lastTile.textContent = '';
    delete lastTile.dataset.state;
    delete lastTile.dataset.letter
}

function submitGuess() {
    const activeTiles = [...getActiveTiles()];
    if(activeTiles.length<WORD_LENGTH){
        showAlert("Not Enough Letters");
        shakeTiles(activeTiles);
        return
    }
    const remainingTiles = guessGrid.querySelectorAll(":not([data-letter])")
    if (remainingTiles == 0 ){
        stopInteraction();
        showFinalDialog();
        return}
    activeTiles.forEach(tile => {
        console.log('removing')
        tile.removeAttribute('data-state')
    })
    if(shareable == ''){
        shareable = '💩💩💩💩💩';
        return
    }
    shareable = shareable + '\n' + '💩💩💩💩💩';

}

function showAlert(message, duration = 1000) {
    const alert = document.createElement("div");
    alert.textContent = message;
    alert.classList.add("alert");
    alertContainer.prepend(alert);
    if (duration == null) {return}
    setTimeout(() => {
        alert.classList.add("hide")
        alert.addEventListener("transitionend", () => {
            alert.remove();
        })
    },duration)
}

function shakeTiles(tiles) {
    tiles.forEach(tile => {
        tile.classList.add("shake");
        tile.addEventListener("animationend", () => {
            tile.classList.remove("shake")
        }, { once : true })
    })
}

function pressKey(key) {
    const activeTiles = getActiveTiles();
    if (activeTiles.length >= WORD_LENGTH) {return}
    const nextTile = guessGrid.querySelector(":not([data-letter])");
    nextTile.dataset.letter = "💩";
    nextTile.textContent = "💩";
    nextTile.dataset.state = "active";
}

function getActiveTiles() {
    return guessGrid.querySelectorAll('[data-state="active"]');
}