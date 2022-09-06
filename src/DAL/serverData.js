export const postReq = async (route, data) => {
  let val;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  };

  const req = await fetch(route, requestOptions);
  const ans = await req.json();
  const status = ans.statusCode;
  if (status === 200) val = true;
  else val = false;

  return val;
};
