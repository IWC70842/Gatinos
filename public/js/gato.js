document.addEventListener("DOMContentLoaded", () => {
  // Seleccionamos todas las tarjetas de los gatos
  const gatoCards = document.querySelectorAll('.gato-card');

  // Añadimos un event listener a cada tarjeta
  gatoCards.forEach(card => {
    card.addEventListener('click', (event) => {
      // Obtenemos el ID del gato de los datos almacenados en el atributo data-id
      const gatoId = card.getAttribute('data-id');

      // Redirigimos a la página de detalles del gato
      window.location.href = `/gatos/${gatoId}`;
    });
  });
});