-- =============================================
-- PANZGAMES - Schema de Base de Datos Supabase
-- Ejecuta este SQL en: Supabase → SQL Editor → New Query
-- =============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  platform TEXT NOT NULL,
  year INTEGER,
  genre TEXT,
  developer TEXT,
  description TEXT,
  cover_url TEXT,
  is_retro BOOLEAN DEFAULT FALSE,
  itad_id TEXT,
  igdb_id INTEGER,
  metacritic_score INTEGER,
  user_rating DECIMAL(3,1),
  ebay_search_url TEXT,
  wallapop_search_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE game_prices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  store_name TEXT NOT NULL,
  store_url TEXT,
  price DECIMAL(8,2),
  original_price DECIMAL(8,2),
  currency TEXT DEFAULT 'EUR',
  discount_percent INTEGER,
  is_affiliate BOOLEAN DEFAULT TRUE,
  affiliate_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(game_id, store_name)
);

CREATE TABLE game_of_day (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id UUID REFERENCES games(id),
  date DATE UNIQUE NOT NULL,
  ai_description TEXT,
  curiosities JSONB DEFAULT '[]',
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  bio TEXT,
  favorite_platform TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_of_day_id UUID REFERENCES game_of_day(id) ON DELETE CASCADE,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (char_length(content) BETWEEN 1 AND 500),
  likes INTEGER DEFAULT 0,
  is_flagged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT NOT NULL,
  type TEXT,
  xp_reward INTEGER DEFAULT 0,
  unlock_condition TEXT
);

CREATE TABLE user_badges (
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id),
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);

CREATE TABLE wishlists (
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  target_price DECIMAL(8,2),
  notified BOOLEAN DEFAULT FALSE,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, game_id)
);

CREATE TABLE price_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  store_name TEXT NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_games_platform ON games(platform);
CREATE INDEX idx_games_is_retro ON games(is_retro);
CREATE INDEX idx_game_prices_game_id ON game_prices(game_id);
CREATE INDEX idx_game_of_day_date ON game_of_day(date);
CREATE INDEX idx_comments_game_of_day ON comments(game_of_day_id);
CREATE INDEX idx_price_history_game ON price_history(game_id, recorded_at DESC);
CREATE INDEX idx_wishlists_user ON wishlists(user_id);

INSERT INTO badges (name, description, icon, type, xp_reward, unlock_condition) VALUES
('Retro Fan', 'Visitaste la sección retro por primera vez', '🕹️', 'platform', 50, 'Visitar sección retro'),
('Leyenda de SNES', 'Exploraste 10 juegos de Super Nintendo', '🟣', 'platform', 100, 'Ver 10 juegos SNES'),
('Gamer de GBA', 'Exploraste 10 juegos de Game Boy Advance', '🔴', 'platform', 100, 'Ver 10 juegos GBA'),
('Cazador de Ofertas', 'Encontraste un juego con más de 70% de descuento', '💰', 'activity', 75, 'Descubrir oferta >70%'),
('Comentarista', 'Escribiste tu primer comentario en el juego del día', '💬', 'activity', 30, 'Primer comentario'),
('Racha de 7 días', 'Visitaste PanZGames 7 días seguidos', '🔥', 'activity', 200, 'Login 7 días consecutivos'),
('Coleccionista', 'Añadiste 20 juegos a tu lista de deseados', '📚', 'activity', 150, 'Wishlist con 20 juegos'),
('Maestro Gamer', 'Alcanzaste el nivel 10', '👑', 'special', 500, 'Llegar a nivel 10');

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Perfil propio" ON user_profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Ver comentarios" ON comments FOR SELECT USING (TRUE);
CREATE POLICY "Crear comentario" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Borrar propio comentario" ON comments FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Wishlist propia" ON wishlists FOR ALL USING (auth.uid() = user_id);

ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_of_day ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Juegos públicos" ON games FOR SELECT USING (TRUE);
CREATE POLICY "Precios públicos" ON game_prices FOR SELECT USING (TRUE);
CREATE POLICY "Juego del día público" ON game_of_day FOR SELECT USING (TRUE);
CREATE POLICY "Badges públicos" ON badges FOR SELECT USING (TRUE);
CREATE POLICY "Badges de usuario públicos" ON user_badges FOR SELECT USING (TRUE);
