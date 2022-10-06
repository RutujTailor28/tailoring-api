/**
 * @swagger
 * definitions:
 *   customerData:
 *     properties:
 *       customerData:
 *         type: array
 */

/**
 * @swagger
 * definitions:
 *   customerResponse:
 *     properties:
 *       success:
 *         type: boolean
 *       data:
 *          type: object
 *          items:
 *              $ref: '#/definitions/customerData'
 *       message:
 *          type: string
 *
 *   customer-register-body:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *          type: string
 *       phone:
 *         type: string
 *       address:
 *          type: string
 *       measurement:
 *          type: object
 *       profileImage:
 *          type: object

 *   customer-measurement-body:
 *     properties:
 *       measurement:
 *         type: object

 *   customer-search-body:
 *     properties:
 *       searchString:
 *         type: string
 */

/**
 * @swagger
 * /customer/register:
 *   post:
 *     tags:
 *       - Customers
 *     description: Add an Customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Token should be like <Bearer {TOKEN}>
 *         required: true
 *         type: string
 *       - name: Customer Register
 *         description: Customer's Details
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/customer-register-body'
 *     responses:
 *       201:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/customerResponse'
 */


/**
 * @swagger
 * definitions:
 *   add:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *          type: string
 *       phone:
 *         type: string
 *       address:
 *          type: string
 *       measurement:
 *          type: object
 *       profileImage:
 *          type: object
 */

/**
 * @swagger
 * /customer/getAllCustomers:
 *   get:
 *     tags:
 *       - Customers
 *     description: get all customer's of particular user
 *     produces:
 *       - application/json
 *     parameters:
 *          - name: Authorization
 *            in: header
 *            description: Token should be like <Bearer {TOKEN}>
 *            required: true
 *            type: string
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/customerResponse'
 */

/**
 * @swagger
 * /customer/updateCustomerMeasurement:
 *   post:
 *     tags:
 *       - Customers
 *     description: Add an Customer Measurement
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Token should be like <Bearer {TOKEN}>
 *         required: true
 *         type: string
 *       - name: Customer Measurement
 *         description: Customer's Measurement Details
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/customer-measurement-body'
 *       - name: customerId
 *         in: path
 *         description: Customer
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/customerResponse'
 */

/**
 * @swagger
 * /customer/searchCustomer/{userId}:
 *   post:
 *     tags:
 *       - Customers
 *     description: Search an Customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Token should be like <Bearer {TOKEN}>
 *         required: true
 *         type: string
 *       - name: Customer Register
 *         description: Customer's Details
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/customer-search-body'
 *       - name: userId
 *         in: path
 *         description: User
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/customerResponse'
 */