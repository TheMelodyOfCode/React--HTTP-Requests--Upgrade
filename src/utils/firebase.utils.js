// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { 
    getFirestore, 
    doc,
    getDoc, 
    // setDoc,
    // updateDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDw056JXtFOBaaUdZ3yxhzP0t7mPAqV5Dw",
    authDomain: "http-requests-241f1.firebaseapp.com",
    projectId: "http-requests-241f1",
    storageBucket: "http-requests-241f1.appspot.com",
    messagingSenderId: "1075673573965",
  appId: "1:1075673573965:web:265035cb5b27f481b80a04"
};

// Initialize Firebase
initializeApp(firebaseConfig);

/* This singleton instanciates Firestore and directly points to the 
DB inside in our console on the website */
export const db = getFirestore();


// ### GET  single documents from DB !! ###
// #############################
       
export const getSingleDocfromDB = async ( cardName) =>{
    const docRef = doc(db, 'tradingcards', cardName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return docSnap.data()
    } else {
      // doc.data() will be undefined in this case
      const error = {error: 'error', status: 'rejected', message: `No Trading-Card with the name "${cardName}"` }
      // const error = {error: 'error', status: 'rejected', message: new Error(`No Trading-Card with the name "${cardName}"`) }
      // const error = 'error'
      // const error = new Error(`No Trading-Card with the name "${cardName}"`)
      return error
    }
}


// ### GET all FILES from DB !! ###
// #############################

export const getCardItemsfromDB = async ()=>{
  const collectionRef = collection(db, 'tradingcards');
  const q = query(collectionRef);
  
  const querySnapshot = await getDocs(q);
  
  const cardItemsMap = querySnapshot.docs.reduce((acc, docSnapshot) =>{
    const  items = docSnapshot.data();
    // console.log(items)
    return items;
  }, {});

  return cardItemsMap;
}


// ### UPLOAD FILES TO DB !! ###
// #############################

export const addCollectionAndDocuments = async (collectionKey, documentsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
      documentsToAdd.forEach((object)=>{
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object );
    });
    await batch.commit();
    console.log('done uploading the documents baby!');
  }

// ### put hook in jsx file and import file to upload 
// just let it run once and out-comment again 
// you can also directly upload from the firestore website if you want
    // import NAME_OF_FILE_TO_UPLOAD from '../FILE_LOCATION';
    // impport method
    // useEffect(()=> {
    //     addCollectionAndDocuments('COLLECTION_NAME', NAME_OF_FILE_TO_UPLOAD)
    // }, []);