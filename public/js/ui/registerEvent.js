$("#myCalendar-1").ionCalendar({
    lang: "en",                     // language
    sundayFirst: false,             // first week day
    years: "80",                    // years diapason
    format: "DD.MM.YYYY",           // date format
    onClick: function(date){        // click on day returns date
        console.log(date);
    }
});
