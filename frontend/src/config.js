// export const API_URL = 'http://localhost:3000';


let API_URL;

if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://crims-city.ct8.pl';
} else {
  API_URL = 'http://localhost:3000';
}

export { API_URL };
