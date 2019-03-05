let STATE_room = undefined
let STATE_currentUser = undefined
let STATE_userType = undefined
let STATE_round = undefined

document.addEventListener('DOMContentLoaded', () => {
})

const updateLoop = () => {
    return setTimeout(API.getRound, 1000)
}

const testAddNewUser = (name, roomCode) => {
    return API.joinRoom(name, roomCode)
    .then(storeUser)
}

const showRoomCode = roomCodeEl => {
    roomCodeEl.innerText = localRoom.code
}

const storeRoom = room => {
    localRoom = room
    return localRoom
}

const storeUser = user => {
    currentUser = user
    return currentUser
}

const setRoomStatus = (room, status) => {
    room.status = status
    return API.updateRoom(room)
}

const renderImage = () => {
    image.src =`https://api.adorable.io/avatars/100/${currentUser.name}.png`
}

// const addNewRoomEvent = () => {
//     newRoomBtnEl.addEventListener('click', () => {
//         return API.createNewRoom()
//             .then(storeRoom)
//             .then(showRoomCode)
//     })
// }

// const addJoinRoomEvent = () => {
//     joinRoomFormEl.addEventListener('submit', event => {
//         event.preventDefault()
//         let name = event.target.name.value
//         let roomCode = event.target.code.value
//         return API.joinRoom(name, roomCode)
//             .then(storeUser)
//     })
// }