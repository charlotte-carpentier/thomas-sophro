document.addEventListener("DOMContentLoaded", function () {
    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("fileInput");
  
    // Gestion du drag & drop
    dropZone.addEventListener("dragover", (event) => {
      event.preventDefault();
      dropZone.classList.add("border-gray-700", "bg-gray-100");
    });
  
    dropZone.addEventListener("dragleave", () => {
      dropZone.classList.remove("border-gray-700", "bg-gray-100");
    });
  
    dropZone.addEventListener("drop", (event) => {
      event.preventDefault();
      dropZone.classList.remove("border-gray-700", "bg-gray-100");
  
      if (event.dataTransfer.files.length) {
        fileInput.files = event.dataTransfer.files;
        console.log("File dropped:", fileInput.files[0].name);
      }
    });
  
    // Clique sur le bouton "Browse files"
    fileInput.addEventListener("change", () => {
      if (fileInput.files.length) {
        console.log("File selected:", fileInput.files[0].name);
      }
    });
  });
  