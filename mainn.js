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
    console.log("Loading Subjects");
    fetch('https://mayankvermavns.github.io/myquiz/subjects.json')
        .then(res => res.json())
        .then(subjects => {
            screen.innerHTML = '<h2>Select Subject</h2>';
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
    console.log("Loading Quizzes");
    fetch(state.quizListUrl)
        .then(res => res.json())
        .then(quizzes => {
            screen.innerHTML = `<h2>${state.subjectName}: Select Quiz</h2>`;
            quizzes.forEach(quiz => {
                const btn = document.createElement('button');
                btn.textContent = quiz.quizName;
                btn.onclick = () => {
                    state.quizUrl = quiz.quizUrl;
                    state.quizName = quiz.quizName;
                    loadQuizQuestions();
                };
                screen.appendChild(btn);
            });
        });
}

function loadQuizQuestions() {
    console.log("Loading Questions");
    fetch(state.quizUrl)
        .then(res => res.json())
        .then(questions => {
            state.questions = questions;
            state.currentIndex = 0;
            state.score = 0;
            showQuestions();
        });
}

function showQuestions() {
    const q = state.questions[state.currentIndex];
    screen.innerHTML = `<h2>Q${state.currentIndex + 1}: ${q.questions}</h2>`;
    let newidno = 0;
    q.options.forEach(opt => {
        const btn = document.createElement('input');
        btn.type = "radio";
        btn.name = "option";
        btn.value = opt;
        btn.id = `rd${newidno}`;

        const lbl = document.createElement("label");
        lbl.for = `rd${newidno}`;
        newidno++;
        lbl.textContent = opt;
        /** 
        btn.onclick = () => {
            if (opt === q.answere) state.score++;
            state.currentIndex++;
            if (state.currentIndex < state.questions.length) {
                showQuestions();
            } else {
                showResult();
            }
        };**/
        screen.appendChild(btn);
        screen.appendChild(lbl);
        screen.appendChild(document.createElement("br"));
    });


    const nextbtn = document.createElement("button");
    nextbtn.textContent = "Save & Next";
    nextbtn.onclick = () => {
        const selected = document.querySelector('input[name="option"]:checked');
        if (!selected) {
            alert("Please select an option");
            return;
        }

        if (selected.value === q.answere) {
            state.score++;

        }

        state.currentIndex++;
        if (state.currentIndex < state.questions.length) {
            showQuestions();
        } else {
            showResult();
        }
    };
    screen.appendChild(nextbtn);
}


function showResult() {
    screen.innerHTML = `
    <h2>🎉 Quiz Completed!</h2>
    <p><strong>${state.quizName}</strong></p>
    <p>Your Score: ${state.score}/${state.questions.length}</p>
    <button onclick="loadSubjects()">Restart</button>
  `;
}

loadSubjects();