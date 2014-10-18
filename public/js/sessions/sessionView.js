function SessionView() {
      if (!( this instanceof SessionView ))
        return new SessionView()
};

SessionView.prototype.initSession = function( session ) {
    this.session = session;
};

SessionView.prototype.initPublisher = function( publisher ) {
    this.publisher = publisher;
};

// the functions below corresspond to events fired by the dispatcher, tokbox-related events
SessionView.prototype.renderSessionStatus = function( callback ) {
  setTimeout( callback, 400 );
  $( "#statusButton" ).velocity( "fadeIn", { visibility : "visible", duration : 300, display: "inline-block" } );
}

SessionView.prototype.renderDisconnectOption = function() {
  $( "#disconnectButton" ).velocity( "fadeIn", { visibility : "visible", duration : 300, display: "inline-block" } );
}

SessionView.prototype.renderStreamCreated = function( event ) {
  var streamConnectionId = event.stream.connection.connectionId;
}

SessionView.prototype.userDestoryStream = function() {}

SessionView.prototype.renderStreamDestroyed = function( reason ) {
  console.log( "The stream " + event.stream.name + " has ended for the following reason: " + reason );
}

SessionView.prototype.renderError = function() {}

SessionView.prototype.renderException = function() {}

SessionView.prototype.renderGreeting = function() {}

// the functions below correspond to non-tokbox related events, not invoked by the dispatcher
SessionView.prototype.collectLogin = function() {}

SessionView.prototype.renderLoginSuccess = function() {}

SessionView.prototype.collectSignup = function() {}

SessionView.prototype.renderSignupSuccess = function() {}


var sessionView = new SessionView()