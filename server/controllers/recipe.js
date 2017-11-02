import models from '../models';

const Recipe = models.Recipe,
  Review = models.Review,
  User = models.User;

/**
 * Class representing recipe handler
 *
 * @class RecipeHandler
 */
class RecipeHandler {
  /**
   * Add a recipe
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Object representing success status or
   *  error status
   * @memberof RecipeHandler
   */
  static addRecipe(req, res) {
    return Recipe
      .create({
        userId: req.decoded.user.id,
        title: req.body.title,
        description: req.body.description,
        preparationTime: req.body.preparationTime,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
      })
      .then(recipe => recipe.increment('views'))
      .then(recipe => res.status(201).send({
        status: 'Success',
        message: 'Recipe created',
        data: {
          id: recipe.id,
          userId: recipe.userId,
          title: recipe.title,
          description: recipe.description,
          preparationTime: recipe.preparationTime,
          ingredients: recipe.ingredients,
          directions: recipe.directions,
          upvotes: recipe.upvotes,
          downvotes: recipe.downvotes,
          views: recipe.views,
        }
      }))
      .catch(error => res.status(400).send({
        message: error.message,
      }));
  }

  /**
   * Modify a recipe
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Object representing success status or
   *  error status
   * @memberof RecipeHandler
   */
  static modifyRecipe(req, res) {
    return Recipe
      .find({
        where: {
          id: req.params.recipeId,
          userId: req.decoded.user.id,
        },
      })
      .then(recipe => recipe
        .update({
          title: req.body.title,
          description: req.body.description,
          preparationTime: req.body.preparationTime,
          ingredients: req.body.ingredients,
          directions: req.body.directions,
        })
      )
      .then(updatedRecipe => res.status(200).send({
        status: 'Success',
        message: 'Recipe modified',
        data: {
          id: updatedRecipe.id,
          title: updatedRecipe.title,
          description: updatedRecipe.description,
          preparationTime: updatedRecipe.preparationTime,
          ingredients: updatedRecipe.ingredients,
          directions: updatedRecipe.directions,
        }
      }))
      .catch(error => res.status(400).send({
        message: error.message,
      }));
  }

  /**
   * Delete a recipe in the catalog
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The responsee object
   * @returns {object} - Object representing success status or
   * error status
   * @memberof RecipeHandler
   */
  static deleteRecipe(req, res) {
    return Recipe
      .find({
        where: {
          id: req.params.recipeId,
          userId: req.decoded.user.id,
        }
      })
      .then(recipe => recipe.destroy())
      .then(() => res.status(200).send({
        status: 'Success',
        message: 'Recipe deleted'
      }))
      .catch(error => res.status(400).send({
        message: error.message,
      }));
  }

  /**
   * Retrieve all the recipes
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next route handler function
   * @return {object} - Call to the next route handler or
   * object representing the success status or error status
   * @memberof RecipeHandler
   */
  static getAll(req, res, next) {
    if (req.query.sort) return next();
    return Recipe
      .all({
        attributes: [
          'id', 'title', 'description', 'preparationTime', 'ingredients',
          'directions', 'upvotes', 'downvotes', 'views'
        ],
      })
      .then(recipe => res.status(200).send({
        status: 'Success',
        message: 'Recipes retrieved',
        data: {
          recipe
        }
      }))
      .catch(error => res.status(400).send({
        message: error.message,
      }));
  }

  /**
   * Retrieve a single recipe in the catalog
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - JSON object representing the single recipe retrieved
   * @memberof RecipeHandler
   */
  static getOne(req, res) {
    return Recipe
      .findById(req.params.recipeId, {
        attributes: [
          'id', 'title', 'description', 'preparationTime', 'ingredients',
          'directions', 'upvotes', 'downvotes', 'views'
        ],
        include: [{
          model: Review,
          attributes: ['content', 'createdAt'],
          include: [{
            model: User,
            attributes: ['firstName', 'lastName'],
          }],
        }],
      })
      .then(recipe => res.status(200).send({
        status: 'Success',
        message: 'Recipe retrieved',
        data: {
          recipe
        }
      }))
      .catch(error => res.status(400).send({
        message: error.message
      }));
  }

  /**
   * Retrieve recipes with most upvotes in descending order
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - Calls the next route handler
   * @return {object} Object representing the success status or
   * error status or call to the next route handler
   * @memberof RecipeHandler
   */
  static getMostUpvotes(req, res, next) {
    if (req.query.sort && req.query.order) {
      const sort = req.query.sort,
        order = req.query.order.toUpperCase().slice(0, 4);
      return Recipe
        .findAll({
          attributes: [
            'id', 'title', 'description', 'preparationTime', 'ingredients',
            'directions', 'upvotes', 'downvotes'
          ],
          order: [
            [sort, order]
          ],
          limit: 20,
        })
        .then(recipes => res.status(200).send({
          status: 'Success',
          message: 'Recipes retrieved',
          data: {
            recipes
          }
        }))
        .catch(error => res.status(400).send({
          message: error.message,
        }));
    }
    next();
  }
}

export default RecipeHandler;
