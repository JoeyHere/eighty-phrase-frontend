let STATE_room = undefined
let STATE_user = undefined
let STATE_userType = undefined
let STATE_gameTimer = 0
const rootEl = document.querySelector('#root')
const footerEl = document.querySelector('#footer')

document.addEventListener('DOMContentLoaded', () => { 
    drawRoomOptions()
})

//------- Updating State Functions -------//
const storeRoom = room => {
    if (room !== undefined){ STATE_room = room }
} 
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

    globalUpdate()
    if (STATE_userType === 'host'){ hostUpdate() }
    if (STATE_userType === 'client') { clientUpdate() }

    // shared operations between Client & Host for all states
    debuggerNav() // used for debugging
}
setInterval(update, 1000)

// run the correct update loop dependent on game state
const hostUpdate = () => {
    STATE_gameTimer -= 1
    removeDroppedUsers()
    updateUsersBar(STATE_room.users)
    if (STATE_room.status === 'open') { hostPreGameUpdate() }
    if (STATE_room.status === 'active') { hostGameUpdate() }
}
const clientUpdate = () => {
    if (STATE_room.status === 'open') { clientPreGameUpdate() }
    if (STATE_room.status === 'active') { clientGameUpdate() }
}
const globalUpdate = () => {
    if(STATE_room) {  roomStateRefresh()}
}

// update hosts and clients correclty during pre-game
const hostPreGameUpdate = () => {
    drawRoomLobby()
    updateUsersCount()
    updateStartBtn()
}
const clientPreGameUpdate = () => {
    drawClientWaiting()
}
const roomStateRefresh = () => API.getRoomById(STATE_room.id).then(storeRoom) //update the room with the latest from the API

// update hosts and clients correctly during game 
const hostGameUpdate = () => {
    drawRoomQuestion()
    if (STATE_room.current_round.status === 'question') { 
        drawQuestionAssets()
        if (STATE_gameTimer <= 0) {
            API.updateRound({ id: STATE_room.current_round.id, status: 'vote' })
            STATE_gameTimer = 10
        }}
    if (STATE_room.current_round.status === 'vote') { 
        drawVoteAssets() 
        if (STATE_gameTimer <= 0) {
            API.updateRound({ id: STATE_room.current_round.id, status: 'score' })
            STATE_gameTimer = 10
        }}
    if(STATE_room.current_round.status === 'score') { drawScoreAssets() }
}
const clientGameUpdate = () => {
    if (STATE_room.current_round.status === 'question') {drawClientQuestionInput()}
    if (STATE_room.current_round.status === 'vote') {drawClientVoteInput()}
}


//----------------------------------------------//


//--------- Helper Functions ---------//
//method to draw game state in the navbar (useful for debugging)
const exists = elementSelector => !!document.querySelector(elementSelector)

const debuggerNav = () => document.querySelector('#header-stats').innerHTML = 
        `<b>StateRoom:</b> ${JSON.stringify(STATE_room)} <br/>
        <b>StateUser:</b> ${JSON.stringify(STATE_user)} <br/>
        <b>StateUserType:</b> ${STATE_userType} <br/>
        <b>Timer:</b> ${STATE_gameTimer} <br/>`


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

// manages users bar
const updateUsersBar = users => users.forEach(updateUserInBar)

const updateUserInBar = user => {
    if (!exists(`div[data-user-id="${user.id}"]`)){
        const userEl = document.createElement('div')
        userEl.className = 'avatarDiv'
        userEl.dataset.userId = user.id
        userEl.innerHTML = 
            `<h5 class="upperCase"> ${user.name} </h5>
            <img data-user-id="${user.id}" class='avatar' src = "https://api.adorable.io/avatars/60/${user.name}.png" >
            <p class="score"> ${user.score} points </p>`
        footerEl.appendChild(userEl)
    } else {
        if (STATE_room.current_round){
            if (STATE_room.current_round.responses.find(resp => resp.user_id === user.id)){
                document.querySelector(`img[data-user-id="${user.id}"]`).classList.add('responded')
            }
            if (STATE_room.current_round.votes.find(vote => vote.user_id === user.id)) {
                document.querySelector(`img[data-user-id="${user.id}"]`).classList.remove('responded')
                document.querySelector(`img[data-user-id="${user.id}"]`).classList.add('wiggle')
                document.querySelector(`img[data-user-id="${user.id}"]`).classList.add('voted')
            }
            if (STATE_room.current_round.status === 'score') {
                document.querySelector(`img[data-user-id="${user.id}"]`).classList.remove('wiggle')
                document.querySelector(`img[data-user-id="${user.id}"]`).classList.remove('voted')
            }
        }
    }
}

const updateScoresInBar = () => {
    document.querySelectorAll('.avatarDiv').forEach(avatarDiv => {
        user = STATE_room.users.find(user => user.id === parseInt(avatarDiv.getAttribute('data-user-id')))
        scoreEl = avatarDiv.querySelector('.score')
        scoreEl.innerText = ` ${user.score} points `
    })
}

const removeDroppedUsers = () => {
    document.querySelectorAll('.avatarDiv').forEach(avatarDiv => {
        avatarDivId = avatarDiv.getAttribute('data-user-id')
        if (!STATE_room.users.find(user => user.id === parseInt(avatarDivId))){
            avatarDiv.remove()
        }
    })
}

Array.prototype.shuffle = function () {
    let input = this
    for (let i = input.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}


