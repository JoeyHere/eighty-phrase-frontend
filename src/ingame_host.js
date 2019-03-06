const drawRoomQuestion = () => {
    const questionEl = document.createElement('div')
    questionEl.innerHTML = questionHTML()
    drawToElement(rootEl, lobbyEl)
}
const questionHTML = () =>
    `<h1>Question</h1>
    <blockquote class="blockquote">
        <h1 class="display-4">${STATE_room.current_round.question.content}</h3>
    </blockquote>
    <h3>
        <small class="text-muted">origin: </small>
        ${STATE_room.current_round.question.country.name}
        <img class="country-icon"/>
    </h3>

    <br>
    `
