import alertes from '../alertes.json';
import { effectTranslate, lineColors } from './config.js';
import { formatTimestamp } from './utils.js';
import { initCarousel } from './carousel.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('traffic-alerts');
  if (!container) return;

  if (!alertes || alertes.length === 0) {
    container.innerHTML = `
      <div class="card card--active">
        <h2 class="card__title">Information Trafic</h2>
        <div class="card__description"><p>Aucune perturbation en cours sur le réseau.</p></div>
      </div>
    `;
    return;
  }

  container.innerHTML = "";

  alertes.forEach((alert, index) => {
    const card = document.createElement('div');
    card.className = `card ${index === 0 ? 'card--active' : ''}`;

    const effectKey = alert.effect || "OTHER_EFFECT";
    const effectText = effectTranslate[effectKey] || "Information réseau";

    let datesHtml = "";
    if (alert.active_periods && alert.active_periods.length > 0) {
      const period = alert.active_periods[0];
      const startFormatted = formatTimestamp(period.start);
      const endFormatted = formatTimestamp(period.end);

      if (startFormatted && endFormatted) {
        datesHtml = `
          <div class="card__dates">
              <div class="card__icon">📅</div>
              <div class="card__date-text">Du ${startFormatted} au ${endFormatted}</div>
          </div>
        `;
      } else if (startFormatted) {
        datesHtml = `
          <div class="card__dates">
              <div class="card__icon">📅</div>
              <div class="card__date-text">À partir du ${startFormatted}</div>
          </div>
        `;
      } else if (endFormatted) {
        datesHtml = `
          <div class="card__dates">
              <div class="card__icon">📅</div>
              <div class="card__date-text">Jusqu'au ${endFormatted}</div>
          </div>
        `;
      }
    }

    let routesHtml = "";
    if (alert.routes && alert.routes.length > 0) {
      const badges = alert.routes.map(r => {
        const bgLineColor = lineColors[r] || lineColors.DEFAULT;
        const textLineColor = (r === "T2") ? "#000000" : "#ffffff";
        return `<div class="card__line-badge" style="background-color: ${bgLineColor}; color: ${textLineColor};">${r}</div>`;
      }).join('');
      routesHtml = `<div class="card__lines">${badges}</div>`;
    }

    card.innerHTML = `
        <div class="card__header">
            <div class="card__effect" style="background-color: var(--bg-main);">
                <div class="card__icon">⚠️</div>
                <p class="card__effect-text">${effectText}</p>
            </div>
            ${routesHtml}
        </div>
        ${datesHtml}
        <div class="card__body">
            <div class="card__title">${alert.title}</div>
            <div class="card__description"><p>${alert.description}</p></div>
        </div>
    `;
    container.appendChild(card);
  });

  // Lancement du carrousel
  initCarousel('traffic-alerts', 7000);
});