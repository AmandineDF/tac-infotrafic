import alertes from './alertes.json';

// Dictionnaire pour traduire les effets en français
const effectTranslate = {
    STOP_MOVED: "Arrêt déplacé",
    DETOUR: "Ligne déviée",
    DIVERSION: "Ligne déviée",
    SIGNIFICANT_DELAYS: "Retards significatifs",
    REDUCED_SERVICE: "Service réduit",
    NO_SERVICE: "Aucun service",
    ADDITIONAL_SERVICE: "Service additionnel",
    OTHER_EFFECT: "Information importante"
};

// Couleurs associées selon l'effet
const effectColors = {
    SIGNIFICANT_DELAYS: "#bb2124", // Rouge alerte
    NO_SERVICE: "#bb2124",
    DIVERSION: "#ff9300",          // Orange attention
    DETOUR: "#ff9300",
    STOP_MOVED: "#ff9300",
    DEFAULT: "#005894"             // Bleu info
};

// Fonction pour formater les timestamps UNIX renvoyés par Python
function formatTimestamp(timestamp) {
    if (!timestamp) return "";
    const date = new Date(timestamp * 1000);
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${dayName} ${day} ${month} à ${hours}h${minutes}`;
}

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

  alertes.forEach((alert, index) => {
    const card = document.createElement('div');
    card.className = `card ${index === 0 ? 'active' : ''}`;

    // Gestion de l'effet et de la couleur
    const effectKey = alert.effect || "OTHER_EFFECT";
    const effectText = effectTranslate[effectKey] || "Information réseau";
    const effectColor = effectColors[effectKey] || effectColors.DEFAULT;

    // Gestion des dates de début / fin si présentes
    let datesHtml = "";
    if (alert.active_periods && alert.active_periods.length > 0) {
      const period = alert.active_periods[0];
      const startFormatted = formatTimestamp(period.start);
      const endFormatted = formatTimestamp(period.end);
      if (startFormatted || endFormatted) {
        datesHtml = `
          <div class="dates">
              <div class="icon_container" style="background-color: ${effectColor};">
                  <span style="color:white; font-size: 14pt;">📅</span>
              </div>
              <div class="date">Du ${startFormatted || 'N/C'} au ${endFormatted || 'N/C'}</div>
          </div>
        `;
      }
    }

    // Gestion des lignes impactées (badges de lignes)
    let routesHtml = "";
    if (alert.routes && alert.routes.length > 0) {
      const badges = alert.routes.map(r => `<div class="line" style="background-color: #222; color: #fff; padding: 4px 10px; border-radius: 4px; display:inline-block; margin-right:5px;">Ligne ${r}</div>`).join('');
      routesHtml = `
        <div class="lines-container" style="margin-bottom: 16px;">
            ${badges}
        </div>
      `;
    }

    card.innerHTML = `
        <div class="info_disruption">
            <div class="effect" style="background-color: ${effectColor}1a;">
                <div class="icon_container" style="background-color: ${effectColor};">
                    <span style="color:white; font-weight:bold;">⚠️</span>
                </div>
                <p style="color: ${effectColor};">${effectText}</p>
            </div>
            ${datesHtml}
        </div>
        ${routesHtml}
        <div class="disruption_text">
            <div class="disruptionTitle">${alert.title}</div>
            <div class="disruptionText"><p>${alert.description}</p></div>
        </div>
    `;
    container.appendChild(card);
  });

  // Système de carrousel (rotation automatique des cartes)
  const cards = container.querySelectorAll('.card');
  if (cards.length > 1) {
    let currentIndex = 0;
    setInterval(() => {
      cards[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % cards.length;
      cards[currentIndex].classList.add('active');
    }, 7000); // Change toutes les 7 secondes
  }
});