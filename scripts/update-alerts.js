const fs = require('fs');
const path = require('path');

async function updateAlerts() {
  try {
    console.log("Récupération des alertes JSON depuis data.gouv.fr...");
    
    // Endpoint de pré-visualisation JSON utilisé par data.gouv.fr
    const response = await fetch("https://transport.data.gouv.fr/resources/73680/validation_details");
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    
    // On extrait la structure payload/JSON décodée par le serveur
    const jsonContent = data.payload || data;

    const filePath = path.join(process.cwd(), 'alertes.json');
    fs.writeFileSync(filePath, JSON.stringify(jsonContent, null, 2));
    console.log("Fichier alertes.json mis à jour avec le JSON complet !");
  } catch (error) {
    console.error("Erreur lors de la récupération du JSON:", error);
    process.exit(1);
  }
}

updateAlerts();