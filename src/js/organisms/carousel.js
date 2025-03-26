document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector("[data-carousel]");
  const items = [...carousel.querySelectorAll("[data-carousel-item]")];
  let index = 0;

  // Ajouter la transition à tous les éléments du carrousel
  items.forEach(item => {
    item.classList.add("transition-opacity", "duration-700");
  });

  function showSlide(newIndex) {
    items[index].classList.remove("opacity-100");
    items[index].classList.add("opacity-0");
    index = (newIndex + items.length) % items.length;
    items[index].classList.remove("opacity-0");
    items[index].classList.add("opacity-100");
  }

  document.querySelector("[data-carousel-prev]").addEventListener("click", () => showSlide(index - 1));
  document.querySelector("[data-carousel-next]").addEventListener("click", () => showSlide(index + 1));

  setInterval(() => showSlide(index + 1), 10000); // Auto-slide toutes les 7s
});