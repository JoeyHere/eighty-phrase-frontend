const drawFinalScores = () => {
    if (!exists('#score-cards')){
        const usersByScore = [...STATE_room.users].sort((a, b) => b.score - a.score)
        const cardDiv = document.createElement('div')
        cardDiv.id = 'score-cards'
        drawToElement(rootEl, cardDiv)
        drawScoreWinner(usersByScore.shift())

        const scoreRow = document.createElement('div')
        scoreRow.id = 'card-row'
        scoreRow.className = 'row'
        cardDiv.appendChild(scoreRow)

        usersByScore.forEach(drawScore)
        document.querySelector('#footer').remove()
    }
}

// appends a regular score card for a user to the page
const drawScore = user => {
    const scoreCard = document.createElement('div')
    scoreCard.classList = 'card text-center w-25'
    scoreCard.innerHTML = `
    <div class="card-body">
        <p> </p>
        <h5 class="card-title upperCase">${user.name}</h5>
        <img class='avatar' src="https://api.adorable.io/avatars/75/${user.name}.png">
    </div>
    <div class="card-footer text-muted" style="font-size: 14px;">
        Score <b>${user.score}</b> 
    </div>`
    document.querySelector('#card-row').appendChild(scoreCard)
}

// draws a score card for the winner to the root of the page
const drawScoreWinner = user => {
    const winnerCard = document.createElement('div')
    winnerCard.classList = 'card text-cente w-100 wrapper'
    winnerCard.innerHTML =
        `<div class="card-body">
        <p class='emoji'> 👑 </p>
        <img class='avatar' src="https://api.adorable.io/avatars/150/${user.name}.png">
        <h5 class="card-title upperCase">${user.name}</h5>
    </div>
    <div class="card-footer" style="font-size:20px">
        💎 Score <b>${user.score}</b> 💎
    </div>`
    document.querySelector('#score-cards').appendChild(winnerCard)
}