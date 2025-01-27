import { collection, addDoc ,getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { db } from "./firebaseconfig.js";
const divel = document.querySelector("#container")
const form = document.querySelector('#form');
const title = document.querySelector('#title');
const description = document.querySelector('#description');


form.addEventListener('submit', async (event) => {
  event.preventDefault()
  console.log(title.value);
  console.log(description.value);

  try {
    const docRef = await addDoc(collection(db, "todos"), {
      title: title.value,
      description: description.value
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }


})

 async function getdatafromfirestore (){
  const arr = []
const querySnapshot = await getDocs(collection(db , "todos"))
querySnapshot.forEach((doc) => {
    arr.push(doc.data())
   
});
console.log(arr)
for(let i =0 ; i<arr.length ; i++){
divel.innerHTML +=` <div ><p>${arr[i].title}</p>
                      <p>${arr[i].description}</p>
   </div>

    `              
}


}

getdatafromfirestore()











