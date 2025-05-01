document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM completamente cargado");

  const cards = document.querySelectorAll('.colonia-card');
  console.log(`Encontradas ${cards.length} tarjetas`);

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      console.log("Clic detectado en la tarjeta con id:", id);

      if (id) {
        window.location.href = `/colonias/${id}`;
      }
    });
  });
});