const drawClientQuestionInput = () => {
    if (!exists('#questionInput')) {
    const questionInputEl = document.createElement('div')
    questionInputEl.id = 'questionInput'
    questionInputEl.innerHTML = questionInputHTML()
    questionInputEl.querySelector('form').addEventListener('submit', event => {
        event.preventDefault()
        const response = {user_id: STATE_user.id,round_id: STATE_room.current_round.id,
        content: event.target.answer.value}
        API.createResponse(response)
        questionInputEl.innerHTML = questionWaitingHTML()
    })
    drawToElement(rootEl, questionInputEl)}
}

const questionInputHTML = () => `
    <img class = 'avatar'src = "https://api.adorable.io/avatars/30/${STATE_user.name}.png">
        <p>${STATE_room.current_round.question.content}</p>
        <form id='questionInputForm' >
            <input type="text" name="answer" placeholder="type your answer here...">
            <input class="btn-success" type="submit" value="Submit" >
        </form>
    `

const questionWaitingHTML = () => `
    <img class = 'avatar'src = "https://api.adorable.io/avatars/30/${STATE_user.name}.png">
        <p>Waiting for others to respond...</p>`


const getResponses = () => {
    let responses = STATE_room.current_round.responses
    let answer = STATE_room.current_round.question.answer
    let fakeAnswer = STATE_room.current_round.question.fake_answer
    let randomArr = [answer, fakeAnswer, ...responses]
    return randomArr
}

const drawClientVoteInput = () => {
    if (!exists('#questionVoteInput')) {
        const questionVoteInputEl = document.createElement('div')
        questionVoteInputEl.id = 'questionVoteInput'
        
        
        
        drawToElement(rootEl, questionInputEl)
    }
}