/** @jsx React.DOM */

var NavBar = React.createClass({

    getInitialState: function(){
        return { focused: 0 };
    },

    clicked: function( index ){
        this.setState( { focused: index } );


        if( index == 0 && location.href != 'http://localhost:3000/'){
            location.href = 'http://localhost:3000/'

        }
         if( index == 1 && location.href != 'http://localhost:3000/stream'){
            location.href = 'http://localhost:3000/new_stream'

        }
         if( index == 2 && location.href != 'http://localhost:3000/reservations'){
            // location.href = 'http://localhost:3000/reservations'

        }

        if( index == 3 && location.href != 'http://localhost:3000/about'){
            // location.href = 'http://localhost:3000/about'
        }
  },
    render: function() {
    // context is lost to window on second return <li> and we need two different references in the call to render
    var self = this;

    // map over the navItems in <ul> and return in <li>
        return (
            <div>
                <ul>{ this.props.navItems.map(function( navItem, index ){

                    var style = '';

                    if(self.state.focused == index){
                        style = 'focused';
                    }
                    return <li className={style} onClick={ self.clicked.bind( self, index ) }>{ navItem }</li>;
                }) }

                </ul>

            </div>
        );

    }
});

React.renderComponent(
    <NavBar navItems={ ['Home', 'New Stream', 'Active Streams', 'About'] } />,
    document.getElementById("navBar")
);


