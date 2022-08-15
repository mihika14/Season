import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component{
   constructor(props){
     super(props);
//  state object has been initialized and has been assigned a value or propert i.e lat: null
     this.state = { lat: null , errorMessage: '' };
   
// the callback function inside inst going to run until we return
// from the constructer
    window.navigator.geolocation.getCurrentPosition(
    position => {
        this.setState({ lat: position.coords.latitude });
    },
    err => {
        this.setState({  errorMessage: err.message });
    }
  );
}

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err =>this.setState({  errorMessage: err.message })           
          );
        }
        
    renderContent(){
        if (this.state.errorMessage && !this.state.lat){
            return<div>Error: {this.state.errorMessage}</div>;
        }

        if(!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat = {this.state.lat} />
        }

        return<Spinner message = "Please accept location request"/>;
    }
    // react says we have to define render
    render() {
      return(
        <div className="bordered">
            {this.renderContent()}
        </div>
      )
    }
}



ReactDOM.render(<App /> , document.querySelector('#root'));