import axios from 'axios';

//--------------------LOGIN--------------------//

// Correct credentials
// {
//     "email": "eve.holt@reqres.in",
//     "password": "cityslicka"
// }
export const login = async (credentials) => {
    try {
      const response = await axios.post('https://reqres.in/api/login', credentials);
      const data = response.data;
      console.log('login effettuato con successo, token:', data.token);
      sessionStorage.setItem('token', data.token)
      return data;
    } catch (error) {
      console.error('errore di login: ', error);
    }
  }
  
  