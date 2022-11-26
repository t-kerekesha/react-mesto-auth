import Popup from './Popup';

function InfoTooltip({ isOpen, onClose, isAuthSuccessful }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} popupClass="popup_type_form">
      <div className="popup__container">
        <div className="popup__content-info">
          <div className={`popup__icon-info
            ${isAuthSuccessful ?
              "popup__icon-info_type_success"
              :
              "popup__icon-info_type_error"
            }`} />
          <p className="popup__message">
            {isAuthSuccessful ?
              "Вы успешно зарегистрировались!"
              :
              "Что-то пошло не так! Попробуйте ещё раз."
            }
          </p>
        </div>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
