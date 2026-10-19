async function fetchTrafficAlerts() {
  const container = document.getElementById("traffic-alerts");

  try {
    const response = await fetch('/.netlify/functions/trafic');
    if (!response.ok) throw new Error("Erreur réseau");
    
    const data = await response.json();
    container.innerHTML = "";

    // Création d'une carte d'information propre qui indique l'heure de dernière actualisation en direct
    const card = document.createElement("div");
    card.className = "alert-card info";
    card.innerHTML = `
      <div><span class="line-badge">TAC Mobilités</span></div>
      <h3 style="margin: 8px 0 4px 0; font-size: 1.2em;">Flux en direct actif</h3>
      <p style="margin: 0; color: #555; font-size: 1.1em;">
        Dernière actualisation automatique : ${new Date(data.timestamp).toLocaleTimeString()}
      </p>
    `;
    container.appendChild(card);

  } catch (error) {
    console.error("Erreur:", error);
    if (container.children.length === 0) {
      container.innerHTML = "<p>Erreur lors du chargement des alertes en direct.</p>";
    }
  }
}

// 1. Charger au démarrage
document.addEventListener("DOMContentLoaded", () => {
  fetchTrafficAlerts();

  // 2. Relancer la récupération automatiquement toutes les 2 minutes (120 000 ms) 
  // pour que l'écran d'accueil s'actualise tout seul en arrière-plan
  setInterval(fetchTrafficAlerts, 2 * 60 * 1000);
});