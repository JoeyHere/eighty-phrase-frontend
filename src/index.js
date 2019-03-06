let STATE_room = undefined
let STATE_user = undefined
let STATE_userType = undefined
let STATE_round = undefined
const rootEl = document.querySelector('#root')
const footerEl = document.querySelector('#footer')

document.addEventListener('DOMContentLoaded', () => { 
    drawRoomOptions()
})

const update = () => {
    //updateClients()
    //updateHost()
    
    debuggerNav() // used for debugging
    gameRouter()
    if (STATE_room){ API.getRoomById(STATE_room.id).then(storeRoom) }
}
setInterval(update, 1000)

// route the game correctly =====
const gameRouter = () => {
    if (STATE_room === undefined) {
       // drawRoomOptions()
    } else {
        drawRoomLobby()
        drawUsersBar(STATE_room.users)
    }
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
