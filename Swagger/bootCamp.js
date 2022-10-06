/**
 * @swagger
 * definitions:
 *   bootcamps:
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
 *              $ref: '#/definitions/bootcamp'
 *
 */

/**
 * @swagger
 * definitions:
 *   bootcamp:
 *      properties:
 *          location:
 *              properties:
 *                  formattedAddress:
 *                      type:string
 *                  street:
 *                      type: string
 *                  city:
 *                      type:string
 *                  state:
 *                      type:string
 *                  zipcode:
 *                      type:string
 *                  types:
 *                      type: string
 *                  coordinates:
 *                      type: array
 *                      items:
 *                          //coordinates
 *          careers:
 *              type: array
 *              items:
 *                  //careers
 *          photo:
 *              type: string
 *          housing:
 *              type: string
 *          jobAssistance:
 *              type: string
 *          jobGuarantee:
 *              type: string
 *          acceptGi:
 *              type: string
 *          _id:
 *              type: string
 *          user:
 *              type: string
 *          name:
 *              type: string
 *          description:
 *              type: string
 *          website:
 *              type: string
 *          phone:
 *              type: string
 *          email:
 *              type: string
 *          createdAt:
 *              type: string
 *          slug:
 *              type: string
 *          averageCost:
 *              type: integer
 *          averageRating:
 *              type: integer
 *          courses:
 *              type: array
 *              items:
 *                   //courses
 *          id:
 *              type:string
 *
 */


/**
 * @swagger
 * /bootcamps:
 *   get:
 *     tags:
 *       - Bootcamp
 *     description: Get all Bootcamps
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
 *           $ref: '#/definitions/bootcamps'
 */

/**
 * @swagger
 * /bootcamps/{bootcampId}:
 *   get:
 *     tags:
 *       - Bootcamp
 *     description: Get single Bootcamp based on bootcampId
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
 *           $ref: '#/definitions/bootcamp'
 */

/**
 * @swagger
 * definitions:
 *   create-bootcamp:
 *      properties:
 *          name:
 *              type: string
 *          description:
 *              type: string
 *          website:
 *              type: string
 *          phone:
 *              type: string
 *          email:
 *              type: string
 *          address:
 *              type: string
 *          careers:
 *              type: array
 *              items:
 *                  //careers
 *          housing:
 *              type: boolean
 *          jobAssistance:
 *              type: boolean
 *          jobGuarantee:
 *              type: boolean
 *          acceptGi:
 *              type: boolean
 *
 */

/**
 * @swagger
 * /bootcamps:
 *   post:
 *     tags:
 *       - Bootcamp
 *     description: Create New Bootcamp
 *     produces: application/json
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        description: Token should be like <Bearer {TOKEN}>
 *        required: true
 *        type: string
 *      - name: Bootcamp
 *        in: body
 *        description: Bootcamp Details
 *        required: true
 *        type: string
 *        schema:
 *           $ref: '#/definitions/create-bootcamp'
 *     responses:
 *       201:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/bootcamp'
 */

/**
 * @swagger
 * definitions:
 *   update-bootcamp:
 *     properties:
 *       housing:
 *         type: boolean
 *       name:
 *         type: string
 *       description:
 *         type: string
 */

/**
 * @swagger
 * /bootcamps/{bootcampId}:
 *   put:
 *     tags:
 *       - Bootcamp
 *     description: Update Bootcamp
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
 *      - name: Bootcamp
 *        in: body
 *        description: Bootcamp Details to get updated
 *        required: true
 *        type: string
 *        schema:
 *           $ref: '#/definitions/update-bootcamp'
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/bootcamp'
 */

/**
 * @swagger
 * definitions:
 *   delete-bootcamp-res:
 *     properties:
 *       success:
 *         type: boolean
 *       message:
 *         type: string
 */

/**
 * @swagger
 * /bootcamps/{bootcampId}:
 *   delete:
 *     tags:
 *       - Bootcamp
 *     description: Delete Bootcamp
 *     produces: application/json
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        description: Token should be like <Bearer {TOKEN}>
 *        required: true
 *        type: string
 *      - name: bootcampId
 *        in: path
 *        description: Bootcamp to be deleted
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/delete-bootcamp-res'
 */


/**
 * @swagger
 * /bootcamps/radius/{zipcode}/{distance}:
 *   get:
 *     tags:
 *       - Bootcamp
 *     description: Get Bootcamp By Distance
 *     produces: application/json
 *     parameters:
 *      - name: zipcode
 *        in: path
 *        description: Zipcode of areas
 *        required: true
 *        type: integer
 *      - name: distance
 *        in: path
 *        description: Distance to cover bootcamps
 *        required: true
 *        type: integer
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/bootcamps'
 */

/**
 * @swagger
 * definitions:
 *   photo-upload-bootcamp:
 *     properties:
 *       success:
 *         type: boolean
 *       data:
 *         type: string
 */


/**
 * @swagger
 * /bootcamps/{bootcampId}/photo:
 *   put:
 *     tags:
 *       - Bootcamp
 *     description: Upload a photo for bootcamp
 *     produces:
 *         - multipart/form-data
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
 *      - name: file
 *        in: formData
 *        description: Bootcamp
 *        required: true
 *        type: file
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/photo-upload-bootcamp'
 */