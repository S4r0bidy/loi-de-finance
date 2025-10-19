/* script.js - navigation section par section avec boutons + IntersectionObserver */
document.addEventListener('DOMContentLoaded', () => {
  const sections = Array.from(document.querySelectorAll('.section'));
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const brand = document.querySelector('.brand');

  let currentIndex = 0;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Helper : navigue à l'index donné
  function goTo(index) {
    index = Math.max(0, Math.min(index, sections.length - 1));
    const behavior = reduceMotion ? 'auto' : 'smooth';
    sections[index].scrollIntoView({ behavior });
    // on met à jour l'état (sera corrigé aussi par l'observer)
    updateControls(index);
  }

  // Update visuel (boutons disabled, nav active)
  function updateControls(index) {
    currentIndex = index;
    prevBtn.disabled = (index === 0);
    nextBtn.disabled = (index === sections.length - 1);

    // nav links actif
    navLinks.forEach(a => a.classList.remove('active'));
    const match = navLinks.find(a => Number(a.dataset.index) === index);
    if (match) match.classList.add('active');
  }

  // Observer pour détecter quelle section est principalement visible
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.55 // 55% visible => section active
  };

  const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const idx = Number(entry.target.dataset.index);
    const content = entry.target.querySelector('.content');
    const video = entry.target.querySelector('.bg-video');

    if (entry.isIntersecting) {
      // Animation du texte
      if (content) content.classList.add('in-view');

      // Lecture de la vidéo si présente
      if (video) {
        video.play().catch(()=>{});
      }

      updateControls(idx);
    } else {
      // Pause la vidéo quand la section n’est pas visible
      if (video) {
        video.pause();
      }
    }
  });
}, observerOptions);


  // Observe toutes les sections
  sections.forEach(s => io.observe(s));

  // Event listeners boutons
  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  // Clic sur nav links => scroll vers section correspondante (smooth)
  navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = Number(a.dataset.index);
      goTo(idx);
    });
  });
  // Brand (logo) clique -> home
  if (brand) brand.addEventListener('click', (e) => { e.preventDefault(); goTo(0); });

  // Support clavier (flèches haut/bas, PageUp/PageDown)
  window.addEventListener('keydown', (e) => {
    if (['ArrowDown','PageDown',' '].includes(e.key)) {
      e.preventDefault();
      goTo(currentIndex + 1);
    } else if (['ArrowUp','PageUp'].includes(e.key)) {
      e.preventDefault();
      goTo(currentIndex - 1);
    }
  });

  // Au chargement, on force calcul de la section visible initiale
  // (utile si on ouvre la page sur un anchor)
  setTimeout(() => {
    // trouver la section la plus proche du milieu de l'écran
    const middle = window.innerHeight / 2 + window.scrollY;
    let bestIdx = 0;
    let bestDist = Infinity;
    sections.forEach((s, i) => {
      const r = s.getBoundingClientRect();
      const absTop = window.scrollY + r.top + r.height / 2;
      const d = Math.abs(absTop - middle);
      if (d < bestDist) { bestDist = d; bestIdx = i; }
    });
    updateControls(bestIdx);
    // déclenche l'animation de la section active
    sections[bestIdx].querySelector('.content')?.classList.add('in-view');
  }, 60);

  // Make all content visible by default
  document.querySelectorAll('.content').forEach(content => content.classList.add('in-view'));
  const homeH1 = document.querySelector('#home h1');
  if (homeH1) homeH1.classList.add('show');
  const aboutH2 = document.querySelector('#about h2');
  if (aboutH2) aboutH2.classList.add('show');
});

// ------------------------------------------------------------------------------------------------------------------------------
const indicateurs = {
  "PIB nominal (milliards d’Ariary)": [78945.4, 88851.6, 99826.3],
  "Taux de croissance économique": [4.4, 5.0, 5.2],
  "Indice des prix à la consommation (fin de période)": [8.2, 7.1, 7.2],
  "Ratio de dépenses publiques (% PIB)": [16.2, 18.4, 17.8],
  "Solde global (base caisse)": [-4.3, -4.1, -4.1],
  "Solde primaire (base caisse)": [214.2, 1097.6, 866.0],
  "Dollars/Ariary (moyenne)": [4508.6, 4688.8, 4853.2],
  "Euro/Ariary (moyenne)": [4905.5, 5275.2, 5532.7],
  "Investissement public (% PIB)": [6.1, 9.6, 8.3],
  "Investissement privé (% PIB)": [14.6, 12.0, 13.7],
  "Taux de pression fiscale (% PIB)": [10.6, 11.2, 11.8]
};

const ctx = document.getElementById('graphique').getContext('2d');
const labels = ['2024','2025','2026'];

// Fonction pour créer un graphique
function creerGraphique(type, indicateur) {
  return new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: indicateur,
        data: indicateurs[indicateur],
        backgroundColor: ['#60a5fa','#2563eb','#1e3a8a'],
        borderColor: '#1e3a8a',
        borderWidth: 1
      }]
    },
    options: {responsive: true, plugins:{legend:{display:type!=='bar'}}}
  });
}

let chart = creerGraphique('bar', 'PIB nominal (milliards d’Ariary)');

// Gestion du changement
document.getElementById('filtre').addEventListener('change', e=>{
  chart.destroy();
  chart = creerGraphique(document.getElementById('typeChart').value, e.target.value);
});

document.getElementById('typeChart').addEventListener('change', e=>{
  chart.destroy();
  chart = creerGraphique(e.target.value, document.getElementById('filtre').value);
});