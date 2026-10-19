import fetch from 'node-fetch';

export async function handler(event, context) {
  try {
    const response = await fetch("https://transport.data.gouv.fr/resources/73680");
    
    // Si le serveur renvoie du texte/json ou du binaire
    const data = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Impossible de récupérer les données trafic" }),
    };
  }
}