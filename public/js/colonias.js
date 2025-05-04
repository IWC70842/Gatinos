/**
 * @author Jose Antonio Pozo Gonzalez
 * @email iwc70842@educastur.es
 * @version 1.0
 * @description  Funciones para eventos y acciones sobre "cartas" de Colonias
 */
document.addEventListener('DOMContentLoaded', function () {

  const cards = document.querySelectorAll('.colonia-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');

      if (id) {
        window.location.href = `/colonias/${id}`;
      }
    });
  });

  // Manejo de eliminación de colonia (desde detalleColonia.hbs)
  const formEliminar = document.getElementById('formEliminarColonia');

  if (formEliminar) {
    formEliminar.addEventListener('submit', async (e) => {
      e.preventDefault();

      const confirmacion = confirm('¡¡¡AVISO!!!\n\nSe eliminarán tambien todos los gatos asociados a la colonia.\nSeran eliminados de la base de datos la colonia y sus gatos (borrado fisico).\n\n¿Estás seguro de que deseas eliminar esta colonia?');

      if (confirmacion) {
        const coloniaId = formEliminar.dataset.id;

        try {
          const response = await fetch(`/colonias/${coloniaId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error('No se pudo eliminar la colonia');
          }

          alert('Colonia eliminada correctamente.');
          window.location.href = '/colonias';
        } catch (error) {
          console.error('Error al eliminar la colonia:', error);
          alert('Hubo un error al eliminar la colonia.');
        }
      }
    });
  }
});

