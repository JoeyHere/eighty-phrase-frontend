const drawRoomQuestion = () => {
    if (!exists('#questionDisplay')){
        STATE_gameTimer = 30
        const questionEl = document.createElement('div')
        questionEl.id = 'questionDisplay'
        questionEl.innerHTML = questionHTML()
        drawToElement(rootEl, questionEl)
    }
}

const questionHTML = () =>
    `<blockquote class="blockquote text-center">
        <h1 id='timer'></h1>
        <h3>${STATE_room.current_round.question.content}</h3>
        <footer class="blockquote-footer"> 
        Origin: 
        <cite title="origin country">
            ${STATE_room.current_round.question.country.name}
        </cite></footer>
    </blockquote>
    <hr/>
    <div id="question-action"></div>
    <div id="question-sub-content"></div>`

// draw the assets needed during the voting phase
const drawVoteAssets = () => {
    if (!exists('.card-columns')) {
        const cardColEl = document.createElement('div')
        cardColEl.className = 'card-columns'
        drawToElement(document.querySelector('#question-sub-content'), cardColEl)
        getResponses().forEach(voteOption => cardColEl.appendChild(returnVoteCard(voteOption)))
    }
}
const returnVoteCard = response => {
    const optionCard = document.createElement('div')
    optionCard.dataset.responseId = response.id
    optionCard.dataset.respKind = response.kind
    optionCard.classList.add('card')
    optionCard.innerHTML = 
    `<div class="card-body upperCase">
        ${response.content}
    </div>`
    return optionCard
} 

// draw the assets needed during the scoring phase
const drawScoreAssets = () => {
    if (!exists('#quitGame')) {
        const quitGameBtn = document.createElement('button')
        quitGameBtn.id = 'quitGame'
        quitGameBtn.classList = 'btn btn-danger bt-lg'
        quitGameBtn.innerText = 'End Game and Show Final Scores'
        quitGameBtn.addEventListener('click', () => {
            STATE_room.status = 'closed'
            API.updateRoom(STATE_room)
        })
        drawToElement(document.querySelector('#question-action'), quitGameBtn)
    }
}

const updateResponseCards = responses => responses.forEach(updateRespCard)
// updates a card during scoring phase 
const updateRespCard = response => {
    const respEl = document.querySelector(`div[data-response-id="${response.id}"]`)
    const sender = STATE_room.users.find(user => user.id === response.user_id)
    const votes = STATE_room.current_round.votes.filter(vote => vote.response_id === response.id)
    const voteUsers = votes.map(vote => STATE_room.users.find(user => user.id === vote.user_id))
    const voteUsersNames = voteUsers.map(user => user.name)

    const headerEl = document.createElement('div')
    headerEl.className = 'card-header bg-light text-dark'
    const footerEl = document.createElement('div')
    footerEl.className = 'card-footer bg-light text-dark'

    if (response.kind === 'user'){ 
        headerEl.innerText += `${sender.name}'s LIE` 
        respEl.classList += ' text-white bg-warning'
    }
    if (response.kind === 'fake'){ 
        headerEl.innerText += ` OUR LIE`
        respEl.classList += ' text-white bg-danger'
    }
    if (response.kind === 'answer') { 
        headerEl.innerText += ` CORRECT ANSWER!` 
        respEl.classList += ' text-white bg-success'
    }

    footerEl.innerHTML = `voted for by: ${voteUsersNames.length > 0 ? `<b>${voteUsersNames}</b>` : '<b>No-one!</b> Lie better...'}`
    respEl.prepend(headerEl)
    respEl.appendChild(footerEl)
    updateScore(response)
}

const updateScore = response => {
    const responseUser = STATE_room.users.find(u => {
        return u.id === response.user_id
    })
    const responseVotes = STATE_room.current_round.votes.filter(vote =>{
        return vote.response_id === response.id
    })
    responseVotes.forEach(vote => {
        const user = STATE_room.users.find(u => {
            return u.id === vote.user_id
        })
        if (response.kind === 'answer') {user.score += 100}
        if (response.kind === 'fake') {user.score -= 50}
        if (response.kind === 'user') {
            user.score -= 50
            responseUser.score += 50
        }
        return API.updateUser(user)
            .then(() => { if (responseUser !== undefined) {API.updateUser(responseUser)}})
    })
}

const drawTimer = () => {
    if (STATE_gameTimer >= 0 && document.querySelector('#timer')) {
        document.querySelector('#timer').innerText = STATE_gameTimer
    }
}