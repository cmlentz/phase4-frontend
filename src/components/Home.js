import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewShop from "./NewShop";

function Home() {
  const [shops, setShops] = useState([]);
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    fetch("/animals")
      .then((r) => r.json())
      .then(setAnimals);
  }, []);

  useEffect(() => {
    fetch("/shops")
      .then((r) => r.json())
      .then(setShops);
  }, []);

  function handleAddShop(newShop) {
    setShops((shops) => [...shops, newShop]);
  }

  function handleDeleteAnimal(id) {
    fetch(`/animals/${id}`, {
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
      <h2>Animals</h2>
      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>
            <span>
              {animal.name}
            </span>
            <button onClick={() => handleDeleteAnimal(animal.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <h2>Shops</h2>
      <ul>
        {shops.map((shop) => (
          <li key={shop.id}>
            <span>
              {shop.name}
            </span>
            <Link to={`/shops/${shop.id}`}>View Animals</Link>
          </li>
        ))}
      </ul>
      <hr />
      <NewShop onAddShop={handleAddShop} />
    </div>
  );
}

export default Home;