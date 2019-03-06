const drawClientQuestionInput = () => {
    const questionInputEl = document.createElement('div')
    questionInputEl.innerHTML = questionInputHTML()
    questionInputEl.querySelector('button').addEventListener('click', () => {
        quit()
    })
    drawToElement(rootEl, waitingEl)
}
const questionInputHTML = () => `
    <h2>Username: ${STATE_user.name}</h2>
    <img class = 'avatar'src = "https://api.adorable.io/avatars/90/${STATE_user.name}.png">
        <form id='questionInputForm' >
            <input type = "text" name = "answer" placeholder = "type your answer here..." >
            <input class="btn-success" type = "submit" value = "Submit" >
        </form>
    `