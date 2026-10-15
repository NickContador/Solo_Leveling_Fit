# 1. Clone o repositório base
git clone https://github.com/musabekoff/gymMe.git solo-legends
cd solo-legends

# 2. Copie os arquivos novos
# — gamification/ → frontend/src/gamification/
# — academy_sync/ → frontend/src/academy_sync/
# — components/ → frontend/src/components/

# 3. Atualize as rotas e loja conforme acima

# 4. Instale dependências
cd frontend
npm install zustand  # Gerenciamento de estado
cd ..

# 5. Inicie com Docker
cp .env.example .env
docker compose up -d --build

# 6. Acesse
# http://localhost:8080
