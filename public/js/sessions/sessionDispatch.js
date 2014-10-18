function SessionDispatch() {}


SessionDispatch.prototype.initSession = function( session, callback ) {
  this.session = session;
    callback();
}

/*
  the callback above invokes dispatchSessionEvents below
  it was bound when it was passed so it retains the same body as the function it is called on
  so - this - in dispatchSessionEvents points to an instance of the controller's constructor.

 */

SessionDispatch.prototype.dispatchSessionEvents = function() {

/* we initialize the session dispatcher so its ready before any events occur */

/* the app will first fire on sessionConnected, when session.connect is invoked in the controller */
    this.session.on( "sessionConnected", this.sessionConnected, this );
/* then it will fire on connectionCreated, where we inject either a publisher or subscriber into the session */

    this.session.on( "connectionCreated", this.connectionCreated, this );
    this.session.on( "sessionDisconnected", this.sessionDisconnected, this );
    this.session.on( "streamCreated", this.streamCreated, this );
    this.session.on( "streamDestroyed", this.streamDestroyed, this );
}

SessionDispatch.prototype.initPublisher = function( publisher ) {
  // we just initialized the publisher dispatcher so its ready before any events occur

  // publisher.publisherConnected", publisherConnected, this );
  // publisher.on( "connectionCreated", this.connectionCreated, this );
  // publisher.publisherDisconnected", publisherDisconnected, this );
  // publisher.on( "streamCreated", this.streamCreated, this );
  // publisher.on( "streamDestroyed", this.streamDestroyed, this );
}

var sessionDispatch = new SessionDispatch();