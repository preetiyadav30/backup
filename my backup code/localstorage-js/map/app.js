const Express = require("express")();
const Http = require("http").Server(Express);
const socket = io("http://localhost:3000");
const Socketio = require("socket.io")(Http);

Http.listen(3000, () => {
    console.log("Listening at :3000...");

});
const markers = [];

Socketio.on("connection", socket => {
    for(let i = 0; i < markers.length; i++) {
        socket.emit("marker", markers[i]);
    }
    socket.on("marker", data => {
        markers.push(data);
        Socketio.emit("marker", data);
    });
});

socket.on("marker", data => {
    const marker = new H.map.Marker(data);
    map.addObject(marker);
});
map.addEventListener("tap", event => {
    const position = map.screenToGeo(
        event.currentPointer.viewportX, 
        event.currentPointer.viewportY
    );
    const marker = new H.map.Marker(position);
    map.addObject(marker);
    socket.emit("marker", position);
});