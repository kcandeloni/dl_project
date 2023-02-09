import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOhZRxjruY8iK0PJhVqw_lBQ6I1huSFMw",
  authDomain: "drawngeon-legends.firebaseapp.com",
  projectId: "drawngeon-legends",
  storageBucket: "drawngeon-legends.appspot.com",
  messagingSenderId: "410942355988",
  appId: "1:410942355988:web:61cb60aada19ff48300501"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
