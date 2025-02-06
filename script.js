let promptInput = document.querySelector("#prompt");
let chatContainer = document.querySelector(".chat-container");
let imgButton = document.querySelector("#image");
let imgInput = imgButton.querySelector("input");
let image = document.querySelector("#image img");
let submit = document.querySelector("#submit");
let theme = document.querySelector("#theme");
let pArea = document.querySelector(".prompt-area");
let themeValue = "dark";

let conversationHistory = [];

theme.addEventListener("click", () => {
  if (themeValue === "dark") {
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#000";
    chatContainer.style.backgroundColor = "#fff";
    chatContainer.style.color = "#fff";
    promptInput.style.color = "#000";
    promptInput.style.backgroundColor = "#fff";
    promptInput.style.boxShadow = "3px 5px 10px black";
    pArea.style.backgroundColor = "white";
    imgButton.style.boxShadow = "2px 2px 5px #484a48";
    submit.style.boxShadow = "1px 1px 5px  #484a48";
    themeValue = "light";
  } else {
    document.body.style.backgroundColor = "#17181ade";
    document.body.style.color = "#fff";
    chatContainer.style.backgroundColor = "#353638";
    chatContainer.style.color = "#fff";
    promptInput.style.backgroundColor = "#232326";
    promptInput.style.color = "#fff";
    submit.style.backgroundColor = "#000";
    pArea.style.backgroundColor = "#353638";
    promptInput.style.boxShadow = "1px 1px 5px black";
    imgButton.style.boxShadow = "1px 1px 5px #fffbfb";
    submit.style.boxShadow = "1px 1px 5px #fffbfb";
    themeValue = "dark";
  }
});

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCSpOLtPIxD5T-OP7T0vzjAjaHEMl0uXHw";

let user = {
  message: null,
  file: {
    mime_type: null,
    data: null,
  },
}
async function generateResponse(aiChatBox) {
  let text = aiChatBox.querySelector(".ai-chat-area");
  let msgLower = user.message.toLowerCase();
  if (
    msgLower === "what is your name" ||
    msgLower === "your name" ||
    msgLower === "tell me your name"
  ) {
    text.innerHTML =
      "Hello, I'm ShehwarBot – your intelligent AI companion, here to assist you with precision and care.";
    image.src = `image2.svg`;
    image.classList.remove("choose");
    conversationHistory.push({ role: "bot", message: text.innerHTML });
    user.file = {};
    return;
  } else if (
    msgLower === "who created you" ||
    msgLower === "who is your creator?" ||
    msgLower === "who created you?" ||
    msgLower === "who is your creator" ||
    msgLower === "who made you?" ||
    msgLower === "who developed you" ||
    msgLower === "who developed you?" ||
    msgLower === "who made you"
  ) {
    text.innerHTML =
      "I am Designed and Developed by I G Anwar. How may I assist you today?";
    image.src = `image2.svg`;
    image.classList.remove("choose");
    conversationHistory.push({ role: "bot", message: text.innerHTML });
    user.file = {};
    return;
  } else if (
    msgLower === "tell me about your creator" ||
    msgLower === "who is i g anwar?" ||
    msgLower === "who is i g anwar" ||
    msgLower === "who is anwar" ||
    msgLower === "who is ig anwar" ||
    msgLower === "who is ig anwar?" ||
    msgLower === "tell me something about your boss" ||
    msgLower === "tell me something about your creator" ||
    msgLower === "tell me something about i g anwar" ||
    msgLower === "tell me something about ig anwar" ||
    msgLower === "tell me about anwar" ||
    msgLower === "tell me about ig anwar" ||
    msgLower === "tell me about i g anwar" ||
    msgLower === "tell me about your boss" ||
    msgLower === "anwar" ||
    msgLower === "ig anwar" ||
    msgLower === "i g anwar"
  ) {
    text.innerHTML =
      "Ah, you have just asked about I G Anwar, \n\nI G Anwar exemplifies excellence and innovation in technology.\n\nAs a visionary coder with expertise in Java, JavaScript, and Python, along with a solid grasp of data structures, operating systems, and OOP, he combines technical mastery with strong leadership and integrity.\n\nHis ability to drive innovation and inspire those around him distinguishes him as a true professional.";
    chatContainer.scrollTo({
      top: chatContainer.scrollHeight,
      behavior: "smooth",
    });
    conversationHistory.push({ role: "bot", message: text.innerHTML });
    return;
  }
  
  
  let conversationText = conversationHistory
    .map(entry => entry.role === "user" ? "User: " + entry.message : entry.message)
    .join("\n");

  
  let requestOption = {
    method: "POST",
    headers: { 'Content-Type': "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            
            ...(user.file.data ? [{ inline_data: user.file }] : []),
            
            { text: conversationText }
          ],
        },
      ],
    }),
  };
  
  try {
    let response = await fetch(API_URL, requestOption);
    let data = await response.json();
    
    if (
      data &&
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0
    ) {
      let part = data.candidates[0].content.parts[0];
      let apiResponse = "";
      if (part.text && part.text.trim() !== "") {
        apiResponse = part.text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      } else if (part.inline_data && part.inline_data.trim() !== "") {
        apiResponse = part.inline_data.trim();
      }
      text.innerHTML = apiResponse;
      conversationHistory.push({ role: "bot", message: apiResponse });
    } else {
      console.error("Unexpected API response structure", data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
    image.src = `image2.svg`;
    image.classList.remove("choose");
    user.file = {};
  }
}

function createChatBox(html, classes) {
  let div = document.createElement("div");
  div.innerHTML = html;
  div.classList.add(classes);
  return div;
}

function handleChatResponse(message) {
  if (message.trim() === "") return;
  user.message = message.trim();
  conversationHistory.push({ role: "user", message: user.message });
  let html = ` 
    <img src="user-image1.jpeg" alt="bot image" id="user-image" width="5%" />
    <div class="user-chat-area">
      ${message}  
      ${user.file.data ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg"/>` : ""}
    </div>`;
  promptInput.value = "";
  let userChatbox = createChatBox(html, "user-chat-box");
  chatContainer.appendChild(userChatbox);
  chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
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
  if (e.key === "Enter" && promptInput.value.trim() !== "") {
    image.src = `image2.svg`;
    image.classList.remove("choose");
    handleChatResponse(promptInput.value.trim());
  }
});

submit.addEventListener("click", () => {
  if (promptInput.value.trim() !== "") {
    image.src = `image2.svg`;
    image.classList.remove("choose");
    handleChatResponse(promptInput.value.trim());
  }
});

imgInput.addEventListener("change", () => {
  const file = imgInput.files[0];
  if (!file) return;
  let reader = new FileReader();
  reader.onload = (e) => {
    let base64string = e.target.result.split(",")[1];
    user.file = { mime_type: file.type, data: base64string };
    image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
    image.classList.add("choose");
    imgInput.value = "";
  };
  reader.readAsDataURL(file);
});

imgButton.addEventListener("click", () => {
  imgButton.querySelector("input").click();
});
