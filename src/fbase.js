  
// Firebase v9

// firebase.js 파일
import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY ,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN ,
    projectId: process.env.REACT_APP_PROJECT_ID ,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET ,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID ,
    appId: process.env.REACT_APP_APP_ID
};

// firebase 앱 초기화
const firebaseApp = initializeApp(firebaseConfig);
// const db = getDatabase(firebaseApp);

// export { db };
// Authentication 서비스 가져오기

export const authService = getAuth(firebaseApp);
export const dbService = getFirestore(firebaseApp);

  