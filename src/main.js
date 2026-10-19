// On intègre directement les données dynamiques du flux GTFS-RT
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
    },
    {
      "alert": {
        "descriptionText": { "translation": [{ "text": "L5-L6 : arrêt Collège La Géline non desservi. Report à l'arrêt Chemin des Teppes jusqu'à nouvel ordre. Horaires : bit.ly/3vsl1Zo" }] },
        "headerText": { "translation": [{ "text": "L5-L6 : arrêt Collège La Géline non desservi" }] },
        "informedEntity": [{ "routeId": "6" }, { "routeId": "5" }]
      }
    },
    {
      "alert": {
        "descriptionText": { "translation": [{ "text": "Travaux - Ligne T2, arrêt Gaillard Mairie non desservi dans les deux sens de circulation jusqu'à nouvel avis. Arrêt de report : Feux-Follets." }] },
        "headerText": { "translation": [{ "text": "Travaux sur la ligne T2 - Arrêt Gaillard Mairie non desservi" }] },
        "informedEntity": [{ "routeId": "T2" }]
      }
    },
    {
      "alert": {
        "descriptionText": { "translation": [{ "text": "Déviation Ligne 5 Arrêt Baron de Buttet non desservi du 22/10/26 au 23/10/16. Arrêt de report : La Paix" }] },
        "headerText": { "translation": [{ "text": "Déviation Ligne 5  – Arrêt non desservi" }] },
        "informedEntity": [{ "routeId": "5" }]
      }
    },
    {
      "alert": {
        "descriptionText": { "translation": [{ "text": "Déviation Ligne 8 Arrêts Olympe de Gouges (report: Martinière) et Fraternité (report: Campus de l'Étoile) non desservis du 22/10 au 23/10 jusqu'au soir." }] },
        "headerText": { "translation": [{ "text": "Déviation Ligne 8  – Dir. Vétraz-M. Arrêts non desservis" }] },
        "informedEntity": [{ "routeId": "8" }]
      }
    }
  ]
};

function renderAlerts() {
  const container = document.getElementById("traffic-alerts");
  container.innerHTML = "";

  if (!trafficData.entity || trafficData.entity.length === 0) {
    container.innerHTML = "<p>Aucune perturbation signalée pour le moment.</p>";
    return;
  }

  trafficData.entity.forEach(item => {
    const alert = item.alert;
    const title = alert.headerText?.translation[0]?.text || "Information trafic";
    const description = alert.descriptionText?.translation[0]?.text || "";
    
    // Récupération des lignes concernées (ex: Ligne 6, 7...)
    const routes = alert.informedEntity ? alert.informedEntity.map(e => `Ligne ${e.routeId}`).join(", ") : "";

    const card = document.createElement("div");
    card.className = "alert-card";
    card.innerHTML = `
      <div><span class="line-badge">${routes}</span></div>
      <h3 style="margin: 8px 0 4px 0; font-size: 1.1em;">${title}</h3>
      <p style="margin: 0; color: #555;">${description}</p>
    `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderAlerts);