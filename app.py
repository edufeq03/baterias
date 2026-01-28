# app.py
import os
from flask import Flask
from database import db
from config import DevelopmentConfig
from routes.main import main_bp
from routes.admin import admin_bp
from routes.landing import landing_bp  # ← ADICIONE
from routes.auth import auth_bp
from werkzeug.utils import secure_filename
from flask_login import LoginManager
from models import User

UPLOAD_FOLDER = 'static/uploads/products'


# Cria a pasta se ela não existir
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Configuração do Login
login_manager = LoginManager()
login_manager.login_view = 'auth.login' # Para onde vai quem tenta acessar página restrita
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


# Inicializa o banco de dados
db.init_app(app)

# Registra os Blueprints (Pastas de rotas)
app.register_blueprint(main_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(landing_bp)
app.register_blueprint(auth_bp)

with app.app_context():
    import models

if __name__ == '__main__':
    app.run(debug=True)