import React from 'react';
// components
import Nav from './components/Nav';
import Footer from './components/Footer';
// pages
import Home from './pages/Home';
import About from './pages/About';
import Graph from './pages/Graph';
import Symptom from './pages/Symptom';
// react-router-dom
import { 
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

export default function Routes() {
    return (
        <Router>
            <Nav />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/symptom" component={Symptom} />
                <Route exact path="/graph" component={Graph} />
                <Route exact path="/about" component={About} />
            </Switch>
            <Footer />
        </Router>
    );
}
