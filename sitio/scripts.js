// Modo oscuro
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggle = document.getElementById("modo-btn");

  if (localStorage.getItem("modo") === "oscuro") {
    body.classList.add("dark");
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      body.classList.toggle("dark");
      localStorage.setItem("modo", body.classList.contains("dark") ? "oscuro" : "claro");
    });
  }

  iniciarCarrito();
  iniciarFormulario();
});


// Tienda

let carrito = [];

const precios = {
  1: 1000,
  2: 2000,
  3: 2500,
  4: 8500,
  5: 12000
};

const nombres = {
  1: "Cepillo de bambú",
  2: "Shampoo sólido",
  3: "Bolsa reutilizable",
  4: "Compostera mini",
  5: "Kit de siembra"
};

function agregarAlCarrito(id) {
  carrito.push({ id, nombre: nombres[id], precio: precios[id] });
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("carrito-lista");
  const total = document.getElementById("total");
  lista.innerHTML = "";
  let totalPrecio = 0;

  carrito.forEach((item, index) => {
    totalPrecio += item.precio;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio}
      <button onclick="eliminarProducto(${index})">✖</button>
    `;
    lista.appendChild(li);
  });

  total.textContent = `Total: $${totalPrecio}`;
  document.getElementById("contador-carrito").textContent = carrito.length;
}


function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("abrir-carrito")?.addEventListener("click", () => {
    document.getElementById("carrito-panel").style.display = "flex";
  });

  document.getElementById("cerrar-carrito")?.addEventListener("click", () => {
    document.getElementById("carrito-panel").style.display = "none";
  });

  document.getElementById("comprar-btn")?.addEventListener("click", () => {
    if (carrito.length === 0) return alert("Carrito vacío");
    alert("¡Gracias por tu compra!");
    carrito = [];
    actualizarCarrito();
  });
});


// Contacto

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contacto");
  const confirmacion = document.getElementById("mensaje-confirmacion");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const nombre = form.nombre.value.trim();
      const email = form.email.value.trim();
      const mensaje = form.mensaje.value.trim();

      if (!nombre || !email || !mensaje) {
        confirmacion.innerHTML = "<span style='color:red'>Por favor completá todos los campos.</span>";
        return;
      }

      if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
        confirmacion.innerHTML = "<span style='color:red'>El correo electrónico no es válido.</span>";
        return;
      }

      confirmacion.innerHTML = `<span style='color:green'>Gracias ${nombre}, te responderemos pronto.</span>`;
      form.reset();
    });
  }
});
