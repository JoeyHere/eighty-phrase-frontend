let localRoom
let currentUser
const newRoomBtnEl = document.querySelector('#newRoomBtn')
const joinRoomFormEl = document.querySelector('#joinRoomForm')
const image = document.querySelector('#image')

document.addEventListener('DOMContentLoaded', () => {
    addNewRoomEvent()
    addJoinRoomEvent()
})

const addNewRoomEvent = () => {
    newRoomBtnEl.addEventListener('click', () => {
        return API.createNewRoom()
            .then(storeRoom)
            .then(showRoomCode)
    })
}

const addJoinRoomEvent = () => {
    joinRoomFormEl.addEventListener('submit', event => {
        event.preventDefault()
        let name = event.target.name.value
        let roomCode = event.target.code.value
        return API.joinRoom(name, roomCode)
            .then(storeUser)
    })
}

const testAddNewUser = (name, roomCode) => {
    return API.joinRoom(name, roomCode)
    .then(storeUser)
}

const showRoomCode = () => {
    const roomCodeEl = document.querySelector('#roomCode')
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