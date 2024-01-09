// public/star-rating.js
document.addEventListener('DOMContentLoaded', () => {
    const starRatingContainer = document.getElementById('starRating');
    const hiddenRatingInput = document.getElementById('rating');
  
    // Initialize star rating
    const maxStars = 5;
    for (let i = 1; i <= maxStars; i++) {
      const star = document.createElement('span');
      star.innerHTML = '★';
      star.addEventListener('click', () => handleStarClick(i));
      starRatingContainer.appendChild(star);
    }
  
    function handleStarClick(selectedRating) {
      // Update hidden input value
      hiddenRatingInput.value = selectedRating;
  
      // Highlight selected stars
      const stars = starRatingContainer.querySelectorAll('span');
      stars.forEach((star, index) => {
        if (index < selectedRating) {
          star.style.color = 'gold';
        } else {
          star.style.color = 'black';
        }
      });
    }
  });
  