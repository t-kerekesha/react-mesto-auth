import { useState } from 'react';
import { Redirect } from 'react-router-dom';

function Login({ isLoggedIn, onLogin}) {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  function handleChange(event) {
    const {name, value} = event.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(userData);
  }

  if(isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <main className="sign">
      <form className="sign__form"
        onSubmit={handleSubmit}>
        <h1 className="sign__title">Вход</h1>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          className="sign__input"
          required/>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Пароль"
          className="sign__input"
          required/>
        <button type="submit"
          className="sign__button submit">
          Войти
        </button>
      </form>
    </main>
  );
}

export default Login;
