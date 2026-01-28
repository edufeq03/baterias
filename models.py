from database import db # Certifique-se de importar do database.py
from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

# Tabela de ligação Bateria <-> Carro
compatibility = db.Table('compatibility',
    db.Column('battery_id', db.Integer, db.ForeignKey('battery.id'), primary_key=True),
    db.Column('car_id', db.Integer, db.ForeignKey('car.id'), primary_key=True)
)

class Battery(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String(50), nullable=False)
    amps = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    old_price = db.Column(db.Float)
    is_reconditioned = db.Column(db.Boolean, default=True)
    stock_quantity = db.Column(db.Integer, default=0)
    image_url = db.Column(db.String(255), nullable=True, default='default_battery.png') # Novo campo
    
    compatible_cars = db.relationship('Car', secondary=compatibility, backref='batteries')

class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(50), nullable=False)
    year_start = db.Column(db.Integer)
    year_end = db.Column(db.Integer)

class Sale(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(100))
    customer_name = db.Column(db.String(100))
    customer_phone = db.Column(db.String(20))
    amount = db.Column(db.Float)
    status = db.Column(db.String(20), default='pending')
    has_trade_in = db.Column(db.Boolean, default=True)
    affiliate_id = db.Column(db.String(50), nullable=True)
    coupon_code = db.Column(db.String(20), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Plan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False) # Ex: Essencial, Premium
    price = db.Column(db.Float, nullable=False)      # Ex: 29.90
    benefits = db.Column(db.Text, nullable=False)    # Benefícios separados por linha ou vírgula
    is_active = db.Column(db.Boolean, default=True)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    is_admin = db.Column(db.Boolean, default=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)