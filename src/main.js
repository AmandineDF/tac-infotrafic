async function fetchTrafficAlerts() {
  const container = document.getElementById("traffic-alerts");
  container.innerHTML = "<p>Chargement des informations trafic en direct...</p>";

  try {
    const response = await fetch('/.netlify/functions/trafic');
    const trafficData = await response.json();

    container.innerHTML = "";

    if (!trafficData.entity || trafficData.entity.length === 0) {
      container.innerHTML = "<p>Aucune perturbation signalée sur le réseau.</p>";
      return;
    }

    trafficData.entity.forEach(item => {
      if (!item.alert) return;
      
      const alert = item.alert;
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
    container.innerHTML = "<p>Erreur lors du chargement des alertes en temps réel.</p>";
  }
}

// Charger au démarrage et recharger la page entière toutes les 5 min pour l'écran d'accueil
document.addEventListener("DOMContentLoaded", () => {
  fetchTrafficAlerts();

  setTimeout(() => {
    location.reload();
  }, 5 * 60 * 1000);
});