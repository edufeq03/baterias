# Utiliza uma imagem ainda mais leve para economizar recursos da VPS
FROM python:3.11-slim-bookworm

# Sintaxe moderna (key=value) para evitar os aviso
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Instala apenas o essencial e limpa o cache imediatamente para reduzir o uso de disco/RAM
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copia e instala dependências primeiro
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt && \
    pip install --no-cache-dir gunicorn

COPY . .

EXPOSE 5000

# Gunicorn com menos workers para evitar o erro 'Killed' em VPS pequenas (1GB RAM)
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "--threads", "4", "--timeout", "60", "app:app"]