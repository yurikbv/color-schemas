import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";

class SingleColorPalette extends Component {

  state = {
    format: 'hex'
  };

  gatherShades = (palette, colorToFilterBy) => {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = [...shades, ...allColors[key].filter(color => color.id === colorToFilterBy)]
    }
    return shades.slice(1);
  };

  _shades = this.gatherShades(this.props.palette, this.props.colorId);

  changeFormat = (value) => {
    this.setState({format: value});
  };

  render() {

    const {paletteName, emoji, id} = this.props.palette;

    const colorBoxes = this._shades.map(color => (
       <ColorBox
           key={color.name}
           name={color.name}
           background={color[this.state.format]}
           showLink={false}/>
    ));
    return (
        <div className="SingleColorPalette Palette">
          <NavBar handleChange={this.changeFormat} showingAllColors={false}/>
          <div className="Palette-colors">
            {colorBoxes}
            <div className="go-back ColorBox">
              <Link className="back-button" to={`/palette/${id}`}>Go back</Link>
            </div>
          </div>
          <PaletteFooter paletteName={paletteName} emoji={emoji}/>
        </div>
    );
  }
}

export default SingleColorPalette;