import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyAsdY2YHQDAVJ9ZJgsqNVB2kaB3A5jVmNY",
  authDomain: "fibbage-b1e4d.firebaseapp.com",
  databaseURL: "https://fibbage-b1e4d.firebaseio.com",
  projectId: "fibbage-b1e4d",
  storageBucket: "fibbage-b1e4d.appspot.com",
};

class Firebase {
    constructor() {
        firebase.initializeApp(config);
        this.db = firebase.database();
    }

    database = () => {
      return this.db;
    }
}
  
export default Firebase;