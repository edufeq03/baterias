# app.py
from flask import Flask
from database import db
from config import DevelopmentConfig
from routes.main import main_bp
from routes.admin import admin_bp
import os
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'static/uploads/products'


# Cria a pasta se ela não existir
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Inicializa o banco de dados
db.init_app(app)

# Registra os Blueprints (Pastas de rotas)
app.register_blueprint(main_bp)
app.register_blueprint(admin_bp)

with app.app_context():
    import models

if __name__ == '__main__':
    app.run(debug=True)