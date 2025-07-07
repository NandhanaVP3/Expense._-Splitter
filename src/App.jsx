import { useState } from "react";
import AddPersonForm from "./components/AddPersonForm";
import AddExpenseForm from "./components/AddExpenseForm";

function App() {
  const [people, setPeople] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const handleAddPerson = (name) => {
    setPeople((prev) => [...prev, name]);
  };

  const handleAddExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const handleReset = () => {
    setPeople([]);
    setExpenses([]);
  };

  const calculateBalances = () => {
    if (people.length === 0 || expenses.length === 0) return [];

    const totalPaid = {};
    people.forEach((person) => (totalPaid[person] = 0));

    expenses.forEach((expense) => {
      totalPaid[expense.payer] += expense.amount;
    });

    const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
    const share = totalAmount / people.length;

    const balances = people.map((person) => ({
      name: person,
      balance: totalPaid[person] - share,
    }));

    return balances;
  };

  const getSettleUpSuggestions = () => {
    const balances = calculateBalances();
    const debtors = [];
    const creditors = [];

    balances.forEach(({ name, balance }) => {
      if (balance < 0) debtors.push({ name, balance: -balance });
      else if (balance > 0) creditors.push({ name, balance });
    });

    const suggestions = [];

    let i = 0,
      j = 0;
    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];
      const amount = Math.min(debtor.balance, creditor.balance);

      suggestions.push({
        from: debtor.name,
        to: creditor.name,
        amount: amount.toFixed(2),
      });

      debtor.balance -= amount;
      creditor.balance -= amount;

      if (debtor.balance === 0) i++;
      if (creditor.balance === 0) j++;
    }

    return suggestions;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        💰 Expense Splitter
      </h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleReset}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            🔄 Reset All
          </button>
        </div>

        <AddPersonForm onAdd={handleAddPerson} />
        <AddExpenseForm people={people} onAddExpense={handleAddExpense} />

        <h2 className="text-xl font-semibold mt-6 mb-2">Expenses</h2>
        <ul className="space-y-2">
          {expenses.map((expense, index) => (
            <li
              key={index}
              className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded"
            >
              {expense.payer} paid ₹{expense.amount} for {expense.description}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Balances</h2>
        <ul className="space-y-2">
          {calculateBalances().map((entry, index) => (
            <li
              key={index}
              className={`px-4 py-2 rounded ${
                entry.balance > 0
                  ? "bg-green-100 text-green-800"
                  : entry.balance < 0
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {entry.name}{" "}
              {entry.balance > 0
                ? "is owed"
                : entry.balance < 0
                ? "owes"
                : "is settled"}{" "}
              ₹{Math.abs(entry.balance).toFixed(2)}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Settle Up Suggestions</h2>
        <ul className="space-y-2">
          {getSettleUpSuggestions().length === 0 ? (
            <li className="text-gray-600">All settled up! 🎉</li>
          ) : (
            getSettleUpSuggestions().map((s, index) => (
              <li
                key={index}
                className="bg-purple-100 text-purple-800 px-4 py-2 rounded"
              >
                {s.from} should pay ₹{s.amount} to {s.to}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;