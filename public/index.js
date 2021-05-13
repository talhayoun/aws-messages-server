const addMessageButton = document.getElementById("addMessageButton");
const messageContainer = document.getElementById("messageContainer");
const bodyContainer = document.getElementById("bodyContainer");
const form = document.getElementById("form")
const submitButton = document.getElementById("button")
let currentURL = window.location.href.split("?")[0]
const table = document.getElementById("table");
const messageDetails = document.getElementById("messageDetails")

window.addEventListener("load", ()=>{
    fetch(`${currentURL}messages`)
    .then((res)=>{
        if(res.ok){
            return res.json()
        }
    })
    .then((jsonObj)=>{
        for(let i =0; i < jsonObj.length; i++){
            let newTR = document.createElement("tr");
            let newTDTitle = document.createElement("td");
            let newTDBody = document.createElement("button");
            let createP = document.createElement("p");
            
            newTDTitle.innerHTML = jsonObj[i].title;
            newTDBody.innerHTML = "View message";
            newTDBody.className = "buttonStyle"
            createP.innerHTML = jsonObj[i].message
            createP.className = "divMessage"

            newTR.appendChild(newTDTitle);
            newTR.appendChild(newTDBody);
            newTR.appendChild(createP);
            table.appendChild(newTR);

            newTDBody.addEventListener("click", ()=>{
                let createDivTitle = document.createElement("h1");
                createDivTitle.innerHTML = newTDTitle.innerHTML;
                messageDetails.appendChild(createDivTitle);
                messageDetails.appendChild(createP);


                createDivTitle.style.borderBottom = "2px solid black"
                createP.style.marginTop = "10px"
                messageDetails.style.display = "block"
                bodyContainer.style.filter = "opacity(0.2)"
                createP.style.display = "block"
            })
        }
    })
    .catch((err)=>{
        console.log(err)
    })
})


window.addEventListener("click", (event)=>{
    if (event.target !== messageContainer && event.target !== addMessageButton && event.target.localName !== "button") {
        if(event.target.parentElement !== form && event.target.parentElement !== messageContainer && event.target !== messageDetails && event.target.parentElement !== messageDetails ){
            messageContainer.style.display = "none";
            bodyContainer.style.filter = "opacity(1)"
            messageDetails.style.display = "none"
            while(messageDetails.hasChildNodes()){
                messageDetails.removeChild(messageDetails.lastChild)
            }
        }
    }
})

addMessageButton.addEventListener("click", ()=>{
    messageContainer.style.display = "block"
    bodyContainer.style.filter = "opacity(0.2)"
})


const titleInput = document.getElementById("title");
const messageBody = document.getElementById("messageBody");

submitButton.addEventListener("click", ()=>{
    let details = {
        title: titleInput.value,
        message: messageBody.value
    }
    fetch(currentURL, {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res)=>{
        if(res.ok){
            window.location.reload()
        }
        })
    .catch((err)=>{
        console.log(err)
        })
})