import { useState } from "react";

function AddPersonForm({ onAdd }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") return;
    onAdd(name.trim());
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add
      </button>
    </form>
  );
}

export default AddPersonForm;