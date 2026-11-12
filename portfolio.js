const filterBar = document.querySelector('.filters');
const cards = [...document.querySelectorAll('[data-topics]')];
const status = document.querySelector('#filter-status');

if (filterBar && cards.length && status) {
  filterBar.hidden = false;
  const filters = [...filterBar.querySelectorAll('button')];
  for (const button of filters) {
    button.addEventListener('click', () => {
      const topic = button.dataset.filter;
      for (const item of filters) item.setAttribute('aria-pressed', String(item === button));
      for (const card of cards) {
        card.hidden = topic !== 'all' && !card.dataset.topics.split(' ').includes(topic);
      }
      const count = cards.filter(card => !card.hidden).length;
      status.textContent = count === 1 ? 'Showing 1 case note.' : `Showing ${count} case notes.`;
    });
  }
}
