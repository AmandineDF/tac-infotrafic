export function initCarousel(containerSelector, intervalTime = 8000) {
  const container = document.getElementById(containerSelector);
  if (!container) return;

  const cards = container.querySelectorAll('.card');
  if (cards.length <= 1) return;

  let currentIndex = 0;

  setInterval(() => {
    // Retire la classe active de la carte courante
    cards[currentIndex].classList.remove('card--active');
    
    // Passe à l'index suivant
    currentIndex = (currentIndex + 1) % cards.length;
    
    // Active la nouvelle carte (ce qui déclenche la cascade)
    cards[currentIndex].classList.add('card--active');
  }, intervalTime);
}