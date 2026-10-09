import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { NewExpense } from "../types/Expense";

interface ExpenseAddProps {
  addExpense: (newExpense: NewExpense) => void;
}

// Define a schema for an expense
const expenseSchema = z.object({
  description: z.string().max(200, 'Description cannot be longer than 200 characters'),
  amount: z.number().min(0.01, 'Amount must be positive'),
  payer: z.enum(['Bob', "Alice"], {message: "Payer must be either Bob or Alice"}),
  date: z.string(),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

function ExpenseAdd({addExpense}: ExpenseAddProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema)
  });

  const onSubmit = (data: ExpenseFormData) => {
    console.log("Valid expenses : ", data);

    addExpense(data);
    reset();
  };

  return (
    <div>
      <h2>Add a new random Expense</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Payer : </label>
          <select {...register("payer")}>
            <option value="Bob">Bob</option>
            <option value="Alice">Alice</option>
          </select>
        </div>
        <div>
          <label>
            Date :
            <input
              type="date"
              {...register("date")}
            />
            {errors.date && <span>{errors.date.message}</span>}
          </label>
        </div>
        <div>
          <label>
            Description :
            <input
              type="text"
              {...register("description")}
              placeholder="Description"
            />
            {errors.description && <span>{errors.description.message}</span>}
          </label>
        </div>
        <div>
          <label>
            Amount :
            <input
              type="number"
              {...register("amount", {
                valueAsNumber: true,
              })}
              placeholder="Enter amount"
            />
            {errors.amount && <span>{errors.amount.message}</span>}
          </label>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default ExpenseAdd;