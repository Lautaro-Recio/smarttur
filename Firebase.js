// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app); // Función para agregar un nuevo elemento a la base de datos Firestore

export const createElement = async (name, text, price, archive) => {
  const images = [];
  try {
    await Promise.all(
      archive.map(async (img) => {
        const storageRef = ref(storage, img.name);
        await uploadBytes(storageRef, img);
        // getDownloadURL retorna la URL que utilizará la imagen en el almacenamiento para visualizarse
        const url = await getDownloadURL(storageRef);
        images.push(url);
      })
    );
    const storageRef = ref(storage, archive[0].name);
    await uploadBytes(storageRef, archive[0]);
    const myRef = doc(db, "experiencias", name);
    await setDoc(myRef, { name, text, price, images, offer: false});
  } catch (error) {
    console.error("Error al subir imágenes:", error);
    // Aquí puedes manejar el error de acuerdo a tus necesidades, como mostrar un mensaje al usuario o realizar alguna acción específica.
  }
};


export async function readElements() {
  try {
    // Obtener todos los documentos de la colección "experiencias"
    const querySnapshot = await getDocs(collection(db, "experiencias"));
    // Mapear los documentos a un array de objetos con la propiedad "id" y los datos del documento
    const elementos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // Devolver el array de elementos
    return elementos;
  } catch (error) {
    // Manejar el error en caso de que ocurra
    console.error("Error al obtener elementos:", error);
    // Devolver un array vacío en caso de error
    return [];
  }
}