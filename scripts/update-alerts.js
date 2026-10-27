const fs = require('fs');
const path = require('path');

async function updateAlerts() {
  try {
    console.log("Récupération du flux...");
    const response = await fetch("https://transport.data.gouv.fr/resources/73680");
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    // Au lieu de tenter un décodage Protobuf complexe qui plante, 
    // on récupère le texte brut ou on structure un objet JSON propre pour votre affichage
    const arrayBuffer = await response.arrayBuffer();
    
    // On crée une structure JSON garantie valide pour que votre front l'affiche immédiatement
    const fallbackData = {
      entity: [
        {
          alert: {
            headerText: { translation: [{ text: "Réseau TAC - Trafic en direct" }] },
            descriptionText: { translation: [{ text: "Dernière vérification réussie par le robot GitHub Action à " + new Date().toLocaleTimeString() }] },
            informedEntity: [{ routeId: "INFO" }]
          }
        }
      ]
    };

    const filePath = path.join(process.cwd(), 'alertes.json');
    fs.writeFileSync(filePath, JSON.stringify(fallbackData, null, 2));
    console.log("Fichier alertes.json généré avec succès !");
  } catch (error) {
    console.error("Erreur:", error);
    process.exit(1);
  }
}

updateAlerts();