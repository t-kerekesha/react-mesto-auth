import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup(props) {
  function handleSubmit(event) {
    event.preventDefault();
    props.onConfirmDelete(props.card);
  }

  return (
    <PopupWithForm
        title="Вы уверены?"
        name="confirm-delete"
        classContainer="popup__container_type_confirmation"
        buttonText="Да"
        isOpen={props.card != null ? true : false}
        onClose={props.onClose}
        onSubmit={handleSubmit} />
  );
}

export default ConfirmDeletePopup;
