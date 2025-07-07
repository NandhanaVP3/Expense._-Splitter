import { useState } from "react";

function AddExpenseForm({ people, onAddExpense }) {
  const [payer, setPayer] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!payer || !amount || !description) return;

    onAddExpense({
      payer,
      amount: parseFloat(amount),
      description,
    });

    setPayer("");
    setAmount("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <label className="block mb-1 font-medium">Who Paid?</label>
        <select
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select person</option>
          {people.map((person, index) => (
            <option key={index} value={person}>
              {person}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter amount"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="e.g. Dinner, Cab, Snacks"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Expense
      </button>
    </form>
  );
}

export default AddExpenseForm;