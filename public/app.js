// public/app.js
document.addEventListener('DOMContentLoaded', () => {
  loadCompanies();

  document.getElementById('addReviewForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    const response = await fetch('/companies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    if (response.ok) {
      loadCompanies();
      resetStarRating();
    } else {
      console.error('Failed to add review');
    }
  });

  document.getElementById('searchForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const companyName = document.getElementById('searchCompanyName').value;
    const response = await fetch(`/companies/search?name=${companyName}`);
    const data = await response.json();

    // Display average rating
    document.getElementById('averageRating').innerHTML = `<p>Average Rating: ${getStarRating(data.averageRating[0].avgRating)}</p>`;

    // Display all reviews
    const reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = '';
    data.companyReviews.forEach(review => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${review.name}</strong>
        <p>Pros: ${review.pros}</p>
        <p>Cons: ${review.cons}</p>
        <p>Rating: ${getStarRating(review.rating)}</p>
      `;
      reviewsList.appendChild(listItem);
    });
  });
});

function getStarRating(rating) {
  const roundedRating = Math.round(rating); // Round the rating to the nearest integer
  const stars = '★'.repeat(roundedRating) + '☆'.repeat(5 - roundedRating);
  return `<span style="color: gold;">${stars}</span>`;
}

function resetStarRating() {
  const stars = document.getElementById('starRating').querySelectorAll('span');
  stars.forEach(star => {
    star.style.color = 'black';
  });
}

async function loadCompanies() {
  const response = await fetch('/companies');
  const data = await response.json();
  const companiesList = document.getElementById('companiesList');

  companiesList.innerHTML = ''; // Clear previous entries

  data.companies.forEach(company => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${company.name}</strong>
      <p>Pros: ${company.pros}</p>
      <p>Cons: ${company.cons}</p>
      <p>Rating: ${getStarRating(company.rating)}</p>
    `;
    companiesList.appendChild(listItem);
  });
}
