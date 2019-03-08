const drawRoomQuestion = () => {
    if (!exists('#questionDisplay')){
        STATE_gameTimer = 20
        const questionEl = document.createElement('div')
        questionEl.id = 'questionDisplay'
        questionEl.innerHTML = questionHTML()
        drawToElement(rootEl, questionEl)
    }
}

const drawFinalScores = () => {
    const usersByScore = [...STATE_room.users].sort((a, b) => b.score - a.score)
    drawScoreWinner(usersByScore.shift())
    usersByScore.forEach(drawScore)
}

// appends a regular score card for a user to the page
const drawScore = user => {
    const scoreCard = document.createElement('div')
    scoreCard.classList = 'card text-center'
    scoreCard.innerHTML = `
    <div class="card-body">
        <p> </p>
        <h5 class="card-title">${user.name}</h5>
        <img class='avatar' src="https://api.adorable.io/avatars/75/${user.name}.png">
    </div> `
    document.querySelector('#root').appendChild(scoreCard)
}

// draws a score card for the winner to the root of the page
const drawScoreWinner = user => {
    const winnerCard = document.createElement('div')
    winnerCard.classList = 'card text-center'
    winnerCard.innerHTML = 
    `<div class="card-header">
        👑 Meet Your New Leader 👑
    </div>
    <div class="card-body">
        <p> 👑 </p>
        <h5 class="card-title">${user.name}</h5>
        <img class='avatar' src="https://api.adorable.io/avatars/150/${user.name}.png">
    </div>
    <div class="card-footer text-muted">
        💎 Final Score <b>${user.score}</b> 💎
    </div>`
    drawToElement(rootEl, winnerCard)
}

const questionHTML = () =>
    `<blockquote class="blockquote text-center">
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

// draw the assets needed during the question phase
const drawQuestionAssets = () => drawQuestionButton()
const drawQuestionButton = () => {
    if (!exists('#continueToVote')) {
        const continueToVoteBtn = document.createElement('button')
        continueToVoteBtn.id = 'continueToVote'
        continueToVoteBtn.classList = 'btn btn-info bt-lg'
        continueToVoteBtn.innerText = 'Continue to Voting'
        continueToVoteBtn.addEventListener('click', () => {
            API.updateRound({ id: STATE_room.current_round.id, status: 'vote' })
            STATE_gameTimer = 10
        })
        drawToElement(document.querySelector('#question-action'), continueToVoteBtn)
    }   
}

// draw the assets needed during the voting phase
const drawVoteAssets = () => {
    drawVoteOptions()
    drawVoteButton()
}
const drawVoteOptions = () => {
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
const drawVoteButton = () => {
    if (!exists('#continueToScore')) {
        const continueToScoreBtn = document.createElement('button')
        continueToScoreBtn.id = 'continueToScore'
        continueToScoreBtn.classList = 'btn btn-success bt-lg'
        continueToScoreBtn.innerText = 'Continue to Scoring'
        continueToScoreBtn.addEventListener('click', () => {
            API.updateRound({ id: STATE_room.current_round.id, status: 'score' })
            STATE_gameTimer = 10
        })
        drawToElement(document.querySelector('#question-action'), continueToScoreBtn)
    }   
}

// draw the assets needed during the scoring phase
const drawScoreAssets = () => {
    drawEndGameButton()
    drawNewRoundButton()
}

const updateResponseCards = responses => {
    responses.forEach(updateRespCard)
    setTimeout(updateScoresInBar, 1000)
}

// updates a card during scoring phase 
const updateRespCard = response => {
    const respEl = document.querySelector(`div[data-response-id="${response.id}"]`)
    const sender = STATE_room.users.find(user => user.id === response.user_id)
    const votes = STATE_room.current_round.votes.filter(vote => vote.response_id === response.id)
    const voteUsers = votes.map(vote => STATE_room.users.find(user => user.id === vote.user_id))
    const voteUsersNames = voteUsers.map(user => user.name)

    updateScore(response)

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
}


const drawNewRoundButton = () => {
    if (!exists('#newRound')) {
        const newRoundBtn = document.createElement('button')
        newRoundBtn.id = 'newRound'
        newRoundBtn.classList = 'btn btn-success bt-lg'
        newRoundBtn.innerText = 'New Round'
        newRoundBtn.addEventListener('click', () => {
            API.createNewRound(STATE_room.id).then(() => {
                API.getRoomById(STATE_room.id).then(room => {
                    storeRoom(room)
                    clearElement(rootEl)
                    update()
                })
            })
        })
        document.querySelector('#question-action').appendChild(newRoundBtn)
    }
}

const drawEndGameButton = () => {
    if (!exists('#quitGame')) {
        const quitGameBtn = document.createElement('button')
        quitGameBtn.id = 'quitGame'
        quitGameBtn.classList = 'btn btn-danger bt-lg'
        quitGameBtn.innerText = 'Quit Game'
        quitGameBtn.addEventListener('click', () => {
            alert('you can never leave')
            //API.updateRound({ id: STATE_room.current_round.id, status: 'score' })
        })
        drawToElement(document.querySelector('#question-action'), quitGameBtn)
    }
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
        API.updateUser(user)
            .then(() => { if (responseUser !== undefined) {API.updateUser(responseUser)}})
    })
}
