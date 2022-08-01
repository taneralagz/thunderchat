const socket = io.connect("http://localhost:3000");

const sender = document.getElementById("sender");
const message = document.getElementById("message");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");
//const submitBtn = document.querySelector('submitBtn');

function gonder() {
  alert(sender.value, "  gönderildi mi gerçekten?");
  console.log("sdxscscsi");
  console.log("message.value");
  socket.emit("chat", {
    message: message.value,
    sender: sender.value,
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
