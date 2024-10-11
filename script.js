const apiKey = "9a0008eb53936af15002f914bf1cc9c6";
const ciudades = [
  "Santiago",
  "Valparaíso",
  "Viña del Mar",
  "Concepción",
  "La Serena",
  "Antofagasta",
  "Temuco",
  "Rancagua",
  "Talca",
  "Arica",
  "Iquique",
  "Puerto Montt",
  "Copiapó",
  "Osorno",
  "Valdivia",
  "Punta Arenas",
];

document.addEventListener("DOMContentLoaded", () => {
  const ciudadSelect = document.getElementById("ciudad");
  const verPronosticoBtn = document.getElementById("verPronostico");

  // Populamos el select con las ciudades
  ciudades.forEach((ciudad) => {
    ciudadSelect.innerHTML += `<option value="${ciudad}">${ciudad}</option>`;
  });

  verPronosticoBtn.addEventListener("click", () => {
    const ciudad = ciudadSelect.value;
    ciudad
      ? obtenerPronostico(ciudad)
      : alert("Por favor, seleccione una ciudad");
  });

  const obtenerPronostico = async (ciudad) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad},CL&appid=${apiKey}&units=metric&lang=es`
      );
      const data = await response.json();
      mostrarPronostico(data);
    } catch (error) {
      alert("Error al obtener el pronóstico.");
    }
  };

  const mostrarPronostico = (data) => {
    const pronosticoContenido = document.getElementById("pronosticoContenido");
    pronosticoContenido.innerHTML = "";
    const pronosticoPorDia = {};

    // Organizar el pronóstico por día
    data.list.forEach((item) => {
      const fecha = new Date(item.dt * 1000).toLocaleDateString();
      if (!pronosticoPorDia[fecha]) {
        pronosticoPorDia[fecha] = {
          tempMin: item.main.temp_min,
          tempMax: item.main.temp_max,
          humedad: item.main.humidity,
          clima: item.weather[0].main,
          descripcion: item.weather[0].description,
        };
      }
    });

    let isFirst = true;
    let climaGeneral = "";
    Object.entries(pronosticoPorDia).forEach(([dia, pronostico]) => {
      const { tempMin, tempMax, humedad, clima, descripcion } = pronostico;
      const itemClass = `carousel-item ${isFirst ? "active" : ""}`;

      // Obtener la URL de la imagen acorde al clima
      const imagenClima = obtenerImagenClima(clima.toLowerCase());

      // Crear contenido del carrusel con la imagen como fondo
      pronosticoContenido.innerHTML += `
        <div class="${itemClass}">
          <div class="card weather-card" style="background-image: url('${imagenClima}');">
            <div class="card-body text-center d-flex flex-column justify-content-center">
              <div class="weather-info">
                <h5>${dia}</h5>
                <p>Temperatura: ${tempMin.toFixed(1)}°C - ${tempMax.toFixed(
        1
      )}°C</p>
                <p>Humedad: ${humedad}%</p>
                <p>Clima: ${descripcion}</p>
              </div>
            </div>
          </div>
        </div>`;
      isFirst = false;
      climaGeneral = clima; // Actualizamos el clima general
    });

    actualizarFondo(climaGeneral); // Cambia el fondo según el clima
  };

  const obtenerImagenClima = (clima) => {
    const climaLower = clima.toLowerCase().trim();
    const imagenes = {
      clear: "img/despejado.jpeg",
      clouds: "img/nublado.jpeg",
      rain: "img/lluvia.jpeg",
      snow: "img/nieve.jpeg",
      default: "img/default.jpeg",
    };

    if (climaLower in imagenes) {
      return imagenes[climaLower];
    }

    for (let key in imagenes) {
      if (climaLower.includes(key)) {
        return imagenes[key];
      }
    }

    console.log(`Clima no reconocido: ${clima}`);
    return imagenes.default;
  };

  const actualizarFondo = (clima) => {
    const body = document.body;
    const climaLower = clima.toLowerCase().trim();
    const colores = {
      clear: "#87CEEB", // Azul claro
      clouds: "#B0C4DE", // Gris nublado
      rain: "#2F4F4F", // Gris oscuro
      snow: "#F0F8FF", // Blanco nieve
      default: "#DCDCDC", // Gris claro
    };

    let colorFondo = colores.default;
    for (let key in colores) {
      if (climaLower.includes(key)) {
        colorFondo = colores[key];
        break;
      }
    }

    body.style.backgroundColor = colorFondo;
    console.log(`Clima: ${clima}, Color de fondo: ${colorFondo}`);
  };
});
