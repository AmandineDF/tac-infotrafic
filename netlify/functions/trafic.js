const fetch = require('node-fetch');
const GtfsRealtimeBindings = require('gtfs-rt-bindings');

exports.handler = async function(event, context) {
  try {
    // 1. Récupération du flux binaire officiel
    const response = await fetch("https://transport.data.gouv.fr/resources/73680");
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();

    // 2. Décodage du format Protobuf vers un objet JavaScript
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));

    // 3. Renvoi en JSON propre
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(feed),
    };
  } catch (error) {
    console.error("Erreur de décodage GTFS-RT:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};