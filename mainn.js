const screen = document.getElementById('screen');

const state = {
    quizListUrl: '',
    quizUrl: '',
    subjectName: '',
    quizName: '',
    question: [],
    currentIndex: 0,
    score: 0,
};

function loadSubjects() {
    fetch('https://mayankvermavns.github.io/myquiz/subjects.json')
        .then(res => res.json())
        .then(subjects => {
            screen.innerHTML = '<h2>select subject</h2>';
            subjects.forEach(sub => {
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
            screen.innerHTML = `<h2>${state.subjectName}:Select Quiz</h2>`;
            quizzes.forEach(quiz => {
                const btn = document.createElement('button');
                btn.textContent = quiz.quizName;
                btn.onclick = () => {
                    state.quizUrl = quiz.quizUrl;
                    state.quizName = quiz.quizName;
                    loadQuizQuestion()
                };
                screen.appendChild(btn);
            });
        });
}

function loadQuizQuestion() {
    fetch(state.quizUrl)
        .then(res => res.json())
        .then(question => {
            state.question = question;
            state.currentIndex = 0;
            state.score = 0;
            showQuestion();
        });
}

function showQuestion() {
    const q = state.question[state.currentIndex];
    screen.innerHTML = `<h2>Q${state.currentIndex + 1}:${q.question}</h2>`;
    q.question.forEach(opt => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.onclick = () => {
            if (opt === q.answer) state.score++;
            state.currentIndex++;
            if (state.currentIndex < state.question.length) {
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
    <h>Quiz Completed!</h2>
    <p><strong>${state.quizName}</strong></p>
    <p>Your score: ${state.score}/${state.question.length}</p>
    <button onclick="loadSubjects()">Restart</button
    `;
}


loadSubjects();