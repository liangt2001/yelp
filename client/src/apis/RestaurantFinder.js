import axios from "axios";

// ternary operator
// env var to dictate if in production mode
// NODE_ENV = 'development'
// NODE_ENV = 'production'

// if we are in production, baseURL = /api/v1/restaurants
// else baseURL = http://localhost:3001/api/v1/restaurants

// const baseURL = "http://localhost:3001/api/v1/restaurants"

const baseURL = process.env.NODE_ENV === 'production'
    ? "api/v1/restaurants"
    : "http://localhost:3001/api/v1/restaurants"

export default axios.create({
    baseURL,
});