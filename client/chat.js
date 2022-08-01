const socket = io.connect("http://localhost:3000");

const sender = document.getElementById("sender");
const message = document.querySelector("message");
const output = document.querySelector("output");
const feedback = document.querySelector("feedback");
//const submitBtn = document.querySelector('submitBtn');

function gonder() {
  console.log("sdxscscsi");
  console.log("message.value");
  socket.emit("chat", {
    message: message,
    sender: sender,
  });
}

socket.on("chat", (data) => {
  console.log("data", data);
  if (!data && data != null && data != undefined) {
    output.innerHTML += `<p><strong>${data.sender}:</strong> ${data.message}</p>`;
  } else {
    console.log("hata !");
  }
});
