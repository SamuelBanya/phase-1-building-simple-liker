// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
function likeCallback(e) {
    const heart = e.target;
    console.log("e.target: ", e.target);
    console.log("e.target.classList: ", e.target.classList);
    // MDN for '.contains()':
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
    // MDN for 'DOMTokenList.contains()':
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/contains
    // Example article for '.contains()' function:
    // https://www.javascripttutorial.net/dom/css/check-if-an-element-contains-a-class/
    if (! e.target.classList.contains("activated-heart")) {
        console.log("Event object does not include 'activated-heart' class!")
        mimicServerCall()
            .then((serverMessage) => {
                alert("You notified the server!");
                alert(serverMessage);
                heart.textContent = FULL_HEART;
                heart.classList.add("activated-heart");
            })
            .catch(function(error) {
                alert("Something went wrong!");
                const modalDiv = document.querySelector("#modal");
                modalDiv.classList.remove("hidden");
                const modalPara = document.querySelector("#modal-message");
                modalPara.textContent = error.message;
                setTimeout(() => {
                    modalDiv.classList.add("hidden");
                }, 3000);
            })
    }

    if (e.target.classList.contains("activated-heart")) {
        console.log("Event object DOES include 'activated-heart' class!");
        mimicServerCall()
            .then((serverMessage) => {
                alert("You notified the server!");
                alert(serverMessage);
                heart.textContent = EMPTY_HEART;
                heart.classList.remove("activated-heart");
            })
            .catch(function(error) {
                alert("Something went wrong!");
                const modalDiv = document.querySelector("#modal");
                modalDiv.classList.remove("hidden");
                const modalPara = document.querySelector("#modal-message");
                modalPara.textContent = error.message;
                setTimeout(() => {
                    modalDiv.classList.add("hidden");
                }, 3000);
            })
    }
}

const likeGlyphs = document.querySelectorAll(".like-glyph");

likeGlyphs.forEach((likeGlyph) => {
    likeGlyph.addEventListener("click", likeCallback);
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            let isRandomFailure = Math.random() < .2
            if (isRandomFailure) {
                reject("Random server error. Try again.");
            } else {
                resolve("Pretend remote server notified of action!");
            }
        }, 300);
    });
}
