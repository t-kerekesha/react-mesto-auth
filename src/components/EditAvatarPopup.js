import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen])

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
        title="Обновить аватар"
        name="edit-avatar"
        classContainer="popup__container_type_one-input"
        buttonText={props.onLoading ? "Сохранение..." : "Сохранить"}
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        onResetValidators={props.onResetValidators}
      >
        <div className="form__item">
          <input id="avatar-input"
            type="url"
            ref={avatarRef}
            name="avatar"
            className="form__input"
            placeholder="Ссылка на аватар"
            required/>
          <span className="avatar-input-error form__input-error"></span>
        </div>
      </PopupWithForm>
  );
}

export default EditAvatarPopup;
