<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC14bs1fqaHSvHHRCxS6Uxv_UcNcyIgcdo",
    authDomain: "uobcodeandresources.firebaseapp.com",
    projectId: "uobcodeandresources",
    storageBucket: "uobcodeandresources.appspot.com",
    messagingSenderId: "1040877577565",
    appId: "1:1040877577565:web:b5482a3c6b712746eab4b4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Attendance Form Submission
  document.getElementById('attendance-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const code = document.getElementById('code').value;
    const module = document.getElementById('module').value;
    const type = document.getElementById('type').value;
    const date = new Date().toISOString().split('T')[0]; // Current date

    try {
      await addDoc(collection(db, 'attendance'), {
        code: code,
        module: module,
        type: type,
        date: date
      });
      alert('Attendance recorded successfully!');
      document.getElementById('attendance-form').reset();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  });
</script>
