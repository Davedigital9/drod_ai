// DOM Elements
const chatHistory = document.querySelector(".chat-history")
const messagesContainer = document.querySelector(".messages-container")
const userInput = document.getElementById("user-input")
const chatForm = document.getElementById("chat-form")
const newChatBtn = document.getElementById("new-chat")
const clearChatBtn = document.getElementById("clear-chat")
const toggleThemeBtn = document.getElementById("toggle-theme")
const signOutBtn = document.getElementById("sign-out")
const currentChatTitle = document.getElementById("current-chat-title")

// Chat history
const chats = []
let currentChatId = null

// Event Listeners
chatForm.addEventListener("submit", handleUserInput)
newChatBtn.addEventListener("click", startNewChat)
clearChatBtn.addEventListener("click", clearCurrentChat)
toggleThemeBtn.addEventListener("click", toggleTheme)
signOutBtn.addEventListener("click", signOut)

// Functions
function handleUserInput(e) {
  e.preventDefault()
  const userMessage = userInput.value.trim()
  if (userMessage) {
    addMessageToChat("user", userMessage)
    userInput.value = ""
    userInput.style.height = "auto"

    // Simulate AI response
    showTypingIndicator()
    generateAIResponse(userMessage)
      .then(aiResponse => {
        removeTypingIndicator()
        addMessageToChat("ai", aiResponse)
      })
      .catch(error => {
        removeTypingIndicator();
        addMessageToChat("ai", "Sorry, I couldn't process your request.");
        console.error("Error generating AI response:", error);
      });
  }
}

function addMessageToChat(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", sender);
  messageElement.textContent = message;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Update current chat in history
  if (currentChatId !== null) {
    const chatIndex = chats.findIndex((chat) => chat.id === currentChatId)
    if (chatIndex !== -1) {
      chats[chatIndex].messages.push({ sender, message })
      updateChatHistory()
    }
  }
}

function showTypingIndicator() {
  const typingIndicator = document.createElement("div")
  typingIndicator.classList.add("message", "ai", "typing-indicator")
  typingIndicator.innerHTML = "<span></span><span></span><span></span>"
  messagesContainer.appendChild(typingIndicator)
  messagesContainer.scrollTop = messagesContainer.scrollHeight
}

function removeTypingIndicator() {
  const typingIndicator = messagesContainer.querySelector(".typing-indicator")
  if (typingIndicator) {
    typingIndicator.remove()
  }
}

async function generateAIResponse(userMessage) {
  try {
    const response = await axios.post('/api/generate-ai-response', { prompt: userMessage });
  
    return response.data.response;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

/*
async function generateAIResponse(userMessage) {
  try {
    const response = await axios.post('http://localhost:3000/generate-ai-response', {
      prompt: userMessage
    });
    return response.data.response;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
*/
function startNewChat() {
  currentChatId = Date.now()
  const newChatTitle = `Chat ${chats.length + 1}`
  chats.unshift({ id: currentChatId, title: newChatTitle, messages: [] })
  updateChatHistory()
  clearMessages()
  currentChatTitle.textContent = newChatTitle
}

function clearCurrentChat() {
  clearMessages()
  if (currentChatId !== null) {
    const chatIndex = chats.findIndex((chat) => chat.id === currentChatId)
    if (chatIndex !== -1) {
      chats[chatIndex].messages = []
      updateChatHistory()
    }
  }
}

function clearMessages() {
  messagesContainer.innerHTML = ""
}

function updateChatHistory() {
  chatHistory.innerHTML = ""
  chats.forEach((chat) => {
    const chatElement = document.createElement("div")
    chatElement.classList.add("chat-history-item")
    if (chat.id === currentChatId) {
      chatElement.classList.add("active")
    }
    chatElement.textContent = chat.title
    chatElement.addEventListener("click", () => loadChat(chat.id))
    chatHistory.appendChild(chatElement)
  })
}

function loadChat(chatId) {
  currentChatId = chatId
  const chat = chats.find((c) => c.id === chatId)
  if (chat) {
    clearMessages()
    chat.messages.forEach((msg) => addMessageToChat(msg.sender, msg.message))
    currentChatTitle.textContent = chat.title
    updateChatHistory()
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode")
  const isDarkMode = document.body.classList.contains("dark-mode")
  toggleThemeBtn.innerHTML = `<span class="material-icons-round">${isDarkMode ? "light_mode" : "dark_mode"}</span>`
}

function signOut() {
  // Implement sign out functionality here
  alert("Sign out functionality to be implemented")
}

// Initialize the app
startNewChat()

// Adjust textarea height based on content
userInput.addEventListener("input", function () {
  this.style.height = "auto"
  this.style.height = this.scrollHeight + "px"
})