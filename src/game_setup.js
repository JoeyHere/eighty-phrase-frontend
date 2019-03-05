//this file is responsible for the game state up until the game/room becomes active.

const drawSetupForm = () => {
    const formContainerEl = document.createElement('div')
    formContainerEl.innerHTML = setupFormHTML()
    rootEl.innerHTML = ""
    rootEl.appendChild(formContainerEl)
    const formEl = formContainerEl.querySelector('#joinRoomForm')
    formEl.addEventListener('submit', event => {
        event.preventDefault()
        addNewUser(event.target.name.value, STATE_room.code)
    })
}

const setupFormHTML = () => {
    return `
        <form id='joinRoomForm' >
            <input type = "text" name = "name" placeholder = "Name" >
            <input type = "text" name = "code" placeholder = "Room Code">
            <input type = "submit" value = "Submit" >
        </form>`
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

