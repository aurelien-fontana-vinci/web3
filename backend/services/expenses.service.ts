import fs from "fs";
import { db } from "../src/prisma/db.ts"
import type { Expense, NewExpense } from "../types/expense.ts";

export class ExpensesService {

  private static dataPath = "./data/expenses.json";
  private static resetPath = "./data/expenses.init.json";
  
  public static async getExpenses(): Promise<Expense[]> {
    try {
      const rows = await db.orm.public.Expense.all();
      const expenses = rows.map((row: any) => ({
        id: row.id.toString(),
        date: row.date,
        amount: row.amount,
        description: row.description,
        payer: row.payer,
      }));
      return expenses;
    } catch (error) {
      console.error("Error getting expenses:", error);
      throw error;
    }
  }
  
  public static async addExpense(newExpense: NewExpense): Promise<Expense> {
    // const expenses = await this.getExpenses();
    // const expense: Expense = {
    //   ...newExpense,
    //   id: (expenses.length + 1).toString()
    // };
    // expenses.push(expense);
    // this.saveExpenses(expenses);
    // return expenses;
    
    try {
      const expense = await db.orm.public.Expense.create(newExpense);
      return {
        id: expense.id.toString(),
        date: expense.date,
        amount: expense.amount,
        description: expense.description,
        payer: expense.payer,
      };
    } catch (error) {
      console.error("Error adding expense:", error);
      throw error;
    }
  }
  
   public static async resetExpenses(): Promise<Expense[]> {
    try {
      await db.orm.public.Expense.where({}).deleteAll();
      return [];
    } catch (error) {
      console.error("Error resetting expenses:", error);
      throw error;
    }
  }
  
}