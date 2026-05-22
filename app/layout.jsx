import "./globals.css";

export const metadata = {
  title: "PanZGames — Video Game Price Comparator",
  description:
    "Compare video game prices across Steam, EB Games, JB Hi-Fi, Mighty Ape, GOG and more. Find retro games on eBay AU with Australian prices.",
  keywords: "game price comparison, cheap video games, gaming deals, retro games australia, EB Games, JB Hi-Fi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
