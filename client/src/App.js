import "./App.css";
import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import CardDetail from "./components/cardDetail/CardDetail";
import NewRecipe from "./components/newrecipe/NewRecipe";

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/recipes" component={Home} />
          <Route exact path="/recipes/:id" component={CardDetail} />
          <Route path="/createRecipe" component={NewRecipe} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
