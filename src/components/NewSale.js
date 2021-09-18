import { useEffect, useState } from "react";

const BASE_URL = 'http://localhost:3000'

function NewSale({ shopId, onAddAnimal }) {
  const [priority, setPriority] = useState("");
  const [animalId, setAnimalId] = useState("");
  const [animals, setAnimals] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch(BASE_URL + "/animals")
      .then((r) => r.json())
      .then(setAnimals);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      animal_id: Number(animalId),
      shop_id: shopId,
      priority: Number(priority),
    };
    fetch(BASE_URL + "/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((animal) => {
          setPriority("");
          setAnimalId("");
          setErrors([]);
          onAddAnimal(animal);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Sale</h2>
      <div>
        <label htmlFor="animal">Animal</label>
        <select
          id="animal"
          value={animalId}
          onChange={(e) => setAnimalId(e.target.value)}
        >
          <option value="">Select animal...</option>
          {animals.map((animal) => (
            <option key={animal.id} value={animal.id}>
              {animal.species}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="priority">Priority</label>
        <input
          type="number"
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
      </div>
      {errors.map((err) => (
        <p key={err} style={{ color: "red" }}>
          {err}
        </p>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewSale;