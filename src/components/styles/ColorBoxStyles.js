import chroma from "chroma-js";

export default {
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