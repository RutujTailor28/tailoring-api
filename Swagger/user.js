/**
 * @swagger
 * definitions:
 *   users:
 *     properties:
 *       success:
 *         type: boolean
 *       count:
 *         type: integer
 *       pagination:
 *         type: object
 *       data:
 *         properties:
 *            role:
 *              type: string
 *            _id:
 *              type: string
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            createdAt:
 *              type: string
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - User (access:admin only)
 *     description: Get all users
 *     produces: application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Token should be like <Bearer {TOKEN}>
 *         required: true
 *         type: string
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
 *           type: array
 *           $ref: '#/definitions/users'
 */

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags:
 *       - User (access:admin only)
 *     description: Get particular user based on UserId
 *     produces: application/json
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        description: Token should be like <Bearer {TOKEN}>
 *        required: true
 *        type: string
 *      - name: userId
 *        in: path
 *        description: User
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/current-user'
 */

/**
 * @swagger
 * definitions:
 *   create-user:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - User (access:admin only)
 *     description: Create new users
 *     produces: application/json
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        description: Token should be like <Bearer {TOKEN}>
 *        required: true
 *        type: string
 *      - name: User Details
 *        in: body
 *        description: User
 *        required: true
 *        type: string
 *        schema:
 *           $ref: '#/definitions/create-user'
 *     responses:
 *       201:
 *         description:  On Success
 *         schema:
 *           type: array
 *           $ref: '#/definitions/current-user'
 */

/**
 * @swagger
 * definitions:
 *   update-user:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *   update-user-res:
 *     properties:
 *       success:
 *         type: boolean
 *       data:
 *         type: object
 */

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     tags:
 *       - User (access:admin only)
 *     description: Modify users
 *     produces: application/json
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        description: Token should be like <Bearer {TOKEN}>
 *        required: true
 *        type: string
 *      - name: userId
 *        in: path
 *        description: User
 *        required: true
 *        type: string
 *      - name: User details
 *        in: body
 *        description: User details to get updated
 *        required: true
 *        type: string
 *        schema:
 *           $ref: '#/definitions/update-user'
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           type: array
 *           $ref: '#/definitions/update-user-res'
 */



/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     tags:
 *       - User (access:admin only)
 *     description: Delete user
 *     produces: application/json
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        description: Token should be like <Bearer {TOKEN}>
 *        required: true
 *        type: string
 *      - name: userId
 *        in: path
 *        description: User
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           type: array
 *           $ref: '#/definitions/update-user-res'
 */