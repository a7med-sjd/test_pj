function refreshPage() {
    location.reload();
  }
function captureAndDownload() {
    // Sélectionnez l'élément que vous souhaitez capturer
    const elementToCapture = document.body;
  
    // Masquer le modèle (ajoutez l'ID ou la classe de votre modèle)
    const modeleElement = document.getElementById('myModal'); // Remplacez 'votreModeleId' par l'ID de votre modèle
    if (modeleElement) {
      modeleElement.style.display = 'none';
    }
  
    // Utilisez html2canvas pour capturer l'élément
    html2canvas(elementToCapture).then(function(canvas) {
      // Afficher à nouveau le modèle après la capture
      if (modeleElement) {
        modeleElement.style.display = 'block';
      }
  
      // Convertissez le canvas en une image data URL
      const dataURL = canvas.toDataURL();
  
      // Créez un objet Blob à partir de l'URL des données
      const blob = dataURItoBlob(dataURL);
  
      // Utilisez FileSaver.js pour télécharger le Blob en tant que fichier PNG
      saveAs(blob, 'capture.png');
    });
  }
  
  // Fonction pour convertir les données de l'URL en Blob
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
  