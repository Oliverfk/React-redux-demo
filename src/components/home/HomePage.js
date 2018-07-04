import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component{
  render(){
    return (
      <div className="jumbotron">
        <h1>Pluralsight Administration</h1>
        <p></p>
        <Link to="about" className="btn btn-primary btn-lg btn">Learn more</Link>
      </div>
    );
  }

}

export default HomePage;
