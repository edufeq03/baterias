# Utiliza uma imagem leve do Python
FROM python:3.11-slim

# Evita que o Python gere arquivos .pyc e permite log em tempo real
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Instala dependências do sistema necessárias para o banco de dados e compilação
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copia apenas o arquivo de dependências primeiro (otimiza o cache do Docker)
COPY requirements.txt .

# Instala as dependências do Python e o Gunicorn (servidor de produção)
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta que o Flask/Gunicorn irá rodar
EXPOSE 5000

# Comando para iniciar a aplicação com Gunicorn
# 'app:app' refere-se ao arquivo app.py e à variável app = Flask(__name__)
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "3", "app:app"]