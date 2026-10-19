const fs = require('fs');
const GtfsRealtimeBindings = require('gtfs-rt-bindings');

async function updateAlerts() {
  try {
    const response = await fetch("https://transport.data.gouv.fr/resources/73680");
    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));
    
    // Enregistre le résultat décodé dans un fichier alertes.json à la racine
    fs.writeFileSync('alertes.json', JSON.stringify(feed, null, 2));
    console.log("Alertes TAC mises à jour avec succès !");
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    process.exit(1);
  }
}

updateAlerts();