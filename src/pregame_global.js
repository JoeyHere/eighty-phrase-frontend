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
     `  <button class='btn-sm btn-secondary'> Go Back</button> <br/><br/>
        <form id='joinRoomForm' >
            <input type = "text"  maxlength="12" class="upperCase" name="name" placeholder = "Name" >
            <input type = "text" class="upperCase" name="code" maxlength="4" placeholder="Room Code">
            <br/><br/>
            <input class="btn-success" type="submit" value="Submit" >
        </form>`

// draw the room lobby once, once it exists there is no need to draw it again
const drawRoomLobby = () => {
    if (!exists('#hostLobby')){
        const lobbyEl = document.createElement('div')
        lobbyEl.id = 'hostLobby'
        lobbyEl.innerHTML = lobbyHTML()
        lobbyEl.querySelector('#start-game').addEventListener('click', () => {
            STATE_room.status = 'active'
            API.updateRoom(STATE_room).then(room => API.createNewRound(room.id))
                .then(() => STATE_gameTimer = 20)
        })
        lobbyEl.querySelector('.btn-secondary').addEventListener('click', () => {
            quit()
        })
        drawToElement(rootEl, lobbyEl)
    }
}
const lobbyHTML = () => 
    `<br>
    <button class='btn-sm btn-secondary'> Go Back</button> 
    <hr>
    <h3> Your Room is ready! </h3>
    <p> Use room code: </p>
    <h1 class="display-1">${STATE_room.code}</h1>
    <p>Capacity  <small class="text-muted">(need 2-5 players to start)</small></p>
    <h3 id="user-count"></h3>
    <hr>
    <button id="start-game" type="button" class='btn btn-lg btn-success' disabled>Start Game</button><br/>`

const updateUsersCount = () => document.querySelector('#user-count').innerHTML = 
    `${STATE_room.users.length} / 5` 

const updateStartBtn = () => {
    if (STATE_room.users.length >= 2 && STATE_room.users.length <=5){
        document.querySelector('#start-game').disabled = false
    } else {
        document.querySelector('#start-game').disabled = true
    }
}

const drawRoomOptions = () => {
    const roomOptionsEl = document.createElement('div')
    roomOptionsEl.innerHTML = roomOptionHTML()

    roomOptionsEl.querySelector('.btn-success').addEventListener('click', () => {
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
    `<button class='btn-lg btn-success'> Join Existing </button>
    <br/><br/>
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
    <h2 class="upperCase"> ${STATE_user.name}</h2>
    <img class = 'avatar'src = "https://api.adorable.io/avatars/90/${STATE_user.name}.png">
    <p>Waiting for host...</p>
    <button class="btn-sm btn-warning">Quit Game</button>
    `

const drawToElement = (rootElement,appendElement) => {
    clearElement(rootElement)
    rootElement.appendChild(appendElement)
}

const clearElement = element => {
    while (element.firstChild) {element.removeChild(element.firstChild);}
}