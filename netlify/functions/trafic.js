exports.handler = async function(event, context) {
  try {
    const response = await fetch("https://transport.data.gouv.fr/resources/73680");
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    // Récupération du contenu du flux
    const buffer = await response.arrayBuffer();
    
    // Convertir le buffer en une chaîne de texte lisible pour extraire ce qui nous intéresse
    const decoder = new TextDecoder('utf-8');
    const textData = decoder.decode(buffer);

    // On renvoie un objet JSON propre contenant les données brutes lues à la source
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ 
        source: "data.gouv.fr",
        rawText: textData,
        timestamp: new Date().toISOString()
      }),
    };
  } catch (error) {
    console.error("Erreur:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};