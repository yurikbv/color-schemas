import React, {Component} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import chroma from 'chroma-js';
import {withStyles} from "@material-ui/styles";
import './ColorBox.css';

const styles = {
  ColorBox: {
    width: '20%',
    height: props => props.showLink ? '25%' : '50%',
    margin: '0 auto -5px',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    "&:hover button": {
      opacity: '1',
      transition: '0.5s'
    }
  },
  copyText: {
    color: props => chroma(props.background).luminance() >= 0.6 ? 'black' : 'white'
  },
  colorName: {
    color: props => chroma(props.background).luminance() <= 0.09 ? 'white' : 'black'
  },
  seeMore: {
    background: 'rgba(255,255,255,.3)',
    position: 'absolute',
    border: 'none',
    right: '0',
    bottom: '0',
    color: props => chroma(props.background).luminance() >= 0.6 ? 'rgba(0, 0, 0, .6)' : 'white',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase'
  },
  copyButton: {
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    outline: 'none',
    background: 'rgba(255,255,255,.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    color: props => chroma(props.background).luminance() >= 0.6 ? 'rgba(0, 0, 0, .6)' : 'white',
    textTransform: 'uppercase',
    border: 'none',
    opacity: '0',
    cursor: 'pointer',
    textDecoration: 'none'
  }
};

class ColorBox extends Component {

  state = {
    copied: false
  };

  changeCopyState = () => {
    this.setState({copied: true}, () => {
      setTimeout(() => this.setState({copied: false}), 1500);
    });
  };

  render() {
    const {background, name, moreUrl, showLink, classes} = this.props;

    return (
        <CopyToClipboard text={background} onCopy={this.changeCopyState}>
          <div className={classes.ColorBox} style={{background: background}}>

            <div className={`copy-overlay ${this.state.copied && 'show'}`} style={{background: background}}/>
            <div className={`copy-msg ${this.state.copied && 'show'}`}>
              <h1>Copied!</h1>
              <p className={classes.copyText}>{background}</p>
            </div>

            <div className="copy-container">
              <div className="box-content">
                <span className={classes.colorName}>{name}</span>
              </div>
              <button className={classes.copyButton}>Copy</button>
            </div>
            {showLink && <Link to={moreUrl}
                               onClick={e => e.stopPropagation()}>
              <span className={classes.seeMore}>MORE</span>
            </Link>}
          </div>
        </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);