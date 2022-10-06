/**
 * @swagger
 * definitions:
 *   reviews:
 *     properties:
 *       success:
 *         type: boolean
 *       count:
 *         type: integer
 *       pagination:
 *         type: object
 *       data:
 *         type: array
 *         items:
 *              $ref: '#/definitions/review'
 *
 */

/**
 * @swagger
 * definitions:
 *   review:
 *      properties:
 *          _id:
 *              type: string
 *          title:
 *              type: string
 *          text:
 *              type: string
 *          rating:
 *              type: string
 *          bootcamp:
 *              type: object
 *          user:
 *              type: string
 *          createdAt:
 *              type: string
 *
 */
/**
 * @swagger
 * /reviews:
 *   get:
 *     tags:
 *       - Reviews
 *     description: Get all Reviews
 *     produces: application/json
 *     parameters:
 *       - name: select
 *         description: get selected fields
 *         in: query
 *         required: false
 *         type: string
 *       - name: page
 *         description: goto page
 *         in: query
 *         required: false
 *         type: string
 *       - name: limit
 *         description: set data limit
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/reviews'
 */

/**
 * @swagger
 * /bootcamps/{bootcampId}/reviews:
 *   get:
 *     tags:
 *       - Reviews
 *     description: Get Reviews based on Bootcamp
 *     produces: application/json
 *     parameters:
 *      - name: bootcampId
 *        in: path
 *        description: Bootcamp
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/reviews'
 */


/**
 * @swagger
 * /reviews/{reviewId}:
 *   get:
 *     tags:
 *       - Reviews
 *     description: Get Single Review
 *     produces: application/json
 *     parameters:
 *      - name: reviewId
 *        in: path
 *        description: Review
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/review'
 */

/**
 * @swagger
 * definitions:
 *   create-review:
 *      properties:
 *          title:
 *              type: string
 *          text:
 *              type: string
 *          rating:
 *              type: integer
 *   create-review-res:
 *      properties:
 *          success:
 *              type: boolean
 *          data:
 *              properties:
 *                  _id:
 *                      type: string
 *                  title:
 *                      type: string
 *                  text:
 *                      type: string
 *                  rating:
 *                      type: string
 *                  bootcamp:
 *                      type: string
 *                  user:
 *                      type: string
 *                  createdAt:
 *                      type: string
 */

/**
 * @swagger
 * /bootcamps/{bootcampId}/reviews:
 *   post:
 *     tags:
 *       - Reviews
 *     description: Create reviews based on bootcamp
 *     produces: application/json
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        description: Token should be like <Bearer {TOKEN}>
 *        required: true
 *        type: string
 *      - name: bootcampId
 *        in: path
 *        description: Bootcamp
 *        required: true
 *        type: string
 *      - name: Review
 *        in: body
 *        description: Review Details
 *        required: true
 *        type: string
 *        schema:
 *           $ref: '#/definitions/create-review'
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/create-review-res'
 */

/**
 * @swagger
 * /reviews/{reviewId}:
 *   put:
 *     tags:
 *       - Reviews
 *     description: Update Review
 *     produces: application/json
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        description: Token should be like <Bearer {TOKEN}>
 *        required: true
 *        type: string
 *      - name: reviewId
 *        in: path
 *        description: Review
 *        required: true
 *        type: string
 *      - name: Review
 *        in: body
 *        description: Review Details to be updated
 *        required: true
 *        type: string
 *        schema:
 *           $ref: '#/definitions/create-review'
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/create-review-res'
 */

/**
 * @swagger
 * definitions:
 *   delete-review-res:
 *      properties:
 *          success:
 *              type: boolean
 *          data:
 *              type: object
 */

/**
 * @swagger
 * /reviews/{reviewId}:
 *   delete:
 *     tags:
 *       - Reviews
 *     description: Delete Review
 *     produces: application/json
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        description: Token should be like <Bearer {TOKEN}>
 *        required: true
 *        type: string
 *      - name: reviewId
 *        in: path
 *        description: Review
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/delete-review-res'
 */