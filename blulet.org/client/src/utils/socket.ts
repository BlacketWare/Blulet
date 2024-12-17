const socket = new WebSocket(`${window.location.protocol === "http:" ? "ws" : "wss"}://${window.location.hostname}/api/v2/ws?auth=${localStorage.getItem("token")}`);

export default socket;