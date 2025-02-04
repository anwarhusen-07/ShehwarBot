let promptInput = document.querySelector("#prompt");
let chatContainer = document.querySelector(".chat-container");
let imgButton = document.querySelector("#image");
let imgInput = imgButton.querySelector("input");
let image=document.querySelector("#image img")
let submit=document.querySelector("#submit")
let theme=document.querySelector("#theme")
let pArea=document.querySelector(".prompt-area")
let themeValue="dark"
theme.addEventListener("click",()=>{
  if(themeValue=="dark"){
    document.body.style.backgroundColor="#fff"
    document.body.style.color="#000"
    chatContainer.style.backgroundColor="#fff"
    chatContainer.style.color="#fff"
    promptInput.style.color = "#000"; 
    promptInput.style.backgroundColor = "#fff"; 
    promptInput.style.boxShadow = "5px 5px 10px black";
    pArea.style.backgroundColor = "white";
    themeValue="light"

}
else{
  document.body.style.backgroundColor="#17181ade"
  document.body.style.color="#fff"
  chatContainer.style.backgroundColor="#353638"
  chatContainer.style.color="#fff"
  promptInput.style.backgroundColor="#232326"
  promptInput.style.color="#fff"
  submit.style.backgroundColor="#000"
  pArea.style.backgroundColor = "#353638";
  promptInput.style.boxShadow = "1px 1px 5px black";
  themeValue="dark"

}})

const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCSpOLtPIxD5T-OP7T0vzjAjaHEMl0uXHw";

let user = {
  message: null,
  file: {
    mime_type: null,
    data: null,
  }
};

async function generateResponse(aiChatBox) {
  let text = aiChatBox.querySelector(".ai-chat-area");

  let requestOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: user.message },
            ...(user.file.data ? [{ inline_data: user.file }] : []),
          ]
        }
      ]
    })
  };

  try {
    
    let response = await fetch(API_URL, requestOption);
    let data = await response.json();
    let apiResponse = data.candidates[0].content.parts[0].text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .trim();
    text.innerHTML = apiResponse;

  } catch (error) {
    console.log(error);
  } finally {
    chatContainer.scrollTo({
      top: chatContainer.scrollHeight,
      behavior: "smooth",
    });
    image.src=`image2.svg`
      image.classList.remove("choose")
      user.file={}
  }
}

function createChatBox(html, classes) {
  let div = document.createElement("div");
  div.innerHTML = html;
  div.classList.add(classes);
  return div;
}

function handleChatResponse(message) {
  user.message = message;
  let html = ` <img
          src="user-image1.jpeg"
          alt="bot image"
          id="user-image"
          width="5%"
          
        />
        <div class="user-chat-area">
          ${message}  
          ${user.file.data ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg"/>` : " "}
        </div>`;
  promptInput.value = "";
  let userChatbox = createChatBox(html, "user-chat-box");
  chatContainer.appendChild(userChatbox);
  chatContainer.scrollTo({
    top: chatContainer.scrollHeight,
    behavior: "smooth",
  });
  setTimeout(() => {
    let html = `<img src="logo1.jpg" alt="ai image" id="ai-image" width="5%" />
    <div class="ai-chat-area">
         <img src="load9.gif" alt="" width="30%" class="load" height="30px">
  </div>`;
    let aiChatbox = createChatBox(html, "ai-chat-box");
    chatContainer.appendChild(aiChatbox);
    generateResponse(aiChatbox);
  }, 300);
  
}

promptInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    image.src=`image2.svg`
      image.classList.remove("choose")
    handleChatResponse(promptInput.value);
  }

} );
submit.addEventListener("click",()=>{
      image.src=`image2.svg`
      image.classList.remove("choose")
    
    handleChatResponse(promptInput.value);
})

imgInput.addEventListener("change", () => {
  const file = imgInput.files[0];
  if (!file) return;

  let reader = new FileReader();
  reader.onload = (e) => {
    let base64string = e.target.result.split(",")[1];
    user.file = {
      mime_type: file.type,
      data: base64string,
    };
      image.src=`data:${user.file.mime_type};base64,${user.file.data}`
      image.classList.add("choose")
      imgInput.value = "";

  };


  reader.readAsDataURL(file);
});

imgButton.addEventListener("click", () => {
  imgButton.querySelector("input").click();
});
