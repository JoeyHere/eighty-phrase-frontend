let STATE_room = undefined
let STATE_user = undefined
let STATE_userType = undefined
let STATE_round = undefined
const rootEl = document.querySelector('#root')
const footerEl = document.querySelector('#footer')

document.addEventListener('DOMContentLoaded', () => {
})

if (STATE_room === undefined) {
    drawRoomOptions()
}


const addNewUser = (name, roomCode) => {
    return API.joinRoom(name, roomCode)
    .then(storeUser)
}

const storeRoom = room => STATE_room = room

const storeUser = user => STATE_user = user


const setRoomStatus = (room, status) => {
    room.status = status
    return API.updateRoom(room)
}
