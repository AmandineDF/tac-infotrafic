const fs = require('fs');
const path = require('path');
const GtfsRealtimeBindings = require('gtfs-rt-bindings');

async function updateAlerts() {
  try {
    console.log("Téléchargement du flux GTFS-RT...");
    const response = await fetch("https://transport.data.gouv.fr/resources/73680");
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log("Décodage du flux GTFS-RT...");
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(buffer);

    // Si le flux est vide ou ne contient pas d'entités, on garde un message propre
    if (!feed.entity || feed.entity.length === 0) {
      console.log("Aucune alerte active trouvée dans le flux, génération d'un message vide.");
    }

    const filePath = path.join(process.cwd(), 'alertes.json');
    fs.writeFileSync(filePath, JSON.stringify(feed, null, 2));
    console.log("Fichier alertes.json mis à jour avec succès avec les vraies données !");
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    process.exit(1);
  }
}

updateAlerts();