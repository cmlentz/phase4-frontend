import { Link, Route, Switch } from "react-router-dom";
import Shop from "./Shop";
import Home from "./Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>
        <Link to="/">Animania!!!</Link><br />
      </h1>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/shops/:id">
          <Shop />
        </Route>
      </Switch>
    </div>
  );
}

export default App;