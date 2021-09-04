const socket = io("http://localhost:8000");
let click = new Audio("click sound.mp3");
let pop = new Audio("pop sound.mp3");
// obtaining some elements from our dom structure
const form = document.querySelector(".form");
const messageInput = document.querySelector(".tosend");
const messageContainer = document.querySelector(".message-text");
const center = document.querySelector(".center");
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "left") click.play();
};
const append2 = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");

  messageElement.style.backgroundColor = "White";

  messageElement.style.margin = "10px auto";
  messageElement.style.float = "none";
  messageElement.classList.add(position);
  pop.play();
  messageContainer.append(messageElement);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You : ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});

let name1 = prompt("Enter  your name please");
socket.emit("new-user-joined", name1);

socket.on("user-joined", (name1) => {
  append2(`${name1} joined the chat`, "left");
});
socket.on("leave", (name1) => {
  append2(`${name1} left the chat`, "left");
});

socket.on("receive", (data) => {
  append(`${data.name1}:${data.message}`, "left");
});
