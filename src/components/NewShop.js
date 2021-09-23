import { useState } from "react";
import {BASE_URL} from '../constraints/index.js';
import styled from 'styled-components/macro';

const StyledButton = styled.button`
font-size: 1rem;
border: 1px solid;
border-radius: 2px;
background-color: limegreen;
text-align: center;
`

function NewShop({ onAddShop }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      name,
      city,
    };
    fetch(BASE_URL + "/shops", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((shop) => {
          setName("");
          setCity("");
          setErrors([]);
          onAddShop(shop);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <center>
      <h2>Add New Shop</h2>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="city">City: </label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      {errors.map((err) => (
        <p key={err} style={{ color: "red" }}>
          {err}
        </p>
      ))}
      <StyledButton type="submit">Submit</StyledButton>
      </center>
    </form>
  );
}

export default NewShop;