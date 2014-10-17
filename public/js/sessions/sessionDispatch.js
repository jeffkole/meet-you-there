function SessionDispatch() {
      if (!( this instanceof SessionDispatch ))
        return new SessionDispatch()
};


SessionDispatch.prototype.initialize = function( session, callback )  {
    this.session = session;
    callback();
  }

  SessionDispatch.prototype.dispatcher = function() {
    // dispatch session events
    this.session.on( "sessionConnected", this.sessionConnected, this );
    this.session.on( "sessionDisconnected", this.sessionDisconnected, this );
    // dispatch stream events
    this.session.on( "streamCreated", this.sessionDisconnected, this );
    this.session.on( "streamDestroyed", this.streamDestroyed, this );

      this.sessionStart();
  }

var sessionDispatch = new SessionDispatch();