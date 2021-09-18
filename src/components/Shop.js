import { useEffect, useState } from "react";
import { useParams } from "react-router";
import NewSale from "./NewSale";

const BASE_URL = 'http://localhost:3000'

function Shop() {
  const [{ data: shop, error, status }, setShop] = useState({
    data: null,
    error: null,
    status: "pending",
  });
  const { id } = useParams();

  useEffect(() => {
    fetch(BASE_URL + `/shops/${id}`).then((r) => {
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
      <h2>{shop.name}'s Animals</h2>
      <ul>
        {shop.animals.map((animal) => (
          <li key={animal.id}>
            {animal.species}
          </li>
        ))}
      </ul>
      <hr />
      <NewSale onAddAnimal={handleAddAnimal} shopId={shop.id} />
    </div>
  );
}

export default Shop;