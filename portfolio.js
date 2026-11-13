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

// Keep each desktop column stable while a case is expanded.
const caseList = document.querySelector('.cases');
const wideCases = window.matchMedia('(min-width: 761px)');
function arrangeCases() {
  if (!caseList) return;
  for (const card of cards) caseList.append(card);
  for (const column of caseList.querySelectorAll('.case-column')) column.remove();
  caseList.classList.toggle('stable-columns', wideCases.matches);
  if (!wideCases.matches) return;
  const columns = [document.createElement('div'), document.createElement('div')];
  for (const column of columns) { column.className = 'case-column'; caseList.append(column); }
  const heights = [0, 0];
  for (const card of cards) {
    const index = heights[0] <= heights[1] ? 0 : 1;
    columns[index].append(card);
    if (!card.hidden) heights[index] += card.getBoundingClientRect().height + 20;
  }
}
wideCases.addEventListener('change', arrangeCases);
filterBar?.addEventListener('click', event => {
  if (event.target.closest('button[data-filter]')) arrangeCases();
});
window.addEventListener('load', arrangeCases, { once: true });
