function SessionDispatch() {}


SessionDispatch.prototype.initSession = function( session, callback ) {
  this.session = session;

    callback();
}

/*
  the execution context for sessionDispatch enbales - this - in sessionDispatch to
  point to an instance of the controller's constructor.

 */

SessionDispatch.prototype.sessionDispatch = function() {
  console.log( this )
/* the app will first fire on sessionConnected */
    this.session.on( "sessionConnected", this.sessionConnected, this );
/* then it will fire on connectionCreated, where we publish the publisher to the session */
    this.session.on( "connectionCreated", this.connectionCreated, this );
    this.session.on( "sessionDisconnected", this.sessionDisconnected, this );
    this.session.on( "streamCreated", this.streamCreated, this );
    this.session.on( "streamDestroyed", this.streamDestroyed, this );

/* we just initialized the session dispatcher so its ready before any events occur, now creating the session object */
}

SessionDispatch.prototype.initPublisher = function( publisher ) {
  // publisher.publisherConnected", publisherConnected, this );
  // publisher.on( "connectionCreated", this.connectionCreated, this );
  // publisher.publisherDisconnected", publisherDisconnected, this );
  // publisher.on( "streamCreated", this.streamCreated, this );
  // publisher.on( "streamDestroyed", this.streamDestroyed, this );
  // we just initialized the publisher dispatcher so its ready before any events occur
}

var sessionDispatch = new SessionDispatch();