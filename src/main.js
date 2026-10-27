const JSON_URL = "https://raw.githubusercontent.com/AmandineDF/tac-infotrafic/main/alertes.json";

async function fetchTrafficAlerts() {
  const container = document.getElementById("traffic-alerts");

  try {
    const response = await fetch(`${JSON_URL}?t=${Date.now()}`);
    if (!response.ok) throw new Error("Erreur réseau");
    
    const trafficData = await response.json();
    container.innerHTML = "";

    if (!trafficData.entity || trafficData.entity.length === 0) {
      container.innerHTML = "<p>Aucune perturbation signalée sur le réseau.</p>";
      return;
    }

    trafficData.entity.forEach(item => {
      const alert = item.alert;
      if (!alert) return;

      const title = alert.headerText?.translation[0]?.text || "Information trafic";
      const description = alert.descriptionText?.translation[0]?.text || "";
      const routes = alert.informedEntity ? alert.informedEntity.map(e => `Ligne ${e.routeId}`).join(", ") : "Réseau TAC";

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
    console.error("Erreur:", error);
    if (container.children.length === 0) {
      container.innerHTML = "<p>Chargement des alertes en cours...</p>";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchTrafficAlerts();
  // Actualise l'affichage sur l'écran toutes les 2 minutes
  setInterval(fetchTrafficAlerts, 2 * 60 * 1000);
});