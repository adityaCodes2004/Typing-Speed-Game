const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');


// set values

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph(){
    const paragraph = ["Often it does seem a pity that Noah and his party did not miss the boat.",
        "Sometimes the questions are complicated and the answers are simple.",
        "Nothing is more pleasing and engaging than the sense of having conferred benefits. Not even the gratification of receiving them.",
        "The true meaning of religion is thus not simply morality, but morality touched by emotion.",
        "We distinguish the excellent man from the common man by saying that the former is the one who makes great demands upon himself, and the latter who makes no demands on himself.",
        "Never despair; but if you do, work on in despair.",
        "I don't think necessity is the mother of invention - invention, in my opinion, arises directly from idleness, possibly also from laziness. To save oneself trouble.",
        "A finished person is a boring person.",
        "An ardent supporter of the hometown team should go to a game prepared to take offense, no matter what happens.",
        "We allow our ignorance to prevail upon us and make us think we can survive alone, alone in patches, alone in groups, alone in races, even alone in genders.",
        "If you wish success in life, make perseverance your bosom friend, experience your wise counselor, caution your elder brother and hope your guardian genius.",
        "Sometimes I think the surest sign that intelligent life exists elsewhere in the universe is that none of it has tried to contact us.",
        "Few things are impossible to diligence and skill. Great works are performed not by strength, but perseverance."];

        const randomIndex = Math.floor(Math.random() * paragraph.length);
        typingText.innerHTML='';

        for(const char of paragraph[randomIndex]) {
            console.log(char);
            typingText.innerHTML+=`<span>${char}</span>`;
        }

        typingText.querySelectorAll('span')[0].classList.add('active');
        document.addEventListener('keydown', () => input.focus());
        typingText.addEventListener('click',()=>{
            input.focus();
        })
}

// Handle User input

function initTyping() {
const char = typingText.querySelectorAll('span');
const typedChar = input.value.charAt(charIndex);

if(charIndex < char.length && timeLeft>0) {

        if(!isTyping) {
            timer = setInterval(initTimer,1000);
            isTyping = true;
        }



    if(char[charIndex].innerText === typedChar) {
        char[charIndex].classList.add('correct');
        console.log("correct");
    } else {
        mistake++;
        char[charIndex].classList.add('incorrect');
        console.log("incorrect");
    }
    charIndex++;
    char[charIndex].classList.add('active');
    mistakes.innerText = mistake;
    cpm.innerText = charIndex - mistake;
} else {
    clearInterval(timer);
    input.value = '';
}
}


function initTimer() {
    if(timeLeft>0) {
        timeLeft--;
        time.innerText = timeLeft;
        let wpmVal = Math.round(((charIndex - mistake)/5) / (maxTime - timeLeft)* 60);    // Formula for WPM 
        wpm.innerText = wpmVal;
    }
    else {
        clearInterval(timer);
    }
}

function reset() {    // Try again button 
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerHTML = timeLeft;
    input.value = '';
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerHTML = 0;
    cpm.innerHTML = 0;
    mistakes.innerHTML = 0;
}



input.addEventListener('input',initTyping);
btn.addEventListener('click',reset);
loadParagraph();