function SessionModel() {
      if (!( this instanceof SessionModel ))
        return new SessionModel()
};

SessionModel.prototype.initialize = function( controller ) {
  this.session = controller.session;
}

SessionModel.prototype.checkDevice = function() {
  console.log( this.session )
};

SessionModel.prototype.sendInvite = function() {};

SessionModel.prototype.startRecording = function() {};

SessionModel.prototype.stopRecording = function() {};

SessionModel.prototype.uploadFile = function() {};

SessionModel.prototype.sendFile = function() {};

SessionModel.prototype.endSession = function() {};

var sessionModel = new SessionModel();