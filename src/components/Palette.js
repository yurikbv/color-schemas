import React, {Component} from 'react';
import ColorBox from "./ColorBox";
import './Palette.css';
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";

class Palette extends Component {

  state = {
    level: 500,
    format: 'hex'
  };

  changeLevel = (level) => {
    this.setState({level})
  };

  changeFormat = (value) => {
    this.setState({format: value});
  };

  render() {
    const  { colors, paletteName, emoji, id } = this.props.palette;
    const { level, format } = this.state;
    const colorBoxes = colors[level].map( color => (
       <ColorBox
           background={color[format]}
           key={color.id}
           name={color.name}
           moreUrl={`/palette/${id}/${color.id}`}
           showLink
       />
    ));

    return (
        <div className="Palette">
          <NavBar
              level={level}
              changeLevel={this.changeLevel}
              handleChange={this.changeFormat}
              showingAllColors
          />
          <div className="Palette-colors">{colorBoxes}</div>
          <PaletteFooter paletteName={paletteName} emoji={emoji}/>
        </div>
    );
  }
}

export default Palette;