export const getFromDB = async table => {
  const data = await fetch(`http://localhost:8080/api/${table}`);
  const res = await data.json();
  return res;
};
