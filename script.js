// Load calculators from JSON and create cards
fetch('calculators.json')
  .then(res => res.json())
  .then(calculators => {
    const list = document.getElementById('calculatorList');
    calculators.forEach(calc => {
      const card = document.createElement('div');
      card.className = 'calculator-card';
      card.innerHTML = `<h3>${calc.title}</h3><p>${calc.desc}</p>`;
      card.onclick = () => loadCalculator(calc.file);
      list.appendChild(card);
    });
  });

// Load calculator HTML dynamically and execute embedded scripts
function loadCalculator(file) {
  fetch('calculators/' + file)
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById('calculatorContainer');
      container.innerHTML = html;

      // Execute embedded <script> tags
      const scripts = container.getElementsByTagName('script');
      for (let s of scripts) {
        eval(s.innerHTML);
      }
    });
}

// PWA install button
const installBtn = document.getElementById('installBtn');
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
