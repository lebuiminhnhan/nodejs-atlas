import * as express from 'express';
import * as userController from '../controllers/userController';

const userRouter = express.Router();
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of users
 *     responses:
 *       '200':
 *         description: A list of users
 */
userRouter.get('/', userController.getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       '200':
 *         description: A single user object
 *       '404':
 *         description: User not found
 */
userRouter.get('/:id', userController.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User created successfully
 */
userRouter.post('/', userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Update the details of a user with the provided ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '404':
 *         description: User not found
 */
userRouter.put('/:id', userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user with the provided ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       '204':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 */
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;