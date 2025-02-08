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
