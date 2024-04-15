document.addEventListener('DOMContentLoaded', (event) => {
  let index = 0;
  const images = document.querySelectorAll('.carousel-image');

  setInterval(() => {
    images[index].style.display = 'none';
    index = (index + 1) % images.length;
    images[index].style.display = 'block';
  }, 3000);
});