function SessionView() {
      if (!( this instanceof SessionView ))
        return new SessionView()
};

SessionView.prototype.initialize = function( session ) {
    this.session = session;
};

// THE FUNCTIONS BELOW CORRESPOND TO EVENTS FIRED BY THE DISPATCHER, TOKBOX / HARDWARE RELATED
SessionView.prototype.renderSessionStatus = function() {
  $( "#statusButton" ).velocity( "fadeIn", { visibility : "visible", duration : 300, display: "inline-block" } );
}

SessionView.prototype.renderDisconnectOption = function() {
  $( "#disconnectButton" ).velocity( "fadeIn", { visibility : "visible", duration : 300, display: "inline-block" } );
}

SessionView.prototype.renderStreamCreated = function( event ) {
  var streamConnectionId = event.stream.connection.connectionId;
}
SessionView.prototype.userDestoryStream = function() {

}
SessionView.prototype.renderStreamDestroyed = function( reason ) {
  console.log( "The stream " + event.stream.name + " has ended for the following reason: " + reason );
}

SessionView.prototype.renderError = function() {};

SessionView.prototype.renderException = function() {};

SessionView.prototype.renderGreeting = function() {};

// THE FUNCTIONS BELOW CORRESPOND TO NON-TOKBOX RELATED EVENTS, NOT INVOKED BY THE DISPATCHER
SessionView.prototype.collectLogin = function() {};

SessionView.prototype.renderLoginSuccess = function() {};

SessionView.prototype.collectSignup = function() {};

SessionView.prototype.renderSignupSuccess = function() {};

var sessionView = new SessionView();