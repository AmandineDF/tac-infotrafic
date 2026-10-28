import alertes from './alertes.json';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('alerts-container');
  if (!container) return;

  if (!alertes || alertes.length === 0) {
    container.innerHTML = "<p>Aucune perturbation en cours.</p>";
    return;
  }

  container.innerHTML = "";
  alertes.forEach(alert => {
    const card = document.createElement('div');
    card.className = 'alert-card';
    card.innerHTML = `
      <h3>📢 ${alert.title}</h3>
      <p>${alert.description}</p>
    `;
    container.appendChild(card);
  });
});