import React from 'react';
import { Route, Switch } from 'react-router-dom';
import seedColors from "./seedColors";
import Palette from "./components/Palette";
import { generatePalette } from "./colorHelpers";
import PaletteList from "./components/PaletteList";

function App() {

  const findPalette = id => seedColors.find( palette => palette.id === id);

  return (
      <Switch>
        <Route exact path="/" render={(routeProps) => <PaletteList {...routeProps} palettes={seedColors}/>}/>
        <Route exact path="/palette/:id"
               render={(routeProps) =>
                   <Palette
                       {...routeProps}
                       palette={generatePalette(findPalette(routeProps.match.params.id))}/>}/>
      </Switch>
  );
}

export default App;
