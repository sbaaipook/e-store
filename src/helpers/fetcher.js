
const BASE_URL = 'https://fakestoreapi.com'
export const fetcher = async (url) =>{
  const response = await fetch(BASE_URL + url)
  const data = await response.json()
  return data;
}
