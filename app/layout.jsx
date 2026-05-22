import "./globals.css";

export const metadata = {
  title: "PanZGames — Comparador de precios de videojuegos",
  description:
    "Compara precios de videojuegos en Steam, Instant Gaming, Eneba, GOG y más. Juegos retro con precios de eBay y Wallapop.",
  keywords: "comparador precios juegos, videojuegos baratos, ofertas gaming, juegos retro",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
