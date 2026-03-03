const currentUrl = window.location.href;

var socket = new WebSocket(currentUrl);

socket.onclose = (event) => {
  console.log("WebSocket closed:", event.reason);

  // Reconnect after a short delay
  setTimeout(() => {
    console.log("Reconnecting...");
    alert("Reconnecting...");
    connect();
  }, 3000); // 3 seconds
};