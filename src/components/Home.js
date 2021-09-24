import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewShop from "./NewShop";
import styled from 'styled-components/macro';
import {BASE_URL} from '../constraints/index.js';

const StyledHeader = styled.h2`
font-size: 2rem;
border: 1px solid;
border-radius: 5px;
background-image: linear-gradient(to left, rgba(255,0,0,0), rgba(255,0,0,1));
text-align: center;
`

const ReverseStyledHeader = styled.h2`
font-size: 2rem;
border: 1px solid;
border-radius: 5px;
background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
text-align: center;
`

const StyledButton = styled.button`
font-size: 1rem;
border: 1px solid;
border-radius: 2px;
background-color: red;
text-align: center;
`

function Home() {
  const [shops, setShops] = useState([]);
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    fetch(BASE_URL + "/animals")
      .then((r) => r.json())
      .then(setAnimals);
  }, []);

  useEffect(() => {
    fetch(BASE_URL + "/shops")
      .then((r) => r.json())
      .then(setShops);
  }, []);

  function handleAddShop(newShop) {
    setShops((shops) => [...shops, newShop]);
  }

  function handleDeleteAnimal(id) {
    fetch(BASE_URL + `/animals/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setAnimals((animals) =>
          animals.filter((animal) => animal.id !== id)
        );
      }
    });
  }

  return (
    <div>
      <StyledHeader>Shops</StyledHeader>
      <ul>
        {shops.map((shop) => (
          <li key={shop.id}>
            <span>{shop.name}  </span>
            <Link to={`/shops/${shop.id}`}>Visit Shop</Link>
          </li>
        ))}
      </ul>
      <ReverseStyledHeader>Animals</ReverseStyledHeader>
      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>
            <span>{animal.species}  </span>
            <StyledButton onClick={() => handleDeleteAnimal(animal.id)}>
              Delete
            </StyledButton>
          </li>
        ))}
      </ul>
      <hr />
      <NewShop onAddShop={handleAddShop} />
    </div>
  );
}

export default Home;