function SessionView() {
      if (!( this instanceof SessionView ))
        return new SessionView()
};

SessionView.prototype.initialize = function( session ) {
    this.session = session;
};

// the functions below corresspond to events fired by the dispatcher, tokbox-related events
SessionView.prototype.renderStatusButton = function( callback ) {
  setTimeout( callback, 400 );
  $( "#status" ).velocity( "fadeIn", { visibility : "visible", duration : 300, display: "inline-block" } );
}

SessionView.prototype.renderDisconnectButton = function() {
  $( "#disconnect" ).velocity( "fadeIn", { visibility : "visible", duration : 300, display: "inline-block" } );
}

SessionView.prototype.renderStreamCreated = function( event ) {
  var streamConnectionId = event.stream.connection.connectionId;
}

SessionView.prototype.userDestoryStream = function() {}

SessionView.prototype.renderStreamDestroyed = function( reason ) {
  console.log( "The stream " + event.stream.name + " has ended for the following reason: " + reason );
}

var sessionView = new SessionView()