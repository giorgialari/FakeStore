import axios from "axios";

//--------------------REGISTER--------------------//

// Correct credentials
// {
//     "email": "eve.holt@reqres.in",
//     "password": "pistol"
// }
export const register = async (credentials) => {
  try {
    const response = await axios.post(
      "https://reqres.in/api/register",
      credentials
    );
    const data = response.data;
    console.log("login effettuato con successo, token:", data.token);
    sessionStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    console.error("errore di login: ", error);
  }
};
