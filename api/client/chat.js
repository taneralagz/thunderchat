const socket = io.connect("http://localhost:3000");

const sender = document.getElementById("sender");
const message = document.getElementById("message");
const output = document.getElementById("output");
const yazi_yazan = document.getElementById("yazi_yazan");

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
window.onload = function () {
  socket.emit("chat", {
    message: message.value,
    sender: sender.value,
  });
}

socket.on("connect", () => {
  document.getElementById("test-user").innerHTML += `${socket.id} adlı kullanıcı hoş geldin`;
})

socket.on("chat", (data) => {
  yazi_yazan.innerHTML = "";
  output.innerHTML += `<p><strong>${data.user}:</strong> ${data.message}</p>`;

  message.value = "";
});

message.addEventListener("keypress", (e) => {
  socket.emit("typing", sender.value);
});

socket.on("typing", (data) => {
  yazi_yazan.innerHTML = `<p><mark>${data}yazıyor </mark> </p>`;

});

socket.on("all_user", (data) => {
  
  var html="";
  for (let i = 0; i < data.allUsers.length; i++) {
    html += `<p>${data.allUsers[i].id }</p>`;
  }
  document.getElementById("total_user").innerHTML += html;
});