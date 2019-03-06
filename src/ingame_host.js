const drawRoomQuestion = () => {
    const questionEl = document.createElement('div')
    questionEl.innerHTML = questionHTML()
    drawToElement(rootEl, questionEl)
}
const questionHTML = () =>
    `<h1>Question</h1>
    <blockquote class="blockquote">
        <h3>${STATE_room.current_round.question.content}</h3>
    </blockquote>
    <h3>
        <small class="text-muted">origin: </small>
        ${STATE_room.current_round.question.country.name}
        (image of flag goes here)
    </h3>

    <br>
    `
