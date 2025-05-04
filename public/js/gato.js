/**
 * @author Jose Antonio Pozo Gonzalez
 * @email iwc70842@educastur.es
 * @version 1.0
 * @description  Funciones y eventos que gestionan acciones sobre "cartas" de Gatos
 */

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

  const btnEliminar = document.querySelector('.btn-eliminar-gato');

  if (btnEliminar) {
    btnEliminar.addEventListener('click', async () => {
      const id = btnEliminar.dataset.id;
      const coloniaId = btnEliminar.dataset.coloniaId;

      if (confirm("¿Estás seguro de que deseas eliminar este gato?")) {
        try {
          const response = await fetch(`/gatos/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
          });

          if (!response.ok) {
            throw new Error('Hubo un error al eliminar el gato');
          }

          alert('Gato eliminado exitosamente');
          window.location.href = `/colonias/${coloniaId}`;
        } catch (error) {
          console.error('Error eliminando el gato:', error);
          alert('Hubo un error al eliminar el gato.');
        }
      }
    });
  }
});

