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
  // These listen for both hardware and user events.
  // When they invoke a callback in the model, they trigger functions that cause the dispatcher to fire events.
  // When they invoke a callback in the view, they invoke non-TokBox related behavior and render on their own without the dispatcher.
SessionControl.prototype.bindListeners = function() {
  document.getElementById( "checkDevice" ).addEventListener( "click", this.SessionModel.checkDevice, false );
  document.getElementById( "sendInvite" ).addEventListener( "click", this.SessionModel.sendInvite, false );
  document.getElementById( "startRecording" ).addEventListener( "click", this.SessionModel.startRecording, false );
  document.getElementById( "stopRecording" ).addEventListener( "click", this.SessionModel.stopRecording, false );
  document.getElementById( "endSession" ).addEventListener( "click", this.SessionModel.endSession, false );
  }
// all of the below function are handlers that respond when the dispatcher fires
SessionControl.prototype.sessionStart = function() {
  this.publisher = TB.initPublisher( apiKey, "publisher", { width:800, height:400 } )
  this.session.publish( this.publisher );
  this.session.connect( apiKey, token );
  }
SessionControl.prototype.sessionConnected = function( event ) {
  if ( event.target.currentState === "connected" ) {
    console.log("sessionConnected executed");
      // this.SessionView.renderSessionConnected( event );
    }
    // console.log( this.publisher )
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

  SessionControl.prototype.connectionCreated = function( event ) {
    console.log("connectionCreated executed")
      console.log( this.session.capabilities )
    // console.log( this.session.sessionInfo )
    // console.log( event)
  }

var sessionControl = new SessionControl();