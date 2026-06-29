// Nav: toggle .scrolled via IntersectionObserver on a sentinel
// Avoids scroll event listeners on the main thread
const nav = document.getElementById('nav');
const sentinel = document.createElement('div');
sentinel.style.cssText = 'position:absolute;top:120px;height:1px;width:1px;pointer-events:none;';
document.body.insertAdjacentElement('afterbegin', sentinel);

new IntersectionObserver(([entry]) => {
  nav.classList.toggle('scrolled', !entry.isIntersecting);
}).observe(sentinel);

// Scroll reveal
const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Active nav link highlight
const navLinks = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  },
  { threshold: 0.45 }
);

document.querySelectorAll('section[id]').forEach(s => activeObserver.observe(s));
