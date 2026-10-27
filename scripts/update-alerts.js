const fs = require('fs');
const path = require('path');
const GtfsRealtimeBindings = require('gtfs-rt-bindings');

async function updateAlerts() {
  try {
    console.log("Téléchargement du flux direct...");
    const response = await fetch("https://proxy.transport.data.gouv.fr/resource/annemasse-tp2a-gtfs-rt-alerts");
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log("Décodage du flux GTFS-RT...");
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(buffer);

    const filePath = path.join(process.cwd(), 'alertes.json');
    fs.writeFileSync(filePath, JSON.stringify(feed, null, 2));
    console.log("Fichier alertes.json mis à jour avec succès avec les vraies données !");
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    process.exit(1);
  }
}

updateAlerts();