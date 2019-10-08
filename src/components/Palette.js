import React, {Component} from 'react';
import ColorBox from "./ColorBox";
import './Palette.css';
import NavBar from "./NavBar";

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
    const  { colors, paletteName, emoji } = this.props.palette;
    const { level, format } = this.state;
    const colorBoxes = colors[level].map( color => (
       <ColorBox background={color[format]} key={color.id}/>
    ));

    return (
        <div className="Palette">
          <NavBar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat}/>
          <div className="Palette-colors">{colorBoxes}</div>
          <footer className="Palette-footer">
            {paletteName}
            <span className="emoji">{emoji}</span>
          </footer>
        </div>
    );
  }
}

export default Palette;