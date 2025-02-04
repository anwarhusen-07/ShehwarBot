let promptInput = document.querySelector("#prompt");
let chatContainer = document.querySelector(".chat-container");
let imgButton = document.querySelector("#image");
let imgInput = imgButton.querySelector("input");
let image = document.querySelector("#image img");
let submit = document.querySelector("#submit");
let theme = document.querySelector("#theme");
let pArea = document.querySelector(".prompt-area");
let themeValue = "dark";

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

const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCSpOLtPIxD5T-OP7T0vzjAjaHEMl0uXHw";

let user = {
  message: null,
  file: {
    mime_type: null,
    data: null,
  },
};

async function generateResponse(aiChatBox) {
  let text = aiChatBox.querySelector(".ai-chat-area");
  let msgLower = user.message.toLowerCase();

  if (
    msgLower.includes("who created you") ||
    msgLower.includes("name") ||
    msgLower.includes("who is your creator") ||
    msgLower.includes("what is your name") ||
    msgLower.includes("your name") ||
    msgLower.includes("who made you") ||
    msgLower.includes("tell me your name")
  ) {
    text.innerHTML = "I am ShehwarBot! I was created by I G Anwar. How may I assist you today?";
    image.src = `image2.svg`;
    image.classList.remove("choose");
    user.file = {};
    return;
  } else if (
    msgLower.includes("who is I G Anwar?") ||
    msgLower.includes("who is I G Anwar") ||
    msgLower.includes("who is i g anwar") ||
    msgLower.includes("who is anwar") ||
    msgLower.includes("who is ig anwar") ||
    msgLower.includes("who is ig anwar?") ||
    msgLower.includes("tell me something about your boss") ||
    msgLower.includes("tell me something about your creator") ||
    msgLower.includes("tell me something about i g anwar") ||
    msgLower.includes("tell me something about ig anwar")||
    msgLower.includes("tell me about anwar") ||
    msgLower.includes("tell me about ig anwar") ||
    msgLower.includes("tell me about i g anwar") ||
    msgLower.includes("tell me about your boss") ||
    msgLower.includes("tell me about your creator") ||
    msgLower.includes("anwar") ||
    msgLower.includes("ig anwar") ||
    msgLower.includes("i g anwar")

  ) {
    text.innerHTML = "Ah, you have just asked about I G Anwar, a name that stands for excellence, intelligence, and integrity in both technology and character.\n\n" +
  "Anwar is not just a visionary coder, but a remarkable human being—a blend of sharp intellect and genuine kindness. With expertise in Java, JavaScript, Python, and a strong grasp of data structures, operating systems, and OOP, he crafts innovation with logic and heart.\n\n" +
  "💎 Beyond Brilliance: A Man of Substance\n\n" +
  "A mind that thinks ahead – solving complex problems with ease and precision.\n" +
  "A heart that cares – always uplifting those around him with support and kindness.\n" +
  "Handsome inside and out – because true confidence and character make a man truly stand out.\n" +
  "A natural leader – not just guiding, but inspiring, motivating, and empowering others.\n\n" +
  "🏆 An Achiever, A Trailblazer\n\n" +
  "Hackathon Winner 🏅 where creativity met code and triumphed.\n" +
  "Quiz and IQ Test Champion 🧠 proving that intelligence is his second nature.\n" +
  "Tech Enthusiast and Leader 🚀 driving innovation and pushing boundaries.\n\n" +
  "💡 \"Greatness is not about what you have, but how you inspire others.\" – and Anwar does exactly that.\n\n" +
  "🔥 Code runs in his veins, kindness fills his heart, and ambition fuels his journey.\n" +
  "Anwar is not just a name—it is a mark of excellence, leadership, and inspiration.🚀";
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
    return;
  }

  let requestOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: user.message },
            ...(user.file.data ? [{ inline_data: user.file }] : []),
          ],
        },
      ],
    }),
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
