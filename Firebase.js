// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";
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
  category,
  initOfferDate,
  currency,
  destacar
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
      const updateData = {
        text,
        price: price || 0,
        images,
        offer: Boolean(offer),
        offerDate: offerDate || "",
        priceOff: priceOff || 0,
        category: category || "",
        initOfferDate: initOfferDate || "",
        currency: currency || "ARS",
        destacar: Boolean(destacar)
      };
      
      // Eliminar campos undefined
      Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);
      
      await updateDoc(myRef, updateData);
    } else {
      await setDoc(myRef, {
        name,
        text,
        price,
        images,
        offer: false,
        offerDate: "",
        priceOff: 0,
        category,
        initOfferDate,
        currency,
        destacar
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

// Guarda el nombre de la imagen destacada en Firestore
export async function setFeaturedImage(experienceName, imageName) {
  try {
    const experienceRef = doc(db, "experiencias", experienceName);
    await updateDoc(experienceRef, { featuredImage: imageName });
    return true;
  } catch (error) {
    console.error("Error al establecer imagen destacada:", error);
    throw error;
  }
}

// Obtiene el nombre de la imagen destacada de Firestore
export async function getFeaturedImage(experienceName) {
  try {
    const experienceRef = doc(db, "experiencias", experienceName);
    const snap = await getDoc(experienceRef);
    if (snap.exists()) {
      return snap.data().featuredImage || null;
    }
    return null;
  } catch (error) {
    console.error("Error al obtener imagen destacada:", error);
    throw error;
  }
}

// Sube un archivo PDF a Firebase Storage y devuelve la URL de descarga
export async function uploadPdf(experienceName, file) {
  try {
    // Crear una referencia al archivo en el storage
    const storageRef = ref(storage, `tarifarios/${experienceName}/${file.name}`);
    
    // Subir el archivo
    const snapshot = await uploadBytes(storageRef, file);
    
    // Obtener la URL de descarga
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    // Actualizar el documento en Firestore con la URL del PDF
    const experienceRef = doc(db, "experiencias", experienceName);
    await updateDoc(experienceRef, {
      pdfUrl: downloadURL
    });
    
    return downloadURL;
  } catch (error) {
    console.error("Error al subir el PDF:", error);
    throw error;
  }
}

// Obtiene la URL de un PDF existente para una experiencia
export async function getPdfUrl(experienceName) {
  try {
    const docRef = doc(db, "experiencias", experienceName);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists() && docSnap.data().pdfUrl) {
      return docSnap.data().pdfUrl;
    }
    return null;
  } catch (error) {
    console.error("Error al obtener la URL del PDF:", error);
    throw error;
  }
}

// Elimina el PDF (tarifario) de Storage y limpia el campo en Firestore
export async function deletePdf(experienceName) {
  try {
    const docRef = doc(db, "experiencias", experienceName);
    const snap = await getDoc(docRef);
    const currentUrl = snap.exists() ? snap.data().pdfUrl : null;

    if (currentUrl) {
      // Crear referencia al archivo desde la URL de descarga y eliminarlo
      const fileRef = ref(storage, currentUrl);
      await deleteObject(fileRef);
    }

    // Remover el campo en Firestore
    await updateDoc(docRef, { pdfUrl: deleteField() });
    return true;
  } catch (error) {
    console.error("Error al eliminar el PDF:", error);
    throw error;
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
