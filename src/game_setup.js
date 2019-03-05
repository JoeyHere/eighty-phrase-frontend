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


const drawUsersBar = users => users.forEach(drawUserToBar)

const drawRoomLobby = () => {
    const lobbyEl = document.createElement('div')
    lobbyEl.innerHTML = lobbyHTML()
    rootEl.innerHTML = ""
    rootEl.appendChild(lobbyEl)
}
const lobbyHTML = () => 
    `<h3> Your Room is ready! </h3>
    <p> Use room code: </p>
    <h1>${STATE_room.code}</h1>
    <button class='btn-lg btn-primary'>Start Game</button>
    `

const drawUserToBar = user => {
    const userEl = document.createElement('span')
    userEl.innerHTML = `
        <img src = "https://api.adorable.io/avatars/90/${user.name}.png" >
        <h2> ${user.name} </h2>
    `
    footerEl.appendChild(userEl)
}


const drawRoomOptions = () => {
    const roomOptionsEl = document.createElement('div')
    roomOptionsEl.innerHTML = roomOptionHTML()

    roomOptionsEl.querySelector('.btn-primary').addEventListener('click', () => {
        drawSetupForm()
    })
    roomOptionsEl.querySelector('.btn-info').addEventListener('click', () => {
        API.createNewRoom().then(room => {
            storeRoom(room)
            gameRouter()
        })
    })
    rootEl.innerHTML = ""
    rootEl.appendChild(roomOptionsEl)
}

const roomOptionHTML = () => 
    `<button class='btn-lg btn-primary'> Join Existing </button>
    <p>OR</p>
    <button class='btn-lg btn-info'> Create New </button>
    `


