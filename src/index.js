let localRoomCode

const newRoomBtnEl = document.querySelector('#newRoomBtn')
const joinRoomFormEl = document.querySelector('#joinRoomForm')

document.addEventListener('DOMContentLoaded', () => {
    addNewRoomEvent()
    addJoinRoomEvent()
})

const addNewRoomEvent = () => {
    newRoomBtnEl.addEventListener('click', () => {
        API.createNewRoom()
            .then(showRoomCode)
    })
}

const addJoinRoomEvent = () => {
    joinRoomFormEl.addEventListener('submit', event => {
        event.preventDefault()
        let name = event.target.name.value
        let roomCode = event.target.code.value
        API.joinRoom(name, roomCode)
    })
}

const showRoomCode = room => {
    const roomCodeEl = document.querySelector('#roomCode')
    localRoomCode = room.code
    roomCodeEl.innerText = localRoomCode
}