import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RestaurantsContextProvider } from './context/RestaurantsContext';
import Home from './routes/Home';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import UpdatePage from './routes/UpdatePage';
import BasicEmbed from './components/BasicEmbed';

const App = () => {
    return (
        <RestaurantsContextProvider>
            <div className="container">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/restaurants/:id/update" component={UpdatePage}/>
                        <Route exact path="/restaurants/:id" component={RestaurantDetailPage}/>
                    </Switch>
                </Router>
            </div>

            <div className="App">
                <h1>Tableau Dashboard in React </h1>
                <BasicEmbed/>
            </div>
        </RestaurantsContextProvider>
        
    )
};

export default App;