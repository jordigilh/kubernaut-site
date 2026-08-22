const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Nav gets a hairline border once the page scrolls past the hero. */
const nav = document.querySelector('nav');
const syncNavSurface = () => nav?.classList.toggle('scrolled', window.scrollY > 24);
syncNavSurface();
addEventListener('scroll', syncNavSurface, { passive: true });

/* Scroll-reveal: fade/rise each .reveal-item into place once it enters the
   viewport. Skipped entirely under reduced-motion, where CSS already shows
   everything at rest. */
if (!REDUCED && 'IntersectionObserver' in window) {
  const items = document.querySelectorAll('.reveal-item');
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );
  items.forEach((item, index) => {
    item.style.transitionDelay = `${(index % 4) * 70}ms`;
    observer.observe(item);
  });
} else {
  document.querySelectorAll('.reveal-item').forEach((item) => item.classList.add('in'));
}

/* Incident showcase: click a tab to swap the active panel. */
const showcaseTabs = document.querySelectorAll('.showcase-tab');
showcaseTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetId = tab.dataset.target;
    showcaseTabs.forEach((t) => {
      t.classList.toggle('is-active', t === tab);
      t.setAttribute('aria-selected', String(t === tab));
    });
    document.querySelectorAll('.showcase-panel').forEach((panel) => {
      panel.classList.toggle('is-active', panel.id === targetId);
    });
  });
});
