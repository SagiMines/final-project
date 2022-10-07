import Cookies from 'js-cookie';

export const patchReq = async (route, data) => {
  let val;
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined,
    credentials: 'include',
  };

  const req = await fetch(`http://localhost:8000/api/${route}`, requestOptions);
  const ans = await req.json();
  const status = ans.statusCode;
  if (status === 200) val = true;
  else val = false;

  return val;
};

export const deleteReq = async route => {
  let val;
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  const req = await fetch(`http://localhost:8000/api/${route}`, requestOptions);
  const ans = await req.json();
  const status = ans.statusCode;
  if (status === 200) val = true;
  else val = false;

  return val;
};

export const postReq = async (route, data) => {
  let val;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  };

  const req = await fetch(`http://localhost:8000/api/${route}`, requestOptions);
  const ans = await req.json();
  console.log(ans);
  const status = ans.statusCode;
  if (status === 200) val = true;
  else val = false;

  return val;
};

export const getReq = async route => {
  const req = await fetch(`http://localhost:8000/api/${route}`);
  const ans = await req.json();
  // console.log(ans);
  return ans;
};

export const getUserIdFromCookie = async () => {
  try {
    const cookieValue = encodeURIComponent(Cookies.get('user_id'));
    const userId = await getReq(`login/${cookieValue}`);
    return userId;
  } catch {
    return false;
  }
};

export const isConnected = async () => {
  if (Cookies.get('user_id')) {
    const userId = await getUserIdFromCookie();
    return userId ? true : false;
  }
  return false;
};

export const convertJsDatePatternToMysqlPattern = () => {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
};
