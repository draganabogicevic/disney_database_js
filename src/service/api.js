import axios from "axios";

const Api = axios.create({
  baseURL: "https://api.disneyapi.dev",
});

// export const fetchAllCharacters = async (num) => {
//   const result = await Api.get(`/characters?page=${num}`);
//   return result;
// };

// export const fetchSearchedCharacter = async (str) => {
//   const result = await Api.get(`/character?name=${str}`);
//   return result;
// };

export const fetchAllCharacters = async (num) => {
  const result = Api.get(`/characters?page=${num}`);
  return (await result).data.data;
};
