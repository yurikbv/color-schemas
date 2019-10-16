import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import DraggableColorBox from "./DraggableColorBox";

const DraggableColorList = SortableContainer(({colors, deleteColor}) => {



  return (
      <div style={{height: '100%'}}>
        {colors.map((color, i) => (
            <DraggableColorBox
                index={i}
                name={color.name}
                color={color.color}
                key={color.name}
                deleteColor={() => deleteColor(color.name)}
            />
        ))}
      </div>
  );
});

export default DraggableColorList;