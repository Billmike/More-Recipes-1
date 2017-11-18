import React from 'react';

const PopularRecipeCard = () => (
  <div className="col s12">
    <h5 className="header">
      <a href="recipe.html" className="black-text">Italian Burger</a>
    </h5>
    <div className="card horizontal">
      <div className="card-image">
        <a href="recipe.html">
          <img src="images/image05.jpg" alt="Popular1" />
        </a>
      </div>
      <div className="card-stacked">
        <div className="card-content">
          <p>Filled with sweetness and nutrients.</p>
        </div>
        <div className="card-action">
          <ul>
            <li id="downvotes"><i className="material-icons tiny">visibility</i>
              200
            </li>
            <li id="favorites"><i className="material-icons tiny">favorite</i>
              20
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default PopularRecipeCard;