/* document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:4040/colonias");

    if (!response.ok) {
      throw new Error(`Error en la API:${response.status}`);
    }

    const data = await response.json();

    const templateResponse = await fetch("../../views/layouts/colonias.handlebars");
    const templateText = await templateResponse.text();

    const template = Handlebars.compile(templateText);
    const html = template({colonias: data});

    document.getElementById("colonias-container").innerHTML= html;

  } catch (error) {
    console.error("Error cargando las colonias: ",error);
    document.getElementById("colonias-container").innerHTML="<p>Error al cargar los datos.</p>";
  }
});
 */
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