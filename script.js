const menu = document.getElementById('calculatorList');
const menuToggleBtn = document.getElementById('menuToggleBtn');
const installBtn = document.getElementById('installBtn');

// Toggle menu visibility
menuToggleBtn.addEventListener('click', () => {
  menu.classList.toggle('menu-closed');
});

// List of calculators
const calculators = [
  {
    title: "⚡ DC Cable Size Calculator",
    desc: "Calculate copper cable cross-section for DC systems",
    file: "dc-cable.html"
  },
  {
    title: "⚡ Energy Consumption Calculator",
    desc: "Calculate daily/monthly/yearly energy in kWh",
    file: "energy-units.html"
  }
];

// Create menu cards
calculators.forEach(calc => {
  const card = document.createElement('div');
  card.className = 'calculator-card';
  card.innerHTML = `<h3>${calc.title}</h3><p>${calc.desc}</p>`;
  card.onclick = () => loadCalculator(calc.file);
  menu.appendChild(card);
});

// Load calculator dynamically
function loadCalculator(file) {
  fetch('calculators/' + file)
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById('calculatorContainer');
      container.innerHTML = html;

      // Execute scripts inside loaded calculator
      const scripts = container.querySelectorAll('script');
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        if (oldScript.src) newScript.src = oldScript.src;
        else newScript.textContent = oldScript.textContent;
        document.body.appendChild(newScript);
        oldScript.remove();
      });

      // Close menu
      menu.classList.add('menu-closed');
    });
}

// PWA install
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'inline';
});
installBtn.addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => deferredPrompt = null);
  }
});
