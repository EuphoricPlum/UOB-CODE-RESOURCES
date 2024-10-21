<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  // File Upload Form Submission
  document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const module = document.getElementById('module').value;
    const file = document.getElementById('file').files[0];

    if (file) {
      // Reference to the file in Firebase Storage
      const fileRef = ref(storage, `${module}/${file.name}`);

      try {
        // Upload the file
        await uploadBytes(fileRef, file);
        alert('File uploaded successfully!');
        document.getElementById('upload-form').reset();
        listFiles(module); // Call the function to list files for the module
      } catch (error) {
        console.error('Error uploading file: ', error);
      }
    }
  });

  // List Files for a Module
  function listFiles(module) {
    const listRef = ref(storage, module);

    listAll(listRef)
      .then((res) => {
        const fileList = document.getElementById('file-list');
        fileList.innerHTML = `<h2>Files for Module: ${module}</h2>`;
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            const a = document.createElement('a');
            a.href = url;
            a.textContent = itemRef.name;
            a.target = '_blank';
            fileList.appendChild(a);
          });
        });
      })
      .catch((error) => {
        console.error('Error listing files: ', error);
      });
  }

  // Optionally, list files when the page loads
  // listFiles('DefaultModule');
</script>
