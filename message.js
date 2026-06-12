// ==========================
// MESSAGE APP
// ==========================

// index.js (replace your current message-app JS with this)
let chats = JSON.parse(localStorage.getItem("chats")) || []; // <-- consistent key
let currentChatIndex = null;

const home = document.getElementById("home");                // <-- was missing
const chat_page = document.getElementById("chat_page");
const chat_list = document.getElementById("chat_list");
const new_chat_button = document.getElementById("new_chat_button");
const back_button = document.getElementById("back_button");
const chat_title = document.getElementById("chat_title");
const chat_messages = document.getElementById("chat_messages");
const message_input = document.getElementById("message_input");
const send_button = document.getElementById("send_button");

// safety: if elements not present, stop early (helps debug)
if (!home || !chat_page || !chat_list || !new_chat_button || !back_button || !chat_title || !chat_messages || !message_input || !send_button) {
  console.error("One or more page elements are missing. Check IDs in HTML.");
  throw new Error("Required DOM elements missing");
}

// Render chat list
function renderChats() {
  chat_list.innerHTML = "";
  chats.forEach((c, index) => {
    const div = document.createElement("div");
    div.className = "chat_item";
    // Show title + last message preview if any
    const last = (c.messages && c.messages.length) ? c.messages[c.messages.length - 1].text : "";
    div.innerHTML = `<strong>${c.title}</strong><div class="preview">${last}</div>`;
    div.onclick = () => openChat(index);
    chat_list.appendChild(div);
  });
}

// Open chat
function openChat(index) {
  if (index == null || !chats[index]) return;
  currentChatIndex = index;
  chat_title.textContent = chats[index].title;
  home.classList.add("hidden");
  chat_page.classList.remove("hidden");
  renderMessages();
}

// Render messages
function renderMessages() {
  if (currentChatIndex == null) return;
  chat_messages.innerHTML = "";
  const msgs = chats[currentChatIndex].messages || [];
  msgs.forEach(msg => {
    const div = document.createElement("div");
    div.className = "message " + (msg.type || "received"); // default to received if missing
    div.textContent = msg.text;
    chat_messages.appendChild(div);
  });
  // scroll to bottom
  chat_messages.scrollTop = chat_messages.scrollHeight;
}

// New chat
new_chat_button.onclick = () => {
  const new_chat = {
    title: "Chat " + (chats.length + 1),
    messages: []
  };
  chats.push(new_chat);
  localStorage.setItem("chats", JSON.stringify(chats));
  renderChats();
  openChat(chats.length - 1);
};

// Back button
back_button.onclick = () => {
  home.classList.remove("hidden");
  chat_page.classList.add("hidden");
  localStorage.setItem("chats", JSON.stringify(chats));
  renderChats();
};

// Send message
send_button.onclick = () => {
  if (!message_input.value.trim() || currentChatIndex == null) return;

  chats[currentChatIndex].messages.push({
    text: message_input.value,
    type: "sent"
  });

  // optional: simulate a quick reply so you can see received styling
  chats[currentChatIndex].messages.push({
    text: "Got it 👍",
    type: "received"
  });

  message_input.value = "";
  localStorage.setItem("chats", JSON.stringify(chats));
  renderMessages();
};

// initialize
renderChats();
