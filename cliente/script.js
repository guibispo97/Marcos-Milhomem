
(() => {
  document.querySelectorAll('[data-asset]').forEach(img => {
    const key = img.dataset.asset;
    if (window.MM_ASSETS && window.MM_ASSETS[key]) img.src = window.MM_ASSETS[key];
  });

  const CONFIG = {
    whatsapp: '556381351169',
    message: 'Olá, Marcos! Vi o guia do meu novo apartamento e gostaria de conversar sobre o meu.',
    referralSuffix: ' (recebi o material por: {corretor})'
  };

  const params = new URLSearchParams(window.location.search);
  const raw = (params.get('c') || params.get('corretor') || '').slice(0, 60);
  const corretor = raw.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim();

  if (corretor) {
    const referral = document.getElementById('referral');
    const name = document.getElementById('referralName');
    name.textContent = corretor;
    referral.hidden = false;
  }

  let message = CONFIG.message;
  if (corretor) message += CONFIG.referralSuffix.replace('{corretor}', corretor);
  const whatsappUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;

  document.querySelectorAll('.js-whatsapp').forEach(link => {
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener';
  });

  const floating = document.getElementById('floatingCta');
  const hero = document.querySelector('.hero');
  const contact = document.getElementById('contato');

  const updateFloating = () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    const contactTop = contact.getBoundingClientRect().top;
    const shouldShow = heroBottom < window.innerHeight * 0.38 && contactTop > window.innerHeight * 0.72;
    floating.classList.toggle('is-visible', shouldShow);
  };

  window.addEventListener('scroll', updateFloating, { passive: true });
  window.addEventListener('resize', updateFloating);
  updateFloating();

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }
})();
