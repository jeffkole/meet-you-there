function SessionDispatch() {}

SessionDispatch.prototype.initialize = function( session, callback )  {
    this.session = session;
    callback();
}

/* -this- in SessionDispatch points to an instance of SessionControl */
SessionDispatch.prototype.dispatcher = function() {
  // the app will first fire on sessionConnected
  this.session.on( "sessionConnected", this.sessionConnected, this );
  // then it will fire on connectionCreated, where we publish the publisher to the session
  this.session.on( "connectionCreated", this.connectionCreated, this );
  this.session.on( "sessionDisconnected", this.sessionDisconnected, this );
  this.session.on( "streamCreated", this.streamCreated, this );
  this.session.on( "streamDestroyed", this.streamDestroyed, this );

  // we just initialized the dispatcher so its ready before any events occur, now creating new session object
  this.sessionStart();
}

var sessionDispatch = new SessionDispatch();