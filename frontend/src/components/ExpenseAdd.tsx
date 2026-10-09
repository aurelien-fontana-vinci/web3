import { useState } from "react";
import type { NewExpense } from "../types/Expense";

interface ExpenseAddProps {
  addExpense: (expense: NewExpense) => void;
}


function ExpenseAdd({ addExpense }: ExpenseAddProps) {
  /* One state per input field */
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [payer, setPayer] = useState('');
  const [errors, setErrors] = useState<{ description?: string; amount?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    const newErrors: typeof errors = {};
    if (!description) newErrors.description = 'Description required';
    if (!amount || parseFloat(amount) < 0.01) newErrors.amount = 'Amount required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      addExpense({
        description: description,
        amount: parseFloat(amount),
        date: new Date().toISOString(),
        payer: payer, // Hardcoded for now, will be dynamic later
      });
      setDescription('');
      setAmount('');
      setPayer('');
      setErrors({});
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      {errors.description && <span>{errors.description}</span>}
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      {errors.amount && <span>{errors.amount}</span>}
      <input type="select" value={payer} onChange={(e) => setPayer(e.target.value)}>
        <option value="ALICE">Alice</option>
        <option value="BOB">Bob</option>
      </input>
      <button type="submit">Add</button>
    </form>
  );
}
export default ExpenseAdd;