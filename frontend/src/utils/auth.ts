export const getAuthToken = () => {
  const token: string = localStorage.getItem("token") || '';
  const tokenDuration: number = getTokenDuration();

  if (token === '') return null;

  if (tokenDuration < 0) {
    return "EXPIRED_TOKEN";
  }

  return token;
}

export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

export const tokenLoader = () => {
  return getAuthToken();
};

export const setExpirationDate = () => {
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 1);
  localStorage.setItem("expirationDate", expirationDate.toISOString())
}

export const getTokenDuration = () => {
  const localStorageExpirationDate: string = localStorage.getItem("expirationDate") || '';
  const expirationDate= new Date(localStorageExpirationDate);
  const now = new Date();

  const duration: number = expirationDate.getTime() - now.getTime();

  return duration;
}

