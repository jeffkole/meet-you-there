function SessionDispatch() {
      if (!( this instanceof SessionDispatch ))
        return new SessionDispatch()
};


SessionDispatch.prototype.initialize = function()  {
  // the function we're been has been invoked via call(), so "this" references the calling function ( the controller )
  // first arg is the event, second the handler, third the conext
  this.session.on( "sessionConnected", this.sessionConnected, this );
  this.session.on( "sessionDisconnected", this.sessionDisconnected, this );
    this.sessionStart();
  }

var sessionDispatch = new SessionDispatch();