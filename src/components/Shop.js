import { useEffect, useState } from "react";
import { useParams } from "react-router";
import NewSale from "./NewSale";
import {BASE_URL} from '../constraints/index.js';
import ContactCard from './ContactCard/ContactCard';
import styled from 'styled-components/macro';

const LeftDiv = styled.div`
float: left;
width: 20%;
padding: 10px;
`
const RightDiv = styled.div`
float: left;
width: 50%;
`

function Shop() {
  const [{ data: shop, error, status }, setShop] = useState({
    data: null,
    error: null,
    status: "pending",
  });
  const { id } = useParams();

  useEffect(() => {
    fetch(BASE_URL + `/shops/${id}`)
    .then((r) => {
      if (r.ok) {
        r.json().then((shop) =>
          setShop({ data: shop, error: null, status: "resolved" })
        );
      } else {
        r.json().then((err) =>
          setShop({ data: null, error: err.error, status: "rejected" })
        );
      }
    });
  }, [id]);

  function handleAddAnimal(newAnimal) {
    setShop({
      error,
      status,
      data: {
        ...shop,
        animals: [...shop.animals, newAnimal],
      },
    });
  }

  if (status === "pending") return <h2>Loading...</h2>;
  if (status === "rejected") return <h2>Error: {error}</h2>;

  return (
    <div>
      <div id="outer">
        <LeftDiv>
          <ContactCard
            avatarSrc="https://cdn.quotesgram.com/small/61/60/913087158-laugh.jpg"
            name={shop.name}
            location={ `${shop.city}, ${shop.state}` }
            email={`${shop.name}@petfinder.com`}
          />
        </LeftDiv>
        <RightDiv>
          <ul>
            <li><h2>Available Pets: </h2></li>
            {shop.animals.map((animal) => (
              <li key={animal.id}>
                {animal.species}
              </li>
            ))}
          </ul>
        </RightDiv>
        <NewSale onAddAnimal={handleAddAnimal} shopId={shop.id} />
      </div>
    </div>
  );
}

export default Shop;