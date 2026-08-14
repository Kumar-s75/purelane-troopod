(() => {
  const initialize = () => {
    const stage = document.querySelector('[data-purelane-scenes]');
    if (!stage || stage.dataset.initialized === 'true') return;

    stage.dataset.initialized = 'true';
    const scenes = [...stage.querySelectorAll('.purelane-scenes__scene')];
    const selectScene = () => {
      const focus = window.scrollY + window.innerHeight * 0.5;
      let depth = 1;

      document.querySelectorAll('[data-purelane-scene]').forEach((section) => {
        if (section.getBoundingClientRect().top + window.scrollY <= focus) {
          depth = Number(section.dataset.purelaneScene) || depth;
        }
      });

      stage.dataset.depth = String(depth);
      scenes.forEach((scene, index) => scene.classList.toggle('is-active', index + 1 === depth));
    };

    let rafId;
    const requestUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = undefined;
        selectScene();
      });
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    document.addEventListener('shopify:section:load', requestUpdate);
    document.addEventListener('shopify:section:reorder', requestUpdate);
    selectScene();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
