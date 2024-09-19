document.addEventListener('DOMContentLoaded', function() {
  const ctaButtons = document.querySelectorAll('.cta-button');
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const courseName = this.parentElement.querySelector('h3').textContent;
      alert(`Great choice! You're about to start the "${courseName}" course. Get ready to level up your coding skills!`);
      window.location.href = this.href;
    });
  });

  const features = document.querySelectorAll('.feature');
  features.forEach(feature => {
    feature.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.transition = 'transform 0.3s ease';
    });
    feature.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // Simulating a daily streak counter
  const streakCount = localStorage.getItem('streakCount') || 0;
  const lastVisit = localStorage.getItem('lastVisit');
  const today = new Date().toDateString();

  if (lastVisit !== today) {
    localStorage.setItem('streakCount', Number(streakCount) + 1);
    localStorage.setItem('lastVisit', today);
  }

  const newStreak = localStorage.getItem('streakCount');
  if (newStreak > 0) {
    const streakMessage = document.createElement('div');
    streakMessage.textContent = `🔥 ${newStreak} day streak! Keep it up!`;
    streakMessage.style.position = 'fixed';
    streakMessage.style.top = '10px';
    streakMessage.style.right = '10px';
    streakMessage.style.background = 'var(--primary-color)';
    streakMessage.style.color = 'white';
    streakMessage.style.padding = '10px';
    streakMessage.style.borderRadius = '5px';
    document.body.appendChild(streakMessage);

    setTimeout(() => {
      streakMessage.style.display = 'none';
    }, 5000);
  }
});
