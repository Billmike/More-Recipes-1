import React from 'react';

const SideNav = () => (
  <div>
    <ul className="side-nav" id="slide_out">
      <li>
        <div className="nav-wrapper deep-orange darken-4 hide-on-med-and-up">
          <a id="logo" href="index.html" className="white-text">More-Recipes</a>
        </div>
      </li>
      <li><a href="index.html">Home</a></li>
      <li>
        <ul className="collapsible" data-collapsible="accordion">
          <li>
            <div className="collapsible-header black-text">Category</div>
            <div className="collapsible-body">
              <ul>
                <li><a href="#!" className="collection-item">Breakfast</a></li>
                <li><a href="#!" className="collection-item">Lunch</a></li>
                <li><a href="#!" className="collection-item">Dinner</a></li>
                <li><a href="#!" className="collection-item">Appetizer</a></li>
                <li><a href="#!" className="collection-item">Main</a></li>
                <li><a href="#!" className="collection-item">Dessert</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </li>
      <li>
        <div className="divider" />
      </li>
      <li><a href="#signin" className="modal-trigger">Sign In</a></li>
      <li><a href="#signup" className="modal-trigger">Register</a></li>
    </ul>
  </div>
);

export default SideNav;