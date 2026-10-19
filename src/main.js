// Fonction pour charger et afficher les alertes
async function fetchTrafficAlerts() {
  const container = document.getElementById("traffic-alerts");

  try {
    // Note : Pour un écran d'accueil, le plus simple et le plus stable 
    // est d'interroger un point d'accès propre ou de charger un JSON mis à jour.
    // (Exemple avec un tableau de données simulé ou une API directe si disponible)
    
    // Si vous utilisez un fichier JSON hébergé ou la structure dynamique :
    const trafficData = {
      "entity": [
        {
          "alert": {
            "descriptionText": { "translation": [{ "text": "Ligne 6 dir. Rte de Lucinges et 7 dir. Perrier-Aubrac : La montée et la dépose se fera à l'arrêt situé devant le Lycée. Jusqu'à nouvel avis." }] },
            "headerText": { "translation": [{ "text": "Arrêt Jean Monnet P+R déplacé." }] },
            "informedEntity": [{ "routeId": "6" }, { "routeId": "7" }]
          }
        },
        {
          "alert": {
            "descriptionText": { "translation": [{ "text": "Fuite de gaz – ligne 4, arrêt Pont d’Etrembières non desservi dans les deux sens jusqu’à nouvel avis." }] },
            "headerText": { "translation": [{ "text": "Fuite de gaz – Arrêt Pont d’Etrembières non desservi" }] },
            "informedEntity": [{ "routeId": "4" }]
          }
        }
      ]
    };

    container.innerHTML = "";

    if (!trafficData.entity || trafficData.entity.length === 0) {
      container.innerHTML = "<p>Aucune perturbation signalée pour le moment.</p>";
      return;
    }

    trafficData.entity.forEach(item => {
      const alert = item.alert;
      const title = alert.headerText?.translation[0]?.text || "Information trafic";
      const description = alert.descriptionText?.translation[0]?.text || "";
      const routes = alert.informedEntity ? alert.informedEntity.map(e => `Ligne ${e.routeId}`).join(", ") : "";

      const card = document.createElement("div");
      card.className = "alert-card";
      card.innerHTML = `
        <div><span class="line-badge">${routes}</span></div>
        <h3 style="margin: 8px 0 4px 0; font-size: 1.2em;">${title}</h3>
        <p style="margin: 0; color: #555; font-size: 1.1em;">${description}</p>
      `;
      container.appendChild(card);
    });

  } catch (error) {
    console.error("Erreur de mise à jour:", error);
  }
}

// 1. Charger les données dès l'ouverture de la page sur l'écran
document.addEventListener("DOMContentLoaded", () => {
  fetchTrafficAlerts();

  // 2. Relancer la fonction automatiquement toutes les 5 minutes (300 000 millisecondes)
  // pour que l'écran récupère les nouveautés sans avoir à le redémarrer
  setInterval(fetchTrafficAlerts, 5 * 60 * 1000);
});