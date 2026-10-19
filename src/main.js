async function fetchTrafficAlerts() {
  const container = document.getElementById("traffic-alerts");

  try {
    const response = await fetch('/.netlify/functions/trafic');
    if (!response.ok) throw new Error("Erreur réseau");
    
    const trafficData = await response.json();

    container.innerHTML = "";

    if (!trafficData.entity || trafficData.entity.length === 0) {
      container.innerHTML = "<p>Aucune perturbation signalée sur le réseau.</p>";
      return;
    }

    trafficData.entity.forEach(item => {
      if (!item.alert) return;
      
      const alert = item.alert;
      const title = alert.headerText?.translation?.[0]?.text || "Information trafic";
      const description = alert.descriptionText?.translation?.[0]?.text || "";
      const routes = alert.informedEntity ? alert.informedEntity.map(e => `Ligne ${e.routeId || ''}`).filter(Boolean).join(", ") : "Réseau TAC";

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
    // On n'efface pas l'écran si un rafraîchissement échoue temporairement, pour garder l'affichage stable
    if (container.children.length === 0) {
      container.innerHTML = "<p>Erreur lors du chargement des alertes en direct.</p>";
    }
  }
}

// 1. Charger au démarrage
document.addEventListener("DOMContentLoaded", () => {
  fetchTrafficAlerts();

  // 2. Relancer la récupération automatiquement toutes les 2 minutes (120 000 ms) 
  // sans recharger la page, pour un affichage fluide sur l'écran d'accueil
  setInterval(fetchTrafficAlerts, 2 * 60 * 1000);
});