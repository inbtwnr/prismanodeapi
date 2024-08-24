import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from "express-validator";

import * as UserService from './user.service';

export const userRouter = express.Router();

// GET /users
userRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users = await UserService.listUsers();
    return res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

// GET /users/:id
userRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = parseInt(id, 10);
  try {
    const user = await UserService.getUser(userId);
    if (!user) {
      return res.status(404).json('User not found');
    }
    return res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

// POST /users
userRouter.post('/', [
  body('name').isString().notEmpty(),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name } = req.body;
  try {
    const user = await UserService.createUser({ name });
    return res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

// PUT /users/:id
userRouter.put('/:id', [
  body('name').isString().notEmpty(),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  const userId = parseInt(id, 10);
  const { name } = req.body;
  try {
    const user = await UserService.updateUser(userId, { name });
    if (!user) {
      return res.status(404).json('User not found');
    }
    return res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

// DELETE /users/:id
userRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = parseInt(id, 10);
  try {
    const user = await UserService.deleteUser(userId);
    if (!user) {
      return res.status(404).json('User not found');
    }
    return res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});