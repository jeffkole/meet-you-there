function SessionTracker() {};

SessionTracker.prototype = {
  initialize : function( session ){
    var connectionCount = 0;
    session.addEventListener("sessionConnected", sessionConnectedHandler);
    session.addEventListener("connectionCreated", connectionCreatedHandler);
    session.addEventListener("connectionDestroyed", connectionDestroyedHandler);
    session.connect( apiKey, token );

  function sessionConnectedHandler(event) {
    connectionCount = event.connections.length;
    displayConnectionCount();
  }

  function connectionCreatedHandler(event) {
    connectionCount += event.connections.length;
    displayConnectionCount();
  }

  function connectionDestroyedHandler(event) {
     connectionCount -= event.connections.length;
     displayConnectionCount();
  }

  function displayConnectionCount() {
    document.getElementById("connectionCountField").value = connectionCount.toString();
  }
 }
}
var sessionTracker = new SessionTracker();