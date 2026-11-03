export function initCarousel(containerSelector, intervalTime = 8000) {
  const container = document.getElementById(containerSelector);
  if (!container) return;

  const cards = container.querySelectorAll('.card');
  if (cards.length <= 1) return;

  let currentIndex = 0;

  setInterval(() => {
    cards[currentIndex].classList.remove('card--active');
    
    currentIndex = (currentIndex + 1) % cards.length;
    
    cards[currentIndex].classList.add('card--active');
  }, intervalTime);
}