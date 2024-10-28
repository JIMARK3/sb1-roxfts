// Animation utility function
const animateElement = (element, keyframes, options) => {
  return element.animate(keyframes, options).finished;
};

// Game tile click handler with animations
document.querySelectorAll('.game-tile').forEach(tile => {
  // Add hover effect
  tile.addEventListener('mouseenter', () => {
    const img = tile.querySelector('img');
    const title = tile.querySelector('h2');
    
    animateElement(img, [
      { transform: 'scale(1)' },
      { transform: 'scale(1.05)' }
    ], {
      duration: 300,
      fill: 'forwards',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });
    
    animateElement(title, [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-2px)' }
    ], {
      duration: 300,
      fill: 'forwards'
    });
  });

  // Remove hover effect
  tile.addEventListener('mouseleave', () => {
    const img = tile.querySelector('img');
    const title = tile.querySelector('h2');
    
    animateElement(img, [
      { transform: 'scale(1.05)' },
      { transform: 'scale(1)' }
    ], {
      duration: 300,
      fill: 'forwards'
    });
    
    animateElement(title, [
      { transform: 'translateY(-2px)' },
      { transform: 'translateY(0)' }
    ], {
      duration: 300,
      fill: 'forwards'
    });
  });

  // Click handler with transition effect
  tile.addEventListener('click', async () => {
    const game = tile.dataset.game;
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.top = '50%';
    ripple.style.left = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    tile.appendChild(ripple);

    // Animate ripple
    await animateElement(ripple, [
      { width: '0', height: '0', opacity: 1 },
      { width: '300px', height: '300px', opacity: 0 }
    ], {
      duration: 600,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });

    ripple.remove();

    // Add game navigation logic here
    console.log(`Starting ${game}...`);
    // Example navigation (uncomment when games are implemented):
    // window.location.href = `/${game}/index.html`;
  });
});

// Add subtle parallax effect to game tiles
document.addEventListener('mousemove', (e) => {
  const tiles = document.querySelectorAll('.game-tile');
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  tiles.forEach(tile => {
    const rect = tile.getBoundingClientRect();
    const tileX = rect.left + rect.width / 2;
    const tileY = rect.top + rect.height / 2;

    const deltaX = (mouseX - tileX) / 30;
    const deltaY = (mouseY - tileY) / 30;

    tile.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg)`;
  });
});

// Reset tile rotation when mouse leaves the window
document.addEventListener('mouseleave', () => {
  const tiles = document.querySelectorAll('.game-tile');
  tiles.forEach(tile => {
    tile.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
});