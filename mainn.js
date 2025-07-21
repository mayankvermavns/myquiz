const screen = document.getElementById('screen');

const state = {
    quizListUrl: '',
    quizUrl: '',
    subjectName: '',
    quizName: '',
    questions: [],
    currentIndex: 0,
    score: 0,
};

function loadSubjects() {
    fetch('https://mayankvermavns.github.io/My-Projects/subjectss.json')
        .then(res => res.json())
        .then(subjectss => {
            screen.innerHTML = '<h2>select subject</h2>';
            subjectss.forEach(sub => {
                const btn = document.createElement('button');
                btn.textContent = sub.subjectName;
                btn.onclick = () => {
                    state.quizListUrl = sub.quizListUrl;
                    state.subjectName = sub.subjectName;
                    loadQuizzes();
                };
                screen.appendChild(btn);
            });
        });
}

function loadQuizzes() {
    fetch(state.quizListUrl)
        .then(res => res.json())
        .then(quizzes => {
            screen.innerHTML = `<h2>${state.subjectName}:select quize</h2>`;
            quizzes.forEach(quiz => {
                const btn = document.createElement('button');
                btn.textContent = quiz.quizName;
                btn.onclick = () => {
                    state.quizListUrl = quiz.quizListUrl;
                    state.quizName = quiz.quizName;
                    loadQuizQuestions()
                };
                screen.appendChild(btn);
            });
        });
}

function loadQuizQuestions() {
    fetch(state.quizUrl)
        .then(res => res.json())
        .then(questions => {
            state.questions = questions;
            state.currentIndex = 0;
            state.score = 0;
            showQuestion();
        });
}

function showQuestion() {
    const q = state.questions[state.currentIndex];
    screen.innerHTML = `<h2>Q${state.currentIndex + 1}:${q.questions}</h2>`;
    q.questions.forEach(opt => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.onclick = () => {
            if (opt === q.answere) state.score++;
            state.currentIndex++;
            if (state.currentIndex < state.questions.length) {
                showQuestion();

            } else {
                showResult()
            }
        };
        screen.appendChild(btn);
    });
}

function showResult() {
    screen.innerHTML = `
    <h>Quiz Complete!</h2>
    <p><strong>${state.quizName}</strong></p>
    <p>your score: ${state.score}/${state.questions.length}</p>
    <button onclick="loadSubjects()">Restart</button
    `;
}
loadSubjects();