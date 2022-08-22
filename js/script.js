const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");

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
}

let que_count = 0;

function showQuestion(index) {
    const que_text = document.querySelector(".que_text");
    const option_list = document.querySelector('.option_list');
    let question = "<span>" + questions[index].question + "<span>";
    let opt_tag = '<div class="option"><span>'+ questions[index].options[0] + '</span></div>'
                + '<div class="option"><span>'+ questions[index].options[1] + '</span></div>'
                + '<div class="option"><span>'+ questions[index].options[2] + '</span></div>'
                + '<div class="option"><span>'+ questions[index].options[3] + '</span></div>';
    que_text.innerHTML = question;
    option_list.innerHTML = opt_tag;
}