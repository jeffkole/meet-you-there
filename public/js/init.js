window.onload = function(){
  sessionControl.initialize( sessionDispatch, sessionModel, sessionView )
  // collectDom();
}


function collectDom() {

/* collect all DOM elements */
var elements = document.getElementsByTagName( '*' );

/* store the results */
var results = []
  , i = 0;
/* iterate over the elements */
for ( ;elements[i]; i++ ) {

/* get the background-image style property */
bgImgStyle = getElementStyle( elements[i], 'background-image' );

/* if available in the DOM, push to the results array */
if ( bgImgStyle && bgImgStyle !== 'none' ) {

      results.push( elements[i] );
  }
 }
  console.log( results )
  // console.clear();
}

/* collect style of the DOM elemnt you pass in */
function getElementStyle ( elemStyle, styleWanted ) {

if ( elemStyle.currentStyle )
  var elemFound = elemStyle.currentStyle[ styleWanted ];

    else if ( window.getComputedStyle )

  var elemFound = document.defaultView.getComputedStyle( elemStyle, null ).getPropertyValue( styleWanted );

    return elemFound;
}









