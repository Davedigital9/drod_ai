// DOM Elements
const chatHistory = document.querySelector(".chat-history");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-btn");
const loadingResponse = document.querySelector(".loading_response");
const responseView = document.querySelector(".response_view");

// Event Listeners
sendButton.addEventListener("click", handleUserInput);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleUserInput();
  }
});

// Function to handle user input
function handleUserInput() {
  const userMessage = userInput.value.trim();
  if (userMessage) {
    addMessageToChat("user", userMessage);
    userInput.value = "";
    showLoadingResponse();
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage);
      hideLoadingResponse();
      addMessageToChat("ai", aiResponse);
    }, 1500);
  }
}

// Function to add a message to the chat
function addMessageToChat(sender, message) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(
    sender === "user" ? "question_container" : "response_container"
  );

  const innerDiv = document.createElement("div");
  innerDiv.classList.add(sender === "user" ? "question" : "response");

  if (sender === "ai") {
    const img = document.createElement("img");
    img.src = "images/ai.png";
    img.alt = "AI image";
    innerDiv.appendChild(img);
  }

  const paragraph = document.createElement("p");
  paragraph.textContent = message;
  innerDiv.appendChild(paragraph);

  messageDiv.appendChild(innerDiv);
  chatHistory.appendChild(messageDiv);

  // Scroll to the bottom of the chat
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Function to show loading response
function showLoadingResponse() {
  loadingResponse.style.display = "flex"
}

// Function to hide loading response
function hideLoadingResponse() {
  loadingResponse.style.display = "none"
}

// Function to generate AI response (placeholder)
function generateAIResponse(userMessage) {
  // This is a placeholder. In a real application, you would call an API here.
  const responses = [
    "That's an interesting question. Let me think about it.",
    "I understand your query. Here's what I think...",
    "Based on my knowledge, I would say...",
    "That's a complex topic. Let me break it down for you.",
    "I'm not entirely sure, but here's my best attempt at an answer.",
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}

// Initialize the chat with a greeting
window.addEventListener("load", () => {
  addMessageToChat("ai", "Hello! I'm Droid AI. How can I assist you today?")
})

