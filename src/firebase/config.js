import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDbV-PECRWglfxoJe-IhenI18E41tE3ZgE',
  authDomain: 'saferide-385119.firebaseapp.com',
  databaseURL: 'https://saferide-385119-default-rtdb.firebaseio.com',
  projectId: 'saferide-385119',
  storageBucket: 'saferide-385119.appspot.com',
  messagingSenderId: '536564255793',
  appId: '1:536564255793:web:a40a0a17d61576be70d910',
  measurementId: 'G-2Q18SZL0M3',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const writeDataToFirestore = async (fullname, phone) => {
  try {
    const data = {
        name: fullname,
        phone: phone,
        requestedAt: serverTimestamp(),
    }

    const bookingsRef = await addDoc(collection(db, 'bookings'), data)

    return bookingsRef.id
  } catch (error) {
    return error
  }
}

export { writeDataToFirestore };