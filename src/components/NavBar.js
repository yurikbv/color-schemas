import React, {Component} from 'react';
import Slider from "rc-slider";
import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import 'rc-slider/assets/index.css';

import './NavBar.scss';

class NavBar extends Component {

  state = {
    format: 'hex',
    open: false
  };

  handleChange = (event) => {
    this.setState({format: event.target.value, open: true});
    this.props.handleChange(event.target.value);
  };

  closeSnackbar = () => this.setState({open: false});

  render() {

    const {level, changeLevel} = this.props;
    const { format, open } = this.state;

    return (
        <header className="NavBar">

          <div className="Logo">
            <Link to="/">reactcolorpicker</Link>
          </div>

          <div className="slider-container">
            <span>Level: {level}</span>
            <div className="slider">
              <Slider
                  defaultValue={level}
                  min={100}
                  max={900}
                  step={100}
                  onChange={changeLevel}
                  trackStyle={{backgroundColor: 'transparent'}}
                  railStyle={{height: '8px'}}
                  handleStyle={{
                    backgroundColor: 'green',
                    outline: 'none',
                    border: '2px solid green',
                    boxShadow: 'none',
                    width: '13px',
                    height:'13px',
                    margin: '-2px 0 0 -7px'
                  }}
              />
            </div>
          </div>

          <div className="select-container">
            <Select onChange={this.handleChange} value={format}>
              <MenuItem value="hex">HEX - #ffffff</MenuItem>
              <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
              <MenuItem value="rgba">RGB - rgba(255, 255, 255, 1)</MenuItem>
            </Select>
          </div>
          <Snackbar
              anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
              open={open}
              autoHideDuration={3000}
              message={<span id="message-id">Format changed to {format.toUpperCase()}!</span>}
              ContentProps={{
                'aria-describedby': 'message-id'
              }}
              onClose={this.closeSnackbar}
              action={[
                <IconButton onClick={this.closeSnackbar} color="inherit" key="close" aria-label="close">
                  <CloseIcon/>
                </IconButton>
              ]}
          />
        </header>
    );
  }
}

export default NavBar;