import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Movies from './components/movies'
import NotFound from './components/notFound';
import Customer from './components/customer';
import Rental from './components/rental'
import Navbar from './components/navbar';
import MoiveForm from './components/movieForm';
import LoginForm from './components/loginform';
import RegisterForm from './components/registerform'
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
            <Route path='/register' component={RegisterForm} />
            <Route path='/login' component={LoginForm} />
            <Route path='/movies/:id' component={MoiveForm} />
            <Route path='/movies' component={Movies} />
            <Route path='/customer' component={Customer} />
            <Route path='/rental' component={Rental} />
            <Route path='/not-found' component={NotFound} />
            <Redirect from='/' exact to='/movies' />
            <Redirect to='/not-found' />
          </Switch>
        </main>


      </React.Fragment>


    );
  }
}

export default App;
