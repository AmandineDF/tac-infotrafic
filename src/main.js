import alertesUrl from '../src/alertes.json' assert { type: 'json' };

fetch(alertesUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
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
  })
  .catch(error => console.error('Erreur chargement alertes :', error));