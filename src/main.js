import alertes from './alertes.json';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('traffic-alerts');
  if (!container) return;

  if (!alertes || alertes.length === 0) {
    container.innerHTML = `
      <div class="card active">
        <div class="disruptionTitle">Information Trafic</div>
        <div class="disruptionText"><p>Aucune perturbation en cours sur le réseau.</p></div>
      </div>
    `;
    return;
  }

  container.innerHTML = "";
  
  // Génération des cartes d'alertes à partir du JSON
  alertes.forEach((alert, index) => {
    const card = document.createElement('div');
    card.className = `card ${index === 0 ? 'active' : ''}`; // La première carte est active par défaut
    
    card.innerHTML = `
      <div class="info_disruption">
          <div class="effect">
              <div class="icon_container">
                  <img class="picto" src="/assets/img/alert.svg" alt="Icône">
              </div>
              <p>Information réseau</p>
          </div>
      </div>
      <div class="disruption_text">
          <div class="disruptionTitle">${alert.title}</div>
          <div class="disruptionText"><p>${alert.description}</p></div>
      </div>
    `;
    container.appendChild(card);
  });

  // Gestion du carrousel si plusieurs cartes existent
  const cards = container.querySelectorAll('.card');
  if (cards.length > 1) {
    let currentIndex = 0;
    setInterval(() => {
      cards[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % cards.length;
      cards[currentIndex].classList.add('active');
    }, 7000); // Change de carte toutes les 7 secondes
  }
});