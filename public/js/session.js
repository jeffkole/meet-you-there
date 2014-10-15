// Initialize an OpenTok Session object
window.onload = function(){
  bindListeners();
}

function bindListeners(){
var streamer = document.getElementById("connect")
streamer.addEventListener("click", init, false)
}

function init(){
var session;
var connectionCount = 0;

function connect() {
  var session;
var connectionCount = 0;
  if (OT.checkSystemRequirements() == 0) {
    console.log("The client does not support WebRTC.");
  } else {
    // Replace apiKey and sessionId with your own values:
    session = OT.initSession(apiKey, sessionId);
    session.on({
      connectionCreated: function (event) {
        connectionCount++;
        console.log(connectionCount + " connections.");
      },
      connectionDestroyed: function (event) {
        connectionCount--;
        console.log(connectionCount + " connections.");
      },
       sessionDisconnected: function sessionDisconnectHandler(event) {
        // The event is defined by the SessionDisconnectEvent class
        console.log("Disconnected from the session.");
        document.getElementById('disconnect').style.display = 'none';
        if (event.reason == "networkDisconnected") {
          alert("Your network connection terminated.")
        }
      }
    });
    // Replace token with your own value:
    session.connect(token, function(error) {
      console.log( connectionCount)
      if (error) {
        OT.log("Unable to connect: ", error.message);
      } else {
        document.getElementById('disconnect').style.display = 'block';
        console.log("Connected to the session.");
        connectionCount = 1;
      }
    });
  }
}

function disconnect() {
  session.disconnect();
}

connect();
}