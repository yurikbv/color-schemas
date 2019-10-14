import React, {Component} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import {withStyles} from "@material-ui/styles";
import './ColorBox.css';
import styles from './styles/ColorBoxStyles';

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