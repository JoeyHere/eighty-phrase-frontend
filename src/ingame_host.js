const drawRoomQuestion = () => {
    if (!exists('#questionDisplay')){
        const questionEl = document.createElement('div')
        questionEl.id = 'questionDisplay'
        questionEl.innerHTML = questionHTML()
        drawToElement(rootEl, questionEl)
    }
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
    optionCard.classList.add('card')
    optionCard.innerHTML = 
    `<div class="card-body">
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
        })
        drawToElement(document.querySelector('#question-action'), continueToScoreBtn)
    }   
}

// draw the assets needed during the scoring phase
const drawScoreAssets = () => {
    drawEndGameButton()
    drawNewRoundButton()
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

