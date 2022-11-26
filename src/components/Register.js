import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

function Register({ isLoggedIn, onRegister}) {
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
    onRegister(userData);
  }

  if(isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <main className="sign">
      <form className="sign__form"
        onSubmit={handleSubmit}>
        <h1 className="sign__title">Регистрация</h1>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          className="sign__input"
          required />
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Пароль"
          className="sign__input"
          required />
        <button type="submit"
          className="sign__button submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="sign__signup">
        Уже зарегистрированы?&nbsp;
        <Link to="/signin"
          className="link">
          Войти
        </Link>
      </p>
    </main>
  );
}

export default Register;
