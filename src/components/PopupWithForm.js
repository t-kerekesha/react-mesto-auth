import React, { useRef, useEffect } from "react";

function PopupWithForm(props) {
  const formRef = useRef();

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, []);

  useEffect(() => {
    if(props.isOpen) {
      setTimeout(() => {
        formRef.current.elements[0].focus();
      }, 200);
    }
    if(props.onResetValidators) {
      props.onResetValidators(props.name);
    }
  }, [props.isOpen]);

  function handleEscClose(event) {
    if (event.key === 'Escape') {
      props.onClose();
      formRef.current.reset();
    }
  }

  function close(event) {
    if (event.target.classList.contains('popup_opened') ||
        event.target.classList.contains('popup__close-button')) {
        props.onClose();
        formRef.current.reset();
      }
  }

  function handleSubmit(event) {
    props.onSubmit(event);
    formRef.current.reset();
  }

  function handleReset() {
    if (props.onResetForm) {
      props.onResetForm();
    }
  }

  return(
    <div className={`popup popup_type_form popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}
      role="dialog"
      aria-modal="true"
      tabIndex="-1"
      onMouseDown={close}>
      <button className="popup__close-button button"
        type="button"
        aria-label="Закрыть"
        onMouseDown={close}>
      </button>
      <form className={`popup__container ${props.classContainer} form`}
        onSubmit={handleSubmit}
        onReset={handleReset}
        name={props.name}
        ref={formRef}
        noValidate>
        <h2 className="form__title">
          {props.title}
        </h2>
        {props.children}
        <button type="submit"
          className="form__save-button">
            {props.buttonText}
        </button>
      </form>
    </div>
  );
}

export default PopupWithForm;
