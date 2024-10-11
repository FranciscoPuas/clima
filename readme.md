# Pronóstico del Clima en Chile

Este es un proyecto que muestra el pronóstico del clima de diferentes ciudades de Chile utilizando la API de OpenWeather.

## Funcionalidades

- Seleccionar una ciudad para visualizar el pronóstico del clima.
- Ver la temperatura mínima, máxima, humedad y descripción del clima.
- Fondos dinámicos que cambian según el clima.
- Modal con información del clima para los próximos días.
- Carrusel de pronóstico del clima con transiciones fluidas.

## Tecnologías Utilizadas

- **HTML5** y **CSS3** para la estructura y el estilo.
- **JavaScript** para la lógica del pronóstico del clima.
- **Bootstrap 5** para el diseño responsivo y el modal.
- **API OpenWeather** para obtener datos del clima en tiempo real.

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tuusuario/pronostico-clima-chile.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd pronostico-clima-chile
   ```

3. Abre el archivo `index.html` en tu navegador o usa una extensión de servidor local como [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) en Visual Studio Code.

## Configuración

1. **API Key de OpenWeather**:

   - Ve a [OpenWeather](https://openweathermap.org/) y crea una cuenta gratuita.
   - Genera una API Key en el panel de control.
   - Reemplaza la variable `apiKey` en el archivo `js/scriptchile.js` con tu clave personal.

   ```javascript
   const apiKey = "TU_API_KEY_AQUI";
   ```
