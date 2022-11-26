export const BASE_URL = 'https://auth.nomoreparties.co';

export function register(email, password) {
  return fetch((BASE_URL + '/signup'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
  .then(checkResponse);
}

export function authorize(email, password) {
  return fetch((BASE_URL + '/signin'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then(checkResponse);
}

export function checkToken(token) {
  return fetch((BASE_URL + '/users/me'), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(checkResponse);
}

function checkResponse(response) {
  // console.log(response)
  if(response.ok) {
    return response.json();
  } else {
    console.log(response.json)
    console.log(response.json().error)
    return Promise.reject({ message: `Ошибка: ${response.statusText}` });
  }
}
