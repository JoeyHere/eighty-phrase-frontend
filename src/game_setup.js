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

// manages users bar
const drawUsersBar = users => {
    footerEl.innerHTML = ''
    users.forEach(drawUserToBar)
}

const drawUserToBar = user => {
    const userEl = document.createElement('div')
    userEl.className = 'userEl'
    userEl.innerHTML = `
        <img class='avatar' src = "https://api.adorable.io/avatars/90/${user.name}.png" >
        <h2> ${user.name} </h2>
    `
    footerEl.appendChild(userEl)
}


const drawRoomLobby = () => {
    const lobbyEl = document.createElement('div')
    lobbyEl.innerHTML = lobbyHTML()
    lobbyEl.querySelector('.btn-secondary').addEventListener('click', () => {
        clearRoomState()
        drawRoomOptions()
    })
    drawElement(rootEl, lobbyEl)
}
const lobbyHTML = () => 
    `<h3> Your Room is ready! </h3>
    <p> Use room code: </p>
    <h1>${STATE_room.code}</h1>
    <button class='btn-lg btn-primary'>Start Game</button>
    <hr>
    <button class='btn-sm btn-secondary'> < go back</button> 
    `

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
    drawElement(rootEl, roomOptionsEl)
}

const roomOptionHTML = () => 
    `<button class='btn-lg btn-primary'> Join Existing </button>
    <p>OR</p>
    <button class='btn-lg btn-info'> Create New </button>
    `

const drawClientWaiting = () => {
    const waitingEl = document.createElement('div')
    waitingEl.innerHTML = waitingHTML()
    drawElement(rootEl, waitingEl)
}

const waitingHTML = () => `
    <h2>Username: ${STATE_user.name}</h2>
    <img class = 'avatar'src = "https://api.adorable.io/avatars/90/${STATE_user.name}.png">
    <h2>Waiting for host...</h2>
    `

const drawElement = (rootElement,appendElement) => {
    while (rootElement.firstChild) {rootElement.removeChild(rootElement.firstChild);}
    rootElement.appendChild(appendElement)
}
