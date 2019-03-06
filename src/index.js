let STATE_room = undefined
let STATE_user = undefined
let STATE_userType = undefined
const rootEl = document.querySelector('#root')
const footerEl = document.querySelector('#footer')

document.addEventListener('DOMContentLoaded', () => { 
    drawRoomOptions()
})

//------- Updating State Functions -------//
const storeRoom = room => STATE_room = room
const storeUser = user => STATE_user = user
const clearRoomState = () => STATE_room = undefined
const clearUserState = () => STATE_user = undefined
const clearUserType = () => STATE_userType = undefined

const clearState = () => {
    clearRoomState()
    clearUserState()
    clearUserType()
}


//------- GAME UPDATE LOGIC & ROUTING -------//
// runs every second and keeps game synced
const update = () => {
    // run the correct update loop depending on the user type
    if (STATE_userType === 'host'){ hostUpdate() }
    if (STATE_userType === 'client') { clientUpdate() }
    globalUpdate()

    // shared operations between Client & Host for all states
    debuggerNav() // used for debugging
}
setInterval(update, 1000)

// run the correct update loop dependent on game state
const hostUpdate = () => {
    if (STATE_room.status === 'open') { hostPreGameUpdate() }
    if (STATE_room.status === 'active') { hostGameUpdate() }
}
const clientUpdate = () => {
    if (STATE_room.status === 'open') { clientPreGameUpdate() }
    if (STATE_room.status === 'active') { clientGameUpdate() }
}
const globalUpdate = () => {
    if(STATE_room) {  roomStateRefresh() }
}

// update hosts and clients correclty during pre-game
const hostPreGameUpdate = () => {
    drawRoomLobby()
    drawUsersBar(STATE_room.users)
    updateUsersCount()
}
const clientPreGameUpdate = () => {
    drawClientWaiting()
}
const roomStateRefresh = () => API.getRoomById(STATE_room.id).then(storeRoom) //update the room with the latest from the API

// update hosts and clients correctly during game 
const hostGameUpdate = () => {}
const clientGameUpdate = () => {}



//----------------------------------------------//


//--------- Helper Functions ---------//
//method to draw game state in the navbar (useful for debugging)
const debuggerNav = () => document.querySelector('#header-stats').innerHTML = 
        `<b>StateRoom:</b> ${JSON.stringify(STATE_room)} <br/>
        <b>StateUser:</b> ${JSON.stringify(STATE_user)} <br/>
        <b>StateUserType:</b> ${STATE_userType} <br/>`


const addNewUser = (name, roomCode) => {
    return API.joinRoom(name, roomCode)
    .then(storeUser)
}
const setRoomStatus = (room, status) => {
    room.status = status
    return API.updateRoom(room)
}

const quit = () => {
    if (STATE_user) {API.deleteUser(STATE_user)}
    clearState()
    clearElement(rootEl)
    clearElement(footerEl)
    drawRoomOptions()
}



