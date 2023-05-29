import React from 'react';
import { Link } from 'react-router-dom';

/*
  Page not found
*/

function NoMatch() {
  return (
    <div className="text-center">
      <p className="mb-3 text-center text-2xl font-semibold">Sorry, but page not found</p>
      <Link to="/">&laquo; Return to Home page</Link>
    </div>
  );
}
export default NoMatch;