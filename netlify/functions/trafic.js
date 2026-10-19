// netlify/functions/trafic.js
import fetch from 'node-fetch';

export async function handler(event, context) {
  try {
    // Note: Pour un vrai décodage Protobuf complet en production, on utilise généralement un paquet spécifique, 
    // mais pour l'instant, on peut rediriger ou simuler l'appel vers un point de proxy ou traiter le JSON brut si disponible.
    // Ici, on met en place la structure de la fonction serverless.
    
    const response = await fetch("https://transport.data.gouv.fr/resources/73680");
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