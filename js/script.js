const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timerCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timerText = quiz_box.querySelector("header .timer .timer_text")
const option_list = document.querySelector('.option_list');

start_btn.onclick = () => {
    info_box.classList.add("activateInfo");
}

exit_btn.onclick = () => {
    info_box.classList.remove("activateInfo");
}

continue_btn.onclick = () => {
    info_box.classList.remove("activateInfo");
    quiz_box.classList.add("activateQuiz");
    showQuestion(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let que_count = 0;
let que_num = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let Score = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
    quiz_box.classList.add("activateQuiz");
    result_box.classList.remove("activateResult");
    que_count = 0;
    que_num = 1;
    timeValue = 15;
    widthValue = 0;
    Score = 0;
    showQuestion(que_count);
    queCounter(que_num);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timerText.textContent = "Time Left";
}

quit_quiz.onclick = () => {
    window.location.reload();
}

next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_num++;
        showQuestion(que_count);
        queCounter(que_num);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timerText.textContent = "Time Left";
    } else {
        console.log("Questions Completed");
        clearInterval(counter);
        clearInterval(counterLine);
        showResultBox();
    }
}

function showQuestion(index) {
    const que_text = document.querySelector(".que_text");
    let question = "<span>" + questions[index].question + "<span>";
    let opt_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = question;
    option_list.innerHTML = opt_tag;

    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if (userAns == correctAns) {
        answer.classList.add('correct');
        console.log('Answer is correct');
        answer.insertAdjacentHTML("beforeend", tickIcon);
        Score++;
    } else {
        answer.classList.add('incorrect');
        console.log('Answer is incorrect');
        answer.insertAdjacentHTML("beforeend", crossIcon);
        for (let i = 0; i < allOptions; i++) {
            console.log()
            if (option_list.children[i].textContent === correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add('disabled');
    }
    next_btn.style.display = "block";
}

function queCounter(index) {
    const totalques = document.querySelector(".total_que");
    let total_ques_tag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';
    totalques.innerHTML = total_ques_tag;
}

function showResultBox() {
    info_box.classList.remove("activateInfo");
    quiz_box.classList.remove("activateQuiz");
    result_box.classList.add("activateResult");
    userScore();
}

function userScore() {
    const scoreText = document.querySelector(".result_box .score_text");
    let scoreText_Tag;
    if (Score > 3) {
        scoreText_Tag = "<span>Congrats! You got <p>" + Score + "</p> out of <p>" + questions.length + "</p></span>";
    } else if (Score > 1) {
        scoreText_Tag = "<span>Nice! You got <p>" + Score + "</p> out of <p>" + questions.length + "</p></span>";
    } else {
        scoreText_Tag = "<span>Sorry! You got <p>" + Score + "</p> out of <p>" + questions.length + "</p></span>";
    }
    scoreText.innerHTML = scoreText_Tag;
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timerCount.textContent = time;
        time--;
        if (time < 9) {
            addZero = timerCount.textContent;
            timerCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timerCount.textContent = "00";
            timerText.textContent = "Timer Off";

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                console.log()
                if (option_list.children[i].textContent === correctAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }

            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add('disabled');
            }
            next_btn.style.display = "block";

        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}