fetch('./alertes.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('alerts-container'); // Assurez-vous d'avoir cet élément dans votre HTML
    if (!container) return;

    if (data.length === 0) {
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