import React, {lazy ,useState} from 'react';
import './App.css';

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';


const importView = name => lazy(() =>
    import(`./Components/${name}`)
      .catch(() => console.log("cannot load"))
  );

const Component = ({ Comp }) => <Comp/>;

function App() {
  const [value, setvalue] = useState(null);
  const [Component, setcomponent] = useState(null);
  
  const loadComponent = name => {
    const Component = importView(name);
    setcomponent(Component);
  };
  
  function handleChange(e){ 
    setvalue(e.target.value);
    console.log(e.target.value);
    loadComponent(e.target.value);
  }

  return (
    <div className="App">
      <Grid container item xs={12} justify="center" alignItems="center" style={{height: "100vh"}}>
      <Grid  container item xs={12} justify="center" >
          <Select
            value={value}
            onChange={handleChange}
            style={{width: "200px"}}
          >
            <MenuItem value="Component1">Component1</MenuItem>
            <MenuItem value="Component2">Companent2</MenuItem>
            <MenuItem value="Component3">Companent3</MenuItem>
        </Select>
        </Grid>
        <Grid container item xs={12} justify="center" alignItems="center">
          <React.Suspense fallback={<CircularProgress />}>
          <div className="row">
          {Component && <Component Comp={Component}  />}
          </div>
          </ React.Suspense>
          </Grid>
        </ Grid>
    </div>
  );
}

export default App;
