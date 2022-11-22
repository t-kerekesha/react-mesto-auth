import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
        title="Редактировать профиль"
        name="edit-profile"
        classContainer="popup__container_type_two-input"
        buttonText={props.onLoading ? "Сохранение..." : "Сохранить"}
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        onResetValidators={props.onResetValidators}
      >
        <div className="form__item">
          <input id="name-input"
            type="text"
            value={name || ""}
            onChange={handleChangeName}
            name="name"
            className="form__input"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required/>
          <span className="name-input-error form__input-error"></span>
        </div>
        <div className="form__item">
          <input id="about-input"
            type="text"
            value={description || ""}
            onChange={handleChangeDescription}
            name="about"
            className="form__input"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required/>
          <span className="about-input-error form__input-error"></span>
        </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
