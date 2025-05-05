document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.block, .hero__content');
  const hero = document.querySelector('.hero__content');
  
  // Show first block after hero immediately
  if (hero) {
    const firstBlock = hero.nextElementSibling;
    if (firstBlock && firstBlock.classList.contains('block')) {
      firstBlock.classList.add('is-visible');
      // Also make the text visible immediately
      const blockText = firstBlock.querySelector('.block__text');
      if (blockText) {
        blockText.style.opacity = '1';
        blockText.style.transition = 'none';
      }
    }
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  blocks.forEach(block => {
    observer.observe(block);
  });
}); 