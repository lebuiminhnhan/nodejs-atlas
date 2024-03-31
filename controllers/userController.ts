import { Request, Response } from 'express';
import User from '../models/userModel';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const usersList = await User.find();
    res.json(usersList);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserById = (req: Request, res: Response) => {
  // Your logic to fetch a user by ID from the database
  res.send('Get user by ID');
};

export const createUser = (req: Request, res: Response) => {
  // Your logic to create a new user in the database
  res.send('Create a new user');
};

export const updateUser = (req: Request, res: Response) => {
  // Your logic to update a user in the database
  res.send('Update user');
};

export const deleteUser = (req: Request, res: Response) => {
  // Your logic to delete a user from the database
  res.send('Delete user');
};