import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import arrayMove from 'array-move';
import DraggableColorList from "./DraggableColorList";

const drawerWidth = 380;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const NewPaletteForm = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState('purple');
  const [colors, setColors] = useState([{color: 'blue', name: 'blue'}]);
  const [newColorName, setNewColorName] = useState('');
  const [newPaletteName, setNewPaletteName] = useState('');

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
        colors.every( color => color.name.toLowerCase() !== value.toLowerCase())
    );
  },[colors]);

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorUnique', () =>
        colors.every(color => color.color !== currentColor)
    );
  },[currentColor, colors]);

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
        props.palettes.every( ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase())
    )
  },[]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCurrentColor = newColor => {
    setCurrentColor(newColor.hex);
  };

  const addNewColor = () => {
    const newColor = {color: currentColor, name: newColorName};
    setColors([...colors, newColor]);
    setNewColorName('');
  };

  const handleChange = event => {
    setNewColorName(event.target.value);
  };

  const savePalette = () => {
    const newName = newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors
    };
    props.savePalette(newPalette);
    props.history.push('/');
  };

  const handleChangePalette = event => {
    setNewPaletteName(event.target.value);
  };

  const deleteColor = name => {
    console.log(name);
    setColors([...colors.filter(color => color.name !== name)])
  };

  const onSortEnd = ({oldIndex, newIndex}) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
            color="default"
        >
          <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Create a Palette
            </Typography>
            <ValidatorForm onSubmit={savePalette}>
              <TextValidator
                  value={newPaletteName}
                  label="Palette Name"
                  onChange={handleChangePalette}
                  validators={['required','isPaletteNameUnique']}
                  errorMessages={['Enter palette name', 'Name already used']}
              />
              <Button variant="contained" color="primary" type="submit">Save palette</Button>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Typography variant="h4">Design Your Palette</Typography>
          <div>
            <Button variant="contained" color="secondary">Clear Palette</Button>
            <Button variant="contained" color="primary">Random Color</Button>
          </div>
          <ChromePicker color={currentColor} onChangeComplete={updateCurrentColor}/>
          <ValidatorForm onSubmit={addNewColor}>
            <TextValidator
                value={newColorName}
                onChange={handleChange}
                validators={['required', 'isColorNameUnique', 'isColorUnique']}
                errorMessages={['Enter color name', 'Color name must be unique', 'Color already used']}
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{backgroundColor: currentColor}}
            >Add color</Button>
          </ValidatorForm>
        </Drawer>
        <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
              colors={colors}
              deleteColor={deleteColor}
              axis="xy"
              onSortEnd={onSortEnd}
          />
        </main>
      </div>
  );
};

export default NewPaletteForm;
