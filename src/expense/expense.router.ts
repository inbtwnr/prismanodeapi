import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from "express-validator";

import * as ExpenseService from './expense.service';

export const expenseRouter = express.Router();

// GET /expenses
expenseRouter.get('/', async (req: Request, res: Response) => {
  try {
    const expenses = await ExpenseService.listExpencese();
    return res.status(200).json(expenses);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});