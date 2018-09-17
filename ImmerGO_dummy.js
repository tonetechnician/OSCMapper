var osc = require("osc");


var udpPort = new osc.UDPPort({
    // This is the port we're listening on.
    localAddress: "127.0.0.1",
    localPort: 6060 ,

    // This is where sclang is listening for OSC messages.
    remoteAddress: "127.0.0.1",
    remotePort: 6060,
    metadata: true
});

// Open the socket.
udpPort.open();
coord_buf = new Array(4).fill([0,0,0])
// console.log(coord_buf)

var count=1; ;
udpPort.on("message", function (oscMsg) {
	// Handler
    // let track;
    // coord_buf[count%4][(count%3)] = count%3;
    // ++count;
    // console.log("An OSC Message was received!", oscMsg.address);
    // Parse Message
    // console.log(oscMsg.address.split("/"))
    var addr = oscMsg.address.split("/").filter(x => x!="");
    var val = oscMsg.args[0].value
    // console.log(addr) 
    // console.log(val)

    if (addr[0] == 'track'){
        // console.log('here')
        var track = addr[1]-1;
        console.log(track)
        coord_buf[2][(count%3)] = count%3+1;
        count++;
        // var coord = addr[5]-1;
        // console.log(track)
        // console.log("param")
        // console.log(addr[5])
        // Figure coord
        // if (coord == 0) {coord_buf[1][0] = val;} 
        // else if (coord == 1) {coord_buf[1][1] = val}
        // else {coord_buf[1][2] = val;}        
    }

    // }
    
});

setInterval(function(){
    console.log("new buf")
    console.log(coord_buf[0])
},1000)
// Every second, send an OSC message to SuperCollider
// setInterval(function() {
//     var msg = {
//         address: "/hello/from/oscjs",
//         args: [
//             {
//                 type: "f",
//                 value: Math.random()
//             },
//             {
//                 type: "f",
//                 value: Math.random()
//             }
//         ]
//     };

//     console.log("Sending message", msg.address, msg.args, "to", udpPort.options.remoteAddress + ":" + udpPort.options.remotePort);
//     udpPort.send(msg);
// }, 1000);