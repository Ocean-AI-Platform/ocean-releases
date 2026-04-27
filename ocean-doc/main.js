// ── Sidebar toggle (mobile) ──
  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
  }

  function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('show');
  }

  // ── Active section highlighting ──
  const sections = document.querySelectorAll('h2[id]');
  const sidebarLinks = document.querySelectorAll('.sidebar a');

  const observerOptions = {
    root: null,
    rootMargin: '-100px 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        sidebarLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // ── Copy Button Logic ──
  document.querySelectorAll('pre').forEach(block => {
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      <span>${AppStrings.copyText}</span>
    `;

    block.style.position = 'relative';
    block.appendChild(button);

    button.addEventListener('click', async () => {
      const code = block.querySelector('code').innerText;
      try {
        await navigator.clipboard.writeText(code);
        button.classList.add('copied');
        button.querySelector('span').innerText = AppStrings.copiedText;
        button.querySelector('svg').innerHTML = '<polyline points="20 6 9 17 4 12"></polyline>';
        
        setTimeout(() => {
          button.classList.remove('copied');
          button.querySelector('span').innerText = AppStrings.copyText;
          button.querySelector('svg').innerHTML = '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    });
  });