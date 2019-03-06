//this file is responsible for the game state up until the game/room becomes active.

const drawSetupForm = () => {
    const formContainerEl = document.createElement('div')
    formContainerEl.innerHTML = setupFormHTML()
    rootEl.innerHTML = ""
    rootEl.appendChild(formContainerEl)
    const formEl = formContainerEl.querySelector('#joinRoomForm')
    formEl.addEventListener('submit', event => {
        event.preventDefault()
        addNewUser(event.target.name.value, event.target.code.value)
            .then(user => {
                STATE_userType = 'client'
                API.getRoomById(user.room_id).then(storeRoom)
                update()
            })
    })
    formContainerEl.querySelector('.btn-secondary').addEventListener('click', () => {
        quit()
    })
}
const setupFormHTML = () => 
     `  <button class='btn-sm btn-secondary'>< go back</button> 
        <form id='joinRoomForm' >
            <input type = "text" name = "name" placeholder = "Name" >
            <input type = "text" name = "code" placeholder = "Room Code">
            <input class="btn-success" type = "submit" value = "Submit" >
        </form>`

// draw the room lobby once, once it exists there is no need to draw it again
const drawRoomLobby = () => {
    if (!exists('#hostLobby')){
        const lobbyEl = document.createElement('div')
        lobbyEl.id = 'hostLobby'
        lobbyEl.innerHTML = lobbyHTML()
        lobbyEl.querySelector('.btn-primary').addEventListener('click', () => {
            STATE_room.status = 'active'
            API.updateRoom(STATE_room).then(room => API.createNewRound(room.id))
        })
        lobbyEl.querySelector('.btn-secondary').addEventListener('click', () => {
            quit()
        })
        drawToElement(rootEl, lobbyEl)
    }
}
const lobbyHTML = () => 
    `<br>
    <button class='btn-sm btn-secondary'> < go back</button> 
    <hr>
    <h3> Your Room is ready! </h3>
    <p> Use room code: </p>
    <h1 class="display-1">${STATE_room.code}</h1>
    <p>Capacity:</p>
    <h3 id="user-count"></h3>
    <hr>
    <button type="button" class='btn btn-lg btn-primary'
        ${STATE_room.users.length >= 2 && STATE_room.users.length <= 5 ? '' : 'disabled' }
    >Start Game</button><br/>
    <i>${STATE_room.users.length >= 2 && STATE_room.users.length <= 5 ? 'ready to start' : '(need 2-5 players to start)'  }</i>`

const updateUsersCount = () => document.querySelector('#user-count').innerHTML = 
    `${STATE_room.users.length} / 5`


const drawRoomOptions = () => {
    const roomOptionsEl = document.createElement('div')
    roomOptionsEl.innerHTML = roomOptionHTML()

    roomOptionsEl.querySelector('.btn-primary').addEventListener('click', () => {
        drawSetupForm()
    })
    roomOptionsEl.querySelector('.btn-info').addEventListener('click', () => {
        API.createNewRoom().then(room => {
            storeRoom(room)
            STATE_userType = 'host'
            update()
        })
    })
    drawToElement(rootEl, roomOptionsEl)
}

const roomOptionHTML = () => 
    `<button class='btn-lg btn-primary'> Join Existing </button>
    <p>OR</p>
    <button class='btn-lg btn-info'> Create New </button>
    `

const drawClientWaiting = () => {
    const waitingEl = document.createElement('div')
    waitingEl.innerHTML = waitingHTML()
    waitingEl.querySelector('button').addEventListener('click', () => {
        quit()
    })
    drawToElement(rootEl, waitingEl)
}
const waitingHTML = () => `
    <h2>Username: ${STATE_user.name}</h2>
    <img class = 'avatar'src = "https://api.adorable.io/avatars/90/${STATE_user.name}.png">
    <h2>Waiting for host...</h2>
    <button class="btn-sm btn-warning">Quit Game</button>
    `

const drawToElement = (rootElement,appendElement) => {
    clearElement(rootElement)
    rootElement.appendChild(appendElement)
}

const clearElement = element => {
    while (element.firstChild) {element.removeChild(element.firstChild);}
}