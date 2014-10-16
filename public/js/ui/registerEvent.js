    // initialize input widgets first
  $( document ).ready(function(){
init()
  })

    function init(){
    $('#setReservation .time').timepicker({
        'showDuration': true,
        'timeFormat': 'g:ia'
    });

    $('#setReservation .date').datepicker({
        'format': 'm/d/yyyy',
        'autoclose': true
    });

    // initialize datepair
    $('#setReservation').datepair();
  }