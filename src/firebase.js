import firebase from 'firebase/app';
import 'firebase/database';
import uuidv1 from 'uuid/v1';
import uuidv4 from 'uuid/v4';

const config = {
  apiKey: "AIzaSyAsdY2YHQDAVJ9ZJgsqNVB2kaB3A5jVmNY",
  authDomain: "fibbage-b1e4d.firebaseapp.com",
  databaseURL: "https://fibbage-b1e4d.firebaseio.com",
  projectId: "fibbage-b1e4d",
  storageBucket: "fibbage-b1e4d.appspot.com",
};

firebase.initializeApp(config);

export { uuidv1, uuidv4, firebase };
