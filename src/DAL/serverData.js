import Cookies from 'js-cookie';

export const patchReq = async (route, data) => {
  let val;
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined,
    credentials: 'include',
    withCredentials: true,
  };

  const req = await fetch(
    process.env.NODE_ENV === 'production'
      ? `https://workshop-s.herokuapp.com/api/${route}`
      : `http://localhost:8000/api/${route}`,
    requestOptions
  );
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
    withCredentials: true,
  };
  const req = await fetch(
    process.env.NODE_ENV === 'production'
      ? `https://workshop-s.herokuapp.com/api/${route}`
      : `http://localhost:8000/api/${route}`,
    requestOptions
  );
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
    withCredentials: true,
  };

  const req = await fetch(
    process.env.NODE_ENV === 'production'
      ? `https://workshop-s.herokuapp.com/api/${route}`
      : `http://localhost:8000/api/${route}`,
    requestOptions
  );
  const ans = await req.json();
  const status = ans.statusCode;
  if (status === 200) val = true;
  else val = false;

  return val;
};

export const getReq = async route => {
  const req = await fetch(
    process.env.NODE_ENV === 'production'
      ? `https://workshop-s.herokuapp.com/api/${route}`
      : `http://localhost:8000/api/${route}`,
    {
      credentials: 'include',
      withCredentials: true,
    }
  );
  try {
    const ans = await req.json();
    return ans;
  } catch {
    return undefined;
  }
};

export const getUserIdFromCookie = async () => {
  console.log('in cookie function');
  console.log(Cookies.get('user_id', { domain: 'workshop-s.herokuapp.com' }));
  console.log(Cookies.get('user_id'));
  if (Cookies.get('user_id')) {
    console.log('in cookie if');
    try {
      console.log('in cookie try');
      const cookieValue = encodeURIComponent(Cookies.get('user_id'));
      console.log(Cookies.get('user_id'));
      console.log(cookieValue);
      const userId = await getReq(`login/${cookieValue}`);
      return userId;
    } catch {
      console.log('in cookie catch');
      return false;
    }
  } else {
    console.log('in cookie else');
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
