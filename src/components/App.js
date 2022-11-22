import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import { enableValidation, formValidators } from '../utils/FormValidator';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import {
  validationParams
} from '../utils/constants';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [deletedCard, setDeletedCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load UserInfo
  useEffect(() => {
    setIsLoading(true);
    api.getUserInfo()
      .then((dataFromServer) => {
        setCurrentUser(dataFromServer);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // LoadCard
  useEffect(() => {
    setIsLoading(true);
    api.getInitialCards()
      .then((cardsFromServer) => {
        setCards(cardsFromServer);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    enableValidation(validationParams);
  }, []);

  // обновление данных пользователя
  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api.editUserInfo({ name, about })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }

  // обновление аватара
  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api.editUserAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }

  // добавление новой карточки
  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api.addNewCard({ name, link })
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => setIsLoading(false));
  }

  // лайк
  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => {
      return user._id === currentUser._id;
    });

    api.likeCard(card._id, !isLiked)
      .then((updatedCard) => {
        const newCards = cards.map((item) => {
          return item._id === card._id ? updatedCard : item;
        });
        setCards(newCards);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // удаление карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(
          cards.filter(item =>
            item._id !== card._id
          )
        );
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDeleteClick(card) {
    setDeletedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
  }

  function resetValidators(formName) {
    if(formValidators[formName]) {
      formValidators[formName].resetValidation();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <Header />
      <Main
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDeleteClick}
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onResetValidators={resetValidators}
        onLoading={isLoading} />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        onResetValidators={resetValidators}
        onLoading={isLoading} />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        onResetValidators={resetValidators}
        onLoading={isLoading} />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups} />

      <ConfirmDeletePopup
        card={deletedCard}
        onClose={closeAllPopups}
        onConfirmDelete={handleCardDelete} />

    </CurrentUserContext.Provider>
  );
}

export default App;
