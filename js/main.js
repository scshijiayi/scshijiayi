(function () {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.stagger').forEach(function (el) {
    observer.observe(el);
  });

  const activePath = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === activePath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  document.querySelectorAll('[data-count]').forEach(function (el) {
    const target = Number(el.getAttribute('data-count'));
    let current = 0;
    const step = Math.max(1, Math.round(target / 60));

    function update() {
      current += step;
      if (current >= target) {
        el.textContent = String(target);
        return;
      }
      el.textContent = String(current);
      requestAnimationFrame(update);
    }

    if ('IntersectionObserver' in window) {
      const countObserver = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              update();
              obs.disconnect();
            }
          });
        },
        { threshold: 0.5 }
      );
      countObserver.observe(el);
    } else {
      update();
    }
  });
})();
