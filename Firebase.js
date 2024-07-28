// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_APIKEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_RENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
}; // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app); // Función para agregar un nuevo elemento a la base de datos Firestore
export const auth = getAuth();
auth.useDeviceLanguage();
export const googleProvider = new GoogleAuthProvider();

export const createElement = async (
  name,
  text,
  price,
  imagesOfFirebase,
  archive,
  offer,
  offerDate,
  priceOff,
  category
) => {
  const images = imagesOfFirebase;
  if (offer == false) {
    offerDate = ""
    priceOff = 0
  }
  try {
    // Subir archivos a Firebase Storage y obtener URLs de descarga
    await Promise.all(
      archive.map(async (img) => {
        // Crear una referencia específica para cada archivo utilizando el nombre del archivo como un hijo de la referencia de almacenamiento
        const storageRef = ref(storage, name + "/" + img.name);
        await uploadBytes(storageRef, img);
        const url = await getDownloadURL(storageRef);
        const newImage = { nameOfImage: img.name, url };
        images.push(newImage);
      })
    );

    const myRef = doc(db, "experiencias", name);
    const docSnap = await getDoc(myRef);

    if (docSnap.exists()) {
      // El documento ya existe, así que lo actualizamos en lugar de sobrescribirlo
      await updateDoc(myRef, {
        text,
        price,
        images,
        offer,
        offerDate,
        priceOff,
        category,
      });
    } else {
      // El documento no existe, lo creamos
      await setDoc(myRef, {
        name,
        text,
        price,
        images,
        offer: false,
        offerDate: "",
        priceOff: 0,
        category,
      });
    }
  } catch (error) {
    console.error("Error al subir imágenes:", error);
    // Manejar el error de acuerdo a tus necesidades
  }
};

export async function deleteImages(name, images) {
  const myRef = doc(db, "experiencias", name);
  console.log(images);
  try {
    await updateDoc(myRef, {
      images,
    });
  } catch (error) {
    console.error("Error al eliminar imagen", error);
  }
}

export async function readElements() {
  try {
    // Obtener todos los documentos de la colección "experiencias"
    const querySnapshot = await getDocs(collection(db, "experiencias"));
    // Mapear los documentos a un array de objetos con la propiedad "id" y los datos del documento
    const elementos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // Devolver el array de elementos
    return elementos;
  } catch (error) {
    // Manejar el error en caso de que ocurra
    console.error("Error al obtener elementos:", error);
    // Devolver un array vacío en caso de error
    return [];
  }
}

export const deleteElement = async (elementId) => {
  try {
    const elementRef = doc(db, "experiencias", elementId); // Referencia al documento específico en la colección "experiencias"
    await deleteDoc(elementRef); // Eliminar el documento
    console.log(`Elemento con ID ${elementId} eliminado correctamente.`);
  } catch (error) {
    console.error("Error al intentar eliminar el elemento:", error);
    throw error; // Propagar el error para manejarlo en el componente que llama a esta función, si es necesario
  }
};
