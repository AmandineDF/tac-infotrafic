import alertes from './alertes.json';

function displayAlerts(data) {
  const container = document.getElementById('alerts-container');
  if (!container) return;

  if (!data || data.length === 0) {
    container.innerHTML = "<p>Aucune perturbation en cours.</p>";
    return;
  }

  container.innerHTML = "";
  data.forEach(alert => {
    const card = document.createElement('div');
    card.className = 'alert-card';
    card.innerHTML = `
      <h3>📢 ${alert.title}</h3>
      <p>${alert.description}</p>
    `;
    container.appendChild(card);
  });
}

// Affichage immédiat des alertes
displayAlerts(alertes);