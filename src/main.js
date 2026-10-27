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
    const pb = GtfsRealtimeBindings.transit_realtime || GtfsRealtimeBindings;
    const feed = pb.FeedMessage.decode(buffer);

    // Sécurité : si le flux est vide, on crée une structure avec une alerte d'information
    if (!feed.entity || feed.entity.length === 0) {
      feed.entity = [{
        alert: {
          headerText: { translation: [{ text: "Réseau TAC" }] },
          descriptionText: { translation: [{ text: "Aucune perturbation en cours. Trafic normal." }] },
          informedEntity: [{ routeId: "INFO" }]
        }
      }];
    }

    const filePath = path.join(process.cwd(), 'alertes.json');
    fs.writeFileSync(filePath, JSON.stringify(feed, null, 2));
    console.log("Fichier alertes.json mis à jour avec les vraies alertes décodées !");
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    process.exit(1);
  }
}

updateAlerts();