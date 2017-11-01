import models from '../models';

const Favorite = models.Favorite;

/**
 * Class representing favorite controller funcitons
 *
 * @class FavoriteController
 */
class FavoriteController {
  /**
     * Add recipe as user favorite
     *
     * @static
     * @param {object} req - The request body
     * @param {any} res - The response body
     * @returns {object} Object representing success status or
     * error status
     * @memberof FavoriteController
     */
  static addFavorite(req, res) {
    return Favorite
      .findOrCreate({
        where: {
          recipeId: req.params.recipeId,
          userId: req.decoded.user.id,
        }
      })
      .spread((favorite, created) => {
        if (!created) {
          return res.status(409).send({
            status: 'Fail',
            message: 'Favorite already exist'
          });
        }
        return res.status(201).send({
          status: 'Success',
          message: 'Recipe added to favorites',
          recipeId: favorite.recipeId,
        });
      })
      .catch(error => res.status(400).send({
        message: error.message,
      }));
  }

  /**
   * Remove a recipe from user favorites
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {any} Object representing success status or
   * error status
   * @memberof FavoriteController
   */
  static removeFavorite(req, res) {
    return Favorite
      .find({
        where: {
          recipeId: req.params.recipeId,
          userId: req.decoded.user.id
        }
      })
      .then(favorite => favorite
        .destroy()
      )
      .then(() => res.status(200).send({
        status: 'success',
        message: 'Recipe removed from favorites'
      }))
      .catch(error => res.status(400).send({
        message: error.message,
      }));
  }
}

export default FavoriteController;