import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import isEmpty from 'lodash/isEmpty';
import Dropzone from 'react-dropzone';

import Spinner from '../common/Spinner';
import ErrorMessage from '../common/ErrorMessage';

const propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleEditChange: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleEditRecipe: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
  imagePreview: PropTypes.string.isRequired,
  recipeToEdit: PropTypes.shape({
    title: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    preparationTime: PropTypes.number,
    ingredients: PropTypes.string,
    directions: PropTypes.string,
  }).isRequired,
  userRecipes: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    imageUploading: PropTypes.bool.isRequired,
    error: PropTypes.shape()
  }).isRequired,
};

/**
 * Function to handle editing recipe
 *
 * @param {any} props - The props passed to the functions
 *
 * @returns {object} React element
 */
const EditRecipe = (props) => {
  const { open, handleEditChange, handleSelect, handleClose, handleDrop,
    handleEditRecipe, imagePreview, recipeToEdit, userRecipes } = props;
  const { title, category, description, preparationTime, ingredients,
    directions } = recipeToEdit;
  const { isLoading, imageUploading, error } = userRecipes;

  const actions = [
    <FlatButton
      id="cancel-edit-button"
      label="Cancel"
      onClick={handleClose}
    />
  ];

  return (
    <div>
      <Dialog
        title="Edit Recipe"
        actions={actions}
        modal
        open={open}
        autoScrollBodyContent
      >
        <div id="edit-recipe" className="row">
          <form className="col s12" onSubmit={handleEditRecipe}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="title"
                  name="title"
                  type="text"
                  defaultValue={title}
                  className="validate"
                  maxLength="255"
                  onChange={handleEditChange}
                  required
                />
                <label htmlFor="title" className="active">Title</label>
              </div>
            </div>
            <div className="row select-category">
              <label htmlFor="select-category">Category</label>
              <select
                id="select-category"
                className="browser-default"
                defaultValue={category}
                onChange={handleSelect}
              >
                <option value="" disabled>Select Category</option>
                <option value="Breakfast">Breakfast</option>
                <option name="Lunch" value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Main">Main</option>
                <option value="Dessert">Dessert</option>
              </select>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  id="description"
                  name="description"
                  defaultValue={description}
                  className="materialize-textarea validate"
                  maxLength="255"
                  onChange={handleEditChange}
                  required
                />
                <label htmlFor="description" className="active">
                  Description
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="preparationTime"
                  name="preparationTime"
                  type="number"
                  min="0"
                  defaultValue={isNaN(preparationTime) ? 0 : preparationTime}
                  className="validate"
                  onChange={handleEditChange}
                  required
                />
                <label htmlFor="preparationTime" className="active">
                  Preparation Time (MINS)
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  id="ingredients"
                  name="ingredients"
                  placeholder="Enter ingredients separated by comma"
                  defaultValue={ingredients}
                  className="materialize-textarea validate"
                  onChange={handleEditChange}
                  required
                />
                <label htmlFor="ingredients" className="active">
                  Ingredients
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  id="directions"
                  name="directions"
                  placeholder="Enter directions separated by full stop"
                  defaultValue={directions}
                  className="materialize-textarea validate"
                  onChange={handleEditChange}
                  required
                />
                <label htmlFor="directions" className="active">
                  Directions
                </label>
              </div>
            </div>
            <div className="row center-align">
              <div className="col s12">
                <div className="dropzone-area">
                  <Dropzone
                    className="dropzone"
                    onDrop={handleDrop}
                    accept="image/*"
                    multiple={false}
                  >
                    {!imagePreview
                      ? <p className="center-align">
                        Drop your file or click here to upload
                        <i className="material-icons center large">camera</i>
                      </p>
                      : <img src={imagePreview} alt="" />
                    }
                  </Dropzone>
                  <div className="row" />
                  {(imageUploading || isLoading) && <Spinner size="small" />}
                </div>
              </div>
            </div>
            {!isEmpty(error) &&
              <ErrorMessage message={error.message} />}
            <div className="row" />
            <div className="row center-align">
              <button
                name="edit-save"
                type="submit"
                className={`btn btn-large waves-effect waves-light
                    indigo accent-2`}
                disabled={imageUploading || isLoading}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

EditRecipe.propTypes = propTypes;

export default EditRecipe;
