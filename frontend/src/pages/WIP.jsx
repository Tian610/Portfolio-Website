import React from 'react';
import { Link } from 'react-router-dom';

const WIP = () => {
  // Basic styles to center the content
  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 200px)', // Full viewport height minus nav/footer
    textAlign: 'center',
    padding: '2rem'
  };

  return (
    <div style={pageStyle}>
      <h1 className="title">Under Construction</h1>
      <p className="section__text__p1" style={{paddingBottom: '2rem'}}>
        This page is currently being built. Please check back later!
      </p>
      <Link to="/" className="btn btn-color-2">
        Go Back Home
      </Link>
    </div>
  );
};

export default WIP;