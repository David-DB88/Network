import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidbarReducer from "./sidbar-reducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, massage: "This is my frirst post", likeCounts: "20" },
        { id: 2, massage: "Hi everyone", likeCounts: "15" },
        { id: 3, massage: "it's fine" }
      ],
      textTexteria: "Good jobsssss"
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: "Dimich" },
        { id: 2, name: "Andrey" },
        { id: 3, name: "Sveta" },
        { id: 4, name: "Sasha" },
        { id: 5, name: "Viktor" },
        { id: 6, name: "Valeria" }
      ],
      massages: [
        { id: 1, massage: "hi" },
        { id: 2, massage: "How is your day" },
        { id: 3, massage: "it's fine" },
        { id: 4, massage: "yo" },
        { id: 5, massage: "yo" },
        { id: 6, massage: "yo" }
      ],
      newMassageBody: ""
    },
    sidebar: {}
  },
  _callSubscriber() {
    // console.log("State changed");
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  // addPost() {},
  // newTex(some) {},
  dispatch(action) {
    debugger;
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidbarReducer(this._state.sidebar, action);

    this._callSubscriber(this._state);
  }
};

export default store;
window.store = store;
