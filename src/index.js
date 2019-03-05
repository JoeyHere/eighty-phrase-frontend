let STATE_room = undefined
let STATE_currentUser = undefined
let STATE_userType = undefined
let STATE_round = undefined
const rootEl = document.querySelector('#root')

document.addEventListener('DOMContentLoaded', () => {
})


const addNewUser = (name, roomCode) => {
    return API.joinRoom(name, roomCode)
    .then(storeUser)
}

const storeRoom = room => {
    STATE_room = room
    return STATE_room
}

const setRoomStatus = (room, status) => {
    room.status = status
    return API.updateRoom(room)
}
