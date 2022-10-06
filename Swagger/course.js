/**
 * @swagger
 * definitions:
 *   courses:
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
 *              $ref: '#/definitions/course'
 *
 */

/**
 * @swagger
 * definitions:
 *   course:
 *      properties:
 *          scholarshipAvailable:
 *              type: boolean
 *          _id:
 *              type: string
 *          title:
 *              type: string
 *          description:
 *              type: string
 *          weeks:
 *              type: string
 *          tuition:
 *              type: integer
 *          minimumSkill:
 *              type: string
 *          bootcamp:
 *              type: string
 *          user:
 *              type: string
 *          createdAt:
 *              type: string
 *
 */


/**
 * @swagger
 * /courses:
 *   get:
 *     tags:
 *       - Courses
 *     description: Get all Courses
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
 *           $ref: '#/definitions/courses'
 */

/**
 * @swagger
 * /bootcamps/{bootcampId}/courses:
 *   get:
 *     tags:
 *       - Courses
 *     description: Get Courses based on Bootcamp
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
 *           $ref: '#/definitions/courses'
 */

/**
 * @swagger
 * definitions:
 *   single-course:
 *      properties:
 *          scholarshipAvailable:
 *              type: boolean
 *          _id:
 *              type: string
 *          title:
 *              type: string
 *          description:
 *              type: string
 *          weeks:
 *              type: string
 *          tuition:
 *              type: integer
 *          minimumSkill:
 *              type: string
 *          bootcamp:
 *              properties:
 *                  _id:
 *                      type: string
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *          user:
 *              type: string
 *          createdAt:
 *              type: string
 *
 */


/**
 * @swagger
 * /courses/{courseId}:
 *   get:
 *     tags:
 *       - Courses
 *     description: Get Single Course
 *     produces: application/json
 *     parameters:
 *      - name: courseId
 *        in: path
 *        description: Course
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/single-course'
 */

/**
 * @swagger
 * definitions:
 *   create-course:
 *      properties:
 *          title:
 *              type: string
 *          description:
 *              type: string
 *          weeks:
 *              type: string
 *          tuition:
 *              type: integer
 *          minimumSkill:
 *              type: string
 *          scholarshipAvailable:
 *              type: boolean
 */

/**
 * @swagger
 * /bootcamps/{bootcampId}/courses:
 *   post:
 *     tags:
 *       - Courses
 *     description: Create course based on bootcamp
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
 *      - name: Course
 *        in: body
 *        description: Course Details
 *        required: true
 *        type: string
 *        schema:
 *           $ref: '#/definitions/create-course'
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/course'
 */


/**
 * @swagger
 * /courses/{courseId}:
 *   put:
 *     tags:
 *       - Courses
 *     description: Update Course
 *     produces: application/json
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        description: Token should be like <Bearer {TOKEN}>
 *        required: true
 *        type: string
 *      - name: courseId
 *        in: path
 *        description: Course
 *        required: true
 *        type: string
 *      - name: Course
 *        in: body
 *        description: Course Details to be updated
 *        required: true
 *        type: string
 *        schema:
 *           $ref: '#/definitions/create-course'
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/course'
 */

/**
 * @swagger
 * /courses/{courseId}:
 *   delete:
 *     tags:
 *       - Courses
 *     description: Delete Course
 *     produces: application/json
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        description: Token should be like <Bearer {TOKEN}>
 *        required: true
 *        type: string
 *      - name: courseId
 *        in: path
 *        description: Course
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description:  On Success
 *         schema:
 *           $ref: '#/definitions/delete-bootcamp-res'
 */