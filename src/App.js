import React, {useState} from 'react';
import { Route, Switch } from 'react-router-dom';
import seedColors from "./seedColors";
import Palette from "./components/Palette";
import { generatePalette } from "./colorHelpers";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import NewPaletteForm from "./components/NewPaletteForm";

function App() {

  const [palettes, setPalettes] = useState(seedColors);

  const findPalette = id => palettes.find( palette => palette.id === id);

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette])
  };

  return (
      <Switch>
        <Route exact path="/palette/new" render={(props) => <NewPaletteForm
            savePalette={savePalette}
            palettes={palettes}
            {...props}/>}/>
        <Route exact path="/" render={(routeProps) => <PaletteList {...routeProps} palettes={palettes}/>}/>
        <Route exact path="/palette/:id" render={(routeProps) =>
                   <Palette
                       {...routeProps}
                       palette={generatePalette(findPalette(routeProps.match.params.id))}/>}
        />
        <Route exact path="/palette/:paletteId/:colorId" render={(routeProps) =>
            <SingleColorPalette
                {...routeProps}
                colorId={routeProps.match.params.colorId}
                palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
            />}
        />
      </Switch>
  );
}

export default App;
