import React, {PropTypes} from 'react';
import {IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading}) => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {"  |  "}
      <IndexLink to="/courses" activeClassName="active">Courses</IndexLink>
      {"  |  "}
      <IndexLink to="/search" activeClassName="active">Search</IndexLink>
      {"  |  "}
      <IndexLink to="/about" activeClassName="active">About</IndexLink>
      {loading && <LoadingDots interval={100} dots={20}/>}
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
