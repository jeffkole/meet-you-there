function SessionModel() {
      if (!( this instanceof SessionModel ))
        return new SessionModel()
}

SessionModel.prototype.initSession = function( session ) {
  this.session = session;
}

SessionModel.prototype.initPublisher = function( publisher ) {
  this.publisher = publisher;
}

SessionModel.prototype.collectNewPubData = function() {
  var linkRoot = "http://localhost:3000/stream/?room_id="
  var newSessionId = this.session.sessionId;
  var newPubStreamId = this.publisher.id;
  var _pubHasAccess = this.publisher.accessAllowed;
  var pubSession = this.publisher.session;
  var pubSessionState = this.publisher.session.currentState;
  var pubStreams = this.publisher.session.streams;
  var pubToken = this.publisher.session.token;
  var methodToDisconnectPubSession = this.publisher.session.disconnect;
  var methodToUnpublishPub = this.publisher.session.unpublish;
  var pubLinkToShare = linkRoot + newPubStreamId;

  console.log( linkRoot )
  console.log( newSessionId )
  console.log( newPubStreamId )
  console.log( _pubHasAccess )
  console.log( pubSession )
  console.log( pubSessionState )
  console.log( pubToken )
  console.log( methodToDisconnectPubSession )
  console.log( methodToUnpublishPub )
  console.log( pubLinkToShare )

}

SessionModel.prototype.sendInvite = function() {}

SessionModel.prototype.startRecording = function() {}

SessionModel.prototype.stopRecording = function() {}

SessionModel.prototype.uploadFile = function() {}

SessionModel.prototype.sendFile = function() {}

SessionModel.prototype.endSession = function() {}

var sessionModel = new SessionModel();