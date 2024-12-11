const QRCode = require("qrcode");
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

// Configura los parámetros
const websiteURL = "https://example.com"; // URL del sitio web
const outputFilePath = "qrcode_with_logo.png"; // Nombre del archivo de salida
const logoPath =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/2048px-LEGO_logo.svg.png"; // Ruta al logo que se colocará en el QR

// Dimensiones del canvas
const canvasSize = 500;
const logoSize = canvasSize * 0.2; // El tamaño del logo será el 20% del tamaño del canvas

// Crear un canvas
const canvas = createCanvas(canvasSize, canvasSize);
const ctx = canvas.getContext("2d");

// Genera el código QR
QRCode.toCanvas(
  canvas,
  websiteURL,
  {
    errorCorrectionLevel: "H", // Nivel de corrección para permitir que el logo no afecte el escaneo
    margin: 1,
    width: canvasSize,
  },
  async (err) => {
    if (err) {
      console.error("Error generando el QR:", err);
      return;
    }

    try {
      // Cargar el logo
      const logo = await loadImage(logoPath);

      // Calcular posición del logo
      const logoX = (canvasSize - logoSize) / 2;
      const logoY = (canvasSize - logoSize) / 2;

      // Dibujar el logo en el centro del QR
      ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

      // Guardar el QR con el logo en un archivo
      const buffer = canvas.toBuffer("image/png");
      fs.writeFileSync(outputFilePath, buffer);
      console.log(`QR con logo generado exitosamente: ${outputFilePath}`);
    } catch (error) {
      console.error("Error al agregar el logo:", error);
    }
  }
);
