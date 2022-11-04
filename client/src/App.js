import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import CardDetail from "./components/cardDetail/CardDetail";
import NewRecipe from "./components/newrecipe/NewRecipe";
import About from "./components/about/About";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/recipes" component={Home} />
        <Route exact path="/recipes/:id" component={CardDetail} />
        <Route path="/createRecipe" component={NewRecipe} />
        <Route exact path="/about" component={About} />
      </Switch>
    </>
  );
}

export default App;
