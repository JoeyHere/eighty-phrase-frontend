const drawClientQuestionInput = () => {
    const questionInputEl = document.createElement('div')
    questionInputEl.innerHTML = questionInputHTML()
    // questionInputEl.querySelector('button').addEventListener('click', () => {
    //     quit()
    // })
    drawToElement(rootEl, questionInputEl)
}
const questionInputHTML = () => `
    <img class = 'avatar'src = "https://api.adorable.io/avatars/30/${STATE_user.name}.png">
        <p>${STATE_room.current_round.question.content}</p>
        <form id='questionInputForm' >
            <input type = "text" name = "answer"placeholder = "type your answer here...">
            <input class="btn-success" type = "submit" value = "Submit" >
        </form>
    `