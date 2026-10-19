const GtfsRealtimeBindings = require('gtfs-rt-bindings');

exports.handler = async function(event, context) {
  try {
    // fetch est natif dans Node.js sur Netlify, pas besoin de require('node-fetch')
    const response = await fetch("https://transport.data.gouv.fr/resources/73680");
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Décodage du format binaire Protobuf du GTFS-RT
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(buffer);

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