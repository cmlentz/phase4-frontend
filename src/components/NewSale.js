import { useEffect, useState } from "react";
import {BASE_URL} from '../constraints/index.js';
import styled from 'styled-components/macro';

const StyledButton = styled.button`
font-size: 1rem;
border: 1px solid;
border-radius: 2px;
background-color: limegreen;
text-align: center;
`

function NewSale({ shopId, onAddAnimal }) {
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
      shop_id: shopId
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
      <h2>Add New Animal</h2>
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

      {errors.map((err) => (
        <p key={err} style={{ color: "red" }}>
          {err}
        </p>
      ))}
      <StyledButton type="submit">Submit</StyledButton>
    </form>
  );
}

export default NewSale;