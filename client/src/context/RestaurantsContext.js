import React, {useState, createContext} from "react";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = props => {

    const [restaurants, setRestaurants] = useState([]);

    const addRestaurants = (restaurant) => {
        setRestaurants([...restaurants, restaurant]);   // ...restaurants copy all the entries in the old array and 
                                                        // add the new restaurant var
    }

    return (
        <RestaurantsContext.Provider value={ {restaurants, setRestaurants, addRestaurants} }>
            {props.children}
        </RestaurantsContext.Provider>
    )
}