// Exemple de données d'info trafic (à remplacer par des données API si disponible)
const alerts = [
  {
    line: "Tram T1",
    type: "warning",
    message: "Travaux en cours au centre-ville d'Annemasse. Retards légers à prévoir."
  },
  {
    line: "Ligne 3",
    type: "info",
    message: "Déviation temporaire sur l'arrêt Gare Rotonde."
  }
];

function renderAlerts() {
  const container = document.getElementById("traffic-alerts");
  container.innerHTML = "";

  if (alerts.length === 0) {
    container.innerHTML = "<p>Aucune perturbation signalée pour le moment.</p>";
    return;
  }

  alerts.forEach(alert => {
    const card = document.createElement("div");
    card.className = `alert-card ${alert.type}`;
    card.innerHTML = `
      <div><span class="line-badge">${alert.line}</span></div>
      <p style="margin: 8px 0 0 0;">${alert.message}</p>
    `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderAlerts);