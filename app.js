import MCQs from "./questions.js";

// start section
let start = document.querySelector('#start');

// guide section
let guide = document.querySelector('#guide');
let exit = document.querySelector('#exit');
let continueBtn = document.querySelector('#continue');

// Quiz section
let quiz = document.querySelector('#quiz');
let time = document.querySelector('#time');

// question section
let questionNo = document.querySelector('#questionNo');
let questionText = document.querySelector('#questionText');

// multiple choices of questions
let option1 = document.querySelector('#option1');
let option2 = document.querySelector('#option2');
let option3 = document.querySelector('#option3');
let option4 = document.querySelector('#option4');


// correct and next Button
let total_correct = document.querySelector('#total_correct');
let next_question = document.querySelector('#next_question');

// result section
let result = document.querySelector('#result');
let quit = document.querySelector('#quit');
let startAgain = document.querySelector('#startAgain');

// get all 'h4' from quiz section (MCQs)
let choice_que = document.querySelectorAll('.choice_que');

let index = 0;
let timer = 20;
let interval = 0;

// total points
let correct = 0;

// store answer value
let UserAns = undefined;

// what happens when 'Start' is clicked

start.onclick = () => {
	start.style.display = 'none';
	guide.style.display = 'block';
}

exit.onclick = () => window.location.reload();

// creating timer for quiz once continue is clicked

let countDown = () => {
	if (timer === 0 ){
		clearInterval(interval);
	} else {
		timer--;
		time.innerText = timer;
	}
}

// setInterval(countDown, 1000);

let loadData = () => {
	questionNo.innerText = `${index + 1} `;
	questionText.innerText = MCQs[index].question;
	option1.innerText = MCQs[index].choice1;
	option2.innerText = MCQs[index].choice2;
	option3.innerText = MCQs[index].choice3;
	option4.innerText = MCQs[index].choice4;

	// timer start
	timer = 20;
};
// loadData();

continueBtn.onclick = () => {
	quiz.style.display = 'block';
	guide.style.display = 'none';
	
	// load timer
	interval = setInterval(countDown, 1000);

	// load questions
	loadData();

	// remove all active classes
	choice_que.forEach(remActive => {
		remActive.classList.remove('active');
	});
};


choice_que.forEach((choices, choiceNo) => {
	choices.onclick = () => {
		choices.classList.add('active');

		// check answer
		if (choiceNo === MCQs[index].answer){
			correct++;
		}else {
			correct+=0
		}
		clearInterval(interval)

		// disable other options

		for(let i = 0; i<=3; i++) {
			choice_que[i].classList.add('disabled')
		}
	}
})

next_question.onclick = () => {
	
	if (index !== MCQs.length - 1) {
		index++;
		choice_que.forEach(remActive => {
			remActive.classList.remove('active');
			remActive.classList.remove('disabled');
		});
		total_correct.innerHTML = `${correct} out of ${MCQs.length} Questions`;
	} else {
		index = 0;
		clearInterval(interval);
		quiz.style.display = 'none';
		result.style.display = 'block';
		points.innerHTML = `you got ${correct} out of ${MCQs.length} Questions`;
	}
	// questions 
	loadData();

	// result
	total_correct.style.visibility = 'visible';
	clearInterval(interval);
	interval = setInterval(countDown, 1000);
};

quit.onclick = () => window.location.reload();

startAgain.onclick = () => {
	result.style.display = 'none';
	guide.style.display = 'block';
};