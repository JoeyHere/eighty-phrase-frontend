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
    formContainerEl.querySelector('button.back-btn').addEventListener('click', () => {
        drawRoomOptions()
    })
}

const setupFormHTML = () => 
     `  <button class='btn-sm btn-secondary'>< go back</button> 
        <form id='joinRoomForm' >
            <input type = "text" name = "name" placeholder = "Name" >
            <input type = "text" name = "code" placeholder = "Room Code">
            <input class="btn-success" type = "submit" value = "Submit" >
        </form>`



const drawRoomOptions = () => {
    const roomOptionsEl = document.createElement('div')
    roomOptionsEl.innerHTML = roomOptionHTML

    roomOptionsEl.querySelector('btn-primary').addEventListener('click', () => {
        drawSetupForm()
    })
    roomOptionsEl.querySelector('btn-info').addEventListener('click', () => {
        API.createNewRoom().then(storeRoom)
    })
    rootEl.innerHTML = ""
    rootEl.appendChild(formOptionsEl)
}

const roomOptionHTML = () => {
    `<button class='btn-lg btn-primary'> Join Existing </button>
    <p>
        OR
    </p>
    <button class='btn-lg btn-info'> Create New </button>
    `
}

