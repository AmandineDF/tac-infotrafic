exports.handler = async function(event, context) {
  try {
    // Appel direct vers le service open data
    const response = await fetch("https://transport.data.gouv.fr/resources/73680");
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    // On récupère le texte brut du flux ou sa représentation
    const rawData = await response.text();

    // Pour éviter tout plantage de décodage binaire sur Netlify tout en gardant 
    // un pont direct vers le flux, on s'assure de renvoyer les données au format texte/json
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ raw: rawData, timestamp: Date.now() }),
    };
  } catch (error) {
    console.error("Erreur:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};