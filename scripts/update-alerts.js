const fs = require('fs');
const path = require('path');

async function updateAlerts() {
  try {
    console.log("Téléchargement du flux brut...");
    const response = await fetch("https://proxy.transport.data.gouv.fr/resource/annemasse-tp2a-gtfs-rt-alerts");
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    // On récupère le contenu brut et on le transforme en texte lisible
    const textData = await response.text();

    // On structure un JSON propre pour votre front-end
    const payload = {
      source: "TAC Mobilités",
      rawPayload: textData,
      timestamp: new Date().toISOString(),
      entity: [] // Si le flux contient du texte brut, on pourra l'adapter
    };

    const filePath = path.join(process.cwd(), 'alertes.json');
    fs.writeFileSync(filePath, JSON.stringify(payload, null, 2));
    console.log("Fichier alertes.json mis à jour avec succès !");
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    process.exit(1);
  }
}

updateAlerts();