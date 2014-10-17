function SessionControl() {
      this.session = TB.initSession( sessionId );
      if (!( this instanceof SessionControl ))
        return new SessionControl()
};

SessionControl.prototype.initialize = function( SessionDispatch, SessionModel, SessionView ) {
  this.SessionModel = SessionModel;
  this.SessionView = SessionView;
  this.SessionDispatch = SessionDispatch;

    this.SessionModel.initialize( this.session );
    this.SessionView.initialize( this.session );
    this.SessionDispatch.initialize( this.session, this.SessionDispatch.dispatcher.bind( this ) );

      this.bindListeners();
  }
  // these listen for app-related user events, tokbox events are handled by the dispatcher
SessionControl.prototype.bindListeners = function() {
  document.getElementById( "checkDevice" ).addEventListener( "click", this.SessionModel.userCheckDevice, false );
  document.getElementById( "sendInvite" ).addEventListener( "click", this.SessionModel.userSendInvite, false );
  document.getElementById( "startRecording" ).addEventListener( "click", this.SessionModel.userStartRecord, false );
  document.getElementById( "stopRecording" ).addEventListener( "click", this.SessionModel.userStopRecord, false );
}
// these also listen for app-related user events, but these DOM elements are hidden until successfuly
// client-connection, listeners attached when elems are ready.
SessionControl.prototype.bindRevealedListeners = function() {
  document.getElementById( "statusButton" ).addEventListener( "click", this.SessionModel.userConnectStatus, false );
  document.getElementById( "disconnectButton" ).addEventListener( "click", this.SessionModel.userDisconnect, false );
}

// all of the below function are handlers that respond when the dispatcher fires
SessionControl.prototype.sessionStart = function() {
  // this just decalres the publisher, it doesn't publish the publisher to the session
  this.publisher = TB.initPublisher( apiKey, "publisher", { width:800, height:400 } );
  // init new session object
  this.session.connect( apiKey, token );
}

SessionControl.prototype.sessionConnected = function( event ) {
  if ( event.target.currentState === "connected" ) {
      console.log( "Session connected. Now connecting client" );
  }
}

SessionControl.prototype.connectionCreated = function( event ) {
// session object instantiated, client has connected and now we are publishing to the session
// within the callback of the connection created event
  this.session.publish( this.publisher );
    this.SessionView.renderDisconnectOption();
    this.SessionView.renderSessionStatus( this.bindRevealedListeners );
}

SessionControl.prototype.sessionDisconnected = function( event ) {
  this.SessionView.renderDisconnection( event.reason );
}

SessionControl.prototype.streamCreated = function( event ) {
  console.log("stream created")
}

SessionControl.prototype.streamDestroyed = function( event ) {
  this.SessionView.renderDestroyed( event.reason );
}

var sessionControl = new SessionControl();