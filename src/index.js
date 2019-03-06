let STATE_room = undefined
let STATE_user = undefined
let STATE_userType = undefined
let STATE_round = undefined
const rootEl = document.querySelector('#root')
const footerEl = document.querySelector('#footer')

document.addEventListener('DOMContentLoaded', () => { 
    drawRoomOptions()
})

// runs every second and keeps game synced
const update = () => {
    // run the correct update loop depending on the user type
    if (STATE_userType === 'host'){ hostUpdate() }
    if (STATE_userType === 'client') { clientUpdate() }

    // shared operations between Client & Host below
    if (STATE_room) { API.getRoomById(STATE_room.id).then(storeRoom) }  //update the room with the latest from the API
    debuggerNav() // used for debugging
}
setInterval(update, 1000)

const hostUpdate = () => {
    // run the correct update loop dependent on game state
    if (STATE_room.status === 'open') { hostRoomOpenUpdate() }
}
const clientUpdate = () => {
    // run the correct update loop dependent on game state
    if (STATE_room.status === 'open') { clientRoomOpenUpdate() }
}

const hostRoomOpenUpdate = () => {
    drawRoomLobby()
    drawUsersBar(STATE_room.users)
    updateUsersCount()
}
const clientRoomOpenUpdate = () => {
    drawClientWaiting()
}

//method to draw game state in the navbar (useful for debugging)
const debuggerNav = () => document.querySelector('#header-stats').innerHTML = 
        `<b>StateRoom:</b> ${JSON.stringify(STATE_room)} <br/>
        <b>StateUser:</b> ${JSON.stringify(STATE_user)} 
        <b>StateUserType: ${STATE_userType} <br/>
        <b>StateRound:</b> ${JSON.stringify(STATE_round)}`



const addNewUser = (name, roomCode) => {
    return API.joinRoom(name, roomCode)
    .then(storeUser)
}

const storeRoom = room => STATE_room = room

const clearRoomState = () => STATE_room = undefined

const storeUser = user => STATE_user = user


const setRoomStatus = (room, status) => {
    room.status = status
    return API.updateRoom(room)
}
