/** @jsx React.DOM */

var NavBarLink = React.createClass({
  render: function() {
    return (
      <a href={this.props.url}>{this.props.text}</a>
    );
  }
})

// NAV BAR DATA
[
 {
  "text": "courses",
  "url": "http://localhost/3000/courses"
  },
  {
  "text": "teachers",
  "url": "http://localhost/3000/teachers"
  },
  {
  "text": "how this works",
  "url": "http://localhost/3000/how-this-works"
   },
   {
  "text": "contact",
  "url": "http://localhost/3000/contact"
 }
]