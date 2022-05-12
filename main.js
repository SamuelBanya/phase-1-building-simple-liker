// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
function likeCallback(e) {
    const heart = e.target;
    console.log("e.target: ", e.target);
    // if (e.target) {
    mimicServerCall()
        .then(function(serverMessage) {
            alert("You notified the server!");
            alert(serverMessage);
            heart.innerText = EMPTY_HEART;
            heart.style.color = "red";
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
            }, 3000)
        })
    // }
    
}

document.addEventListener("click", likeCallback);

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
