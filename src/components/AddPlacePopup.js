import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    resetForm();
  }, [props.isOpen])

  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeLink(event) {
    setLink(event.target.value);
  }

  function resetForm() {
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm
        title="Новое место"
        name="add-image"
        classContainer="popup__container_type_two-input"
        buttonText={props.onLoading ? "Сохранение..." : "Создать"}
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        onResetValidators={props.onResetValidators}
        onResetForm={resetForm}
      >
        <div className="form__item">
          <input id="title-input"
            type="text"
            value={name || ""}
            onChange={handleChangeName}
            name="title"
            className="form__input"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required/>
          <span className="title-input-error form__input-error"></span>
        </div>
        <div className="form__item">
          <input id="link-input"
            type="url"
            value={link || ""}
            onChange={handleChangeLink}
            name="link"
            className="form__input"
            placeholder="Ссылка на картинку"
            required/>
          <span className="link-input-error form__input-error"></span>
        </div>
      </PopupWithForm>
  );
}

export default AddPlacePopup;
