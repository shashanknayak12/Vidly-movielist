import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Movies from './components/movies'
import NotFound from './components/notFound';

import Navbar from './components/navbar';
import MoiveForm from './components/movieForm';

import MovieForm from './components/movieForm';
import './App.css';



class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className='container'>
          <Switch>
            <Route path='/newmovieform' component={MovieForm} />

            <Route path='/movies/:id' component={MoiveForm} />
            <Route path='/movies' component={Movies} />

            <Route path='/not-found' component={NotFound} />
            <Route exact path='/' component={Movies} />
            <Redirect to='/not-found' />
          </Switch>
        </main>


      </React.Fragment>


    );
  }
}

export default App;
