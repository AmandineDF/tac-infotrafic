import fetch from 'node-fetch';
import GtfsRealtimeBindings from 'gtfs-rt-bindings';

export async function handler(event, context) {
  try {
    // 1. Récupération du flux binaire officiel
    const response = await fetch("https://transport.data.gouv.fr/resources/73680");
    const buffer = await response.arrayBuffer();

    // 2. Décodage du format Protobuf
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));

    // 3. Envoi du résultat au format JSON propre à votre page web
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(feed),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Impossible de décoder le flux trafic" }),
    };
  }
}