const GtfsRealtimeBindings = require('gtfs-rt-bindings');

exports.handler = async function(event, context) {
  try {
    const response = await fetch("https://transport.data.gouv.fr/resources/73680");
    
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Erreur HTTP externe: ${response.status}` })
      };
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Décodage du flux GTFS-RT
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
    console.error("Erreur critique:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};