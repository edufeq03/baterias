# routes/landing.py
from flask import Blueprint, jsonify
from models import Battery, Plan

landing_bp = Blueprint('landing', __name__, url_prefix='/api')

@landing_bp.route('/plans', methods=['GET'])
def get_plans():
    """Retorna todos os planos ativos em formato JSON"""
    plans = Plan.query.filter_by(is_active=True).all()
    
    plans_data = [
        {
            'id': plan.id,
            'name': plan.name,
            'price': plan.price,
            'benefits': plan.benefits
        }
        for plan in plans
    ]
    
    return jsonify(plans_data)


@landing_bp.route('/products', methods=['GET'])
def get_products():
    """Retorna todos os produtos (baterias) em formato JSON"""
    products = Battery.query.all()
    
    products_data = [
        {
            'id': product.id,
            'brand': product.brand,
            'amps': product.amps,
            'price': product.price,
            'old_price': product.old_price,
            'is_reconditioned': product.is_reconditioned,
            'stock_quantity': product.stock_quantity,
            'image_url': product.image_url,
            'compatible_cars': [
                {
                    'id': car.id,
                    'make': car.make,
                    'model': car.model,
                    'year_start': car.year_start,
                    'year_end': car.year_end
                }
                for car in product.compatible_cars
            ]
        }
        for product in products
    ]
    
    return jsonify(products_data)