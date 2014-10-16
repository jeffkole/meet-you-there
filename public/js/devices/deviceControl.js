function DeviceControl() {
      if (!( this instanceof DeviceController ))
        return new DeviceControl()
};

DeviceControl.prototype.detectHardware = function() {}

var deviceControl = new DeviceControl();