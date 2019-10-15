import React from 'react';
import {withStyles} from "@material-ui/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import {SortableElement} from 'react-sortable-hoc';

const styles = {
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto -5px',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.2)'
    }
  },
  boxContent: {
    boxSizing: "border-box",
    position: 'absolute',
    padding: '10px' ,
    width: '100%',
    left: '0',
    bottom: '0',
    color: 'rgba(0, 0, 0, .5)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display: "flex",
    justifyContent: 'space-between'
  },
  deleteIcon: {
    transaction: 'all .3s ease-in-out'
  }
};

const DraggableColorBox = SortableElement((props) => {

  const {color, name, classes, deleteColor} = props;
  
  return (
      <div className={classes.root} style={{backgroundColor: color}}>
        <div className={classes.boxContent}>
          <span>{name}</span>
          <DeleteIcon className={classes.deleteIcon} onClick={deleteColor}/>
        </div>
      </div>
  );
});

export default withStyles(styles)(DraggableColorBox);