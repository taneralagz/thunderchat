const socket = io.connect("http://localhost:3000");

const sender = document.getElementById("sender");
const message = document.getElementById("message");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");


function gonder() {
  if (message.value === "") {
    alert(" Lütfen boş alanları doldurunuz.");
  } else {
    socket.emit("chat", {
      message: message.value,
      sender: sender.value,
    });
  }
}

//İndex1 silindi, test user ejs'e eklenince kullanılacak.
/*socket.on("connect", () => {
  document.getElementById("test").innerHTML += `<hr>${socket.id} adlı kullanıcı hoş geldin</hr>`;
})*/

socket.on("chat", (data) => {
  feedback.innerHTML = "";
  output.innerHTML += `<p><strong>${data.user}:</strong> ${data.message}</p>`;
  
  message.value = "";
});

message.addEventListener("keypress", (e) => {
  socket.emit("typing", sender.value);
});

socket.on("typing", (data) => {
  feedback.innerHTML = `<p><em>${data} yazıyor...</em></p>`;

});
