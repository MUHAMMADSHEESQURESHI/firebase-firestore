import { collection, addDoc, getDocs, Timestamp, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { db } from "./firebaseconfig.js";

const divel = document.querySelector("#container");
const form = document.querySelector('#form');
const title = document.querySelector('#title');
const description = document.querySelector('#description');

// Function to get data from Firestore and display it
async function getdatafromfirestore() {
  const querySnapshot = await getDocs(collection(db, "todos"));
  divel.innerHTML = ""; // Clear container before appending new data

  querySnapshot.forEach((docSnapshot) => {
    const data = docSnapshot.data();
    const docId = docSnapshot.id; // Get document ID

    divel.innerHTML += `
      <div class="todotask" data-id="${docId}">
        <p>${data.title}</p>
        <p>${data.description}</p>
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
      </div>
    `;
  });
}

// Add new document to Firestore
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const docRef = await addDoc(collection(db, "todos"), {
      title: title.value,
      description: description.value,
      postDate: Timestamp.fromDate(new Date())
      
    });

    console.log("Document written with ID: ", docRef.id);
    getdatafromfirestore(); // Refresh the list after adding
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

// Event delegation for delete and edit buttons
divel.addEventListener("click", async (event) => {
  const target = event.target;
  const taskDiv = target.closest(".todotask");
  const docId = taskDiv?.getAttribute("data-id");

  if (!docId) return;

  // Delete functionality
  if (target.classList.contains("deleteBtn")) {
    try {
      await deleteDoc(doc(db, "todos", docId));
      console.log("Document deleted:", docId);
      getdatafromfirestore(); // Refresh the list
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  // Edit functionality
  if (target.classList.contains("editBtn")) {
    const newTitle = prompt("Enter new title:", taskDiv.children[0].textContent);
    const newDesc = prompt("Enter new description:", taskDiv.children[1].textContent);

    if (newTitle && newDesc) {
      try {
        await updateDoc(doc(db, "todos", docId), {
          title: newTitle,
          description: newDesc
        });

        console.log("Document updated:", docId);
        getdatafromfirestore(); // Refresh the list
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    }
  }
});

// Load Firestore data on page load
getdatafromfirestore();


console.log("todo crud app")