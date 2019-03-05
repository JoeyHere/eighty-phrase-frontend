//this file is responsible for the game state up until the game/room becomes active.

const buildSetupForm = () => {
    const formContainerEl = document.createElement('div')
    formContainerEl.innerHTML = `
    
    
    `
}

const drawRoomOptions = () => {
    const formOptionsEl = document.createElement('div')
    const joinBtnEl = document.createElement('button')
    joinBtnEl.innerText = 'Join Existing'
    joinBtnEl.addEventListener('click', () => {
        buildSetupForm()
    })
    formOptionsEl.appendChild(joinBtnEl)
    const createBtnEl = document.createElement('button')
    createBtnEl.innerText = 'Create New'
    createBtnEl.addEventListener('click', () => {
        API.createNewRoom().then(storeRoom)
    })
    formOptionsEl.appendChild(createBtnEl)
    rootEl.innerHTML = ""
    rootEl.appendChild(formOptionsEl)
}


