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

const StyledButton = styled.button`
font-size: 1rem;
border: 1px solid;
border-radius: 2px;
background-color: red;
text-align: center;
`

const StyledList = styled.ul`
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
      <StyledHeader>Animals</StyledHeader>
      <StyledList>
        {animals.map((animal) => (
          <li key={animal.id}>
            <span>{animal.species}</span>
            <StyledButton onClick={() => handleDeleteAnimal(animal.id)}>
              Delete
            </StyledButton>
          </li>
        ))}
      </StyledList>
      <hr />
      <StyledHeader>Shops</StyledHeader>
      <StyledList>
        {shops.map((shop) => (
          <li key={shop.id}>
            <span>{shop.name}</span>
            <Link to={`/shops/${shop.id}`}>View Animals</Link>
          </li>
        ))}
      </StyledList>
      <hr />
      <NewShop onAddShop={handleAddShop} />
    </div>
  );
}

export default Home;