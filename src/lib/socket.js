// Realtime client for chat. Swap in socket.io-client if your backend uses Socket.IO.
let socket = null;

export function connectSocket(onMessage) {
  socket = new WebSocket(import.meta.env.VITE_WS_URL);
  socket.onmessage = (event) => onMessage(JSON.parse(event.data));
  return socket;
}

export function sendSocketMessage(payload) {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(payload));
  }
}

export function disconnectSocket() {
  socket?.close();
  socket = null;
}
