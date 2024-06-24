// Función para formatear la fecha
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}

// Función para añadir comida
function addComida(nombre, calorias) {
  db.collection("comidas").add({
    nombre: nombre,
    calorias: calorias,
    gusto: false,
    disgusto: false,
    fecha: formatDate(new Date())
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    getComidas();  // Actualizar lista de comidas
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
}

// Función para obtener y mostrar comidas
function getComidas() {
  db.collection("comidas").get().then((querySnapshot) => {
    const comidasContainer = document.getElementById("comidasContainer");
    comidasContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const comida = doc.data();
      const comidaDiv = document.createElement("div");
      comidaDiv.className = "comida list-group-item d-flex justify-content-between align-items-center";
      comidaDiv.innerHTML = `
        <div class="details">
          <span>${comida.nombre} ${comida.calorias} cal</span>
          <small class="d-block text-muted">${comida.fecha}</small>
        </div>
        <div class="actions">
          <button class="btn btn-success mr-2" onclick="marcarGusto('${doc.id}', true)">${comida.gusto ? '<i class="fas fa-thumbs-up"></i>' : '<i class="far fa-thumbs-up"></i>'}</button>
          <button class="btn btn-warning mr-2" onclick="marcarGusto('${doc.id}', false)">${comida.disgusto ? '<i class="fas fa-thumbs-down"></i>' : '<i class="far fa-thumbs-down"></i>'}</button>
          <button class="btn btn-danger" onclick="deleteComida('${doc.id}')"><i class="fas fa-trash-alt"></i></button>
        </div>
      `;
      comidasContainer.appendChild(comidaDiv);
    });
  });
}

// Función para eliminar comida
function deleteComida(id) {
  db.collection("comidas").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
    getComidas();  // Actualizar lista de comidas
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
}

// Función para marcar como gustada o no gustada
function marcarGusto(id, gusto) {
  const update = gusto ? { gusto: true, disgusto: false } : { gusto: false, disgusto: true };
  db.collection("comidas").doc(id).update(update)
  .then(() => {
    console.log("Document successfully updated!");
    getComidas();  // Actualizar lista de comidas
  })
  .catch((error) => {
    console.error("Error updating document: ", error);
  });
}

// Función para eliminar todas las comidas
function deleteAllComidas() {
  db.collection("comidas").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      db.collection("comidas").doc(doc.id).delete();
    });
    getComidas();  // Actualizar lista de comidas
  }).catch((error) => {
    console.error("Error removing documents: ", error);
  });
}

// Manejar el envío del formulario
document.getElementById("comidaForm").addEventListener("submit", function(event) {
  event.preventDefault();
  let nombre = document.getElementById("nombre").value;
  let calorias = document.getElementById("calorias").value;
  if(nombre && calorias) {
    addComida(nombre, calorias);
  } else {
    alert("Todos los campos son obligatorios.");
  }
});

// Manejar el botón de eliminar todas las comidas
document.getElementById("deleteAll").addEventListener("click", function() {
  if (confirm("¿Estás seguro de que quieres eliminar todas las comidas?")) {
    deleteAllComidas();
  }
});

// Obtener y mostrar comidas al cargar la página
window.onload = getComidas;
