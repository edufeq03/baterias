from flask import Blueprint, render_template, request, redirect, url_for
from models import Battery, Car, Plan
from database import db

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    products = Battery.query.all()
    plans = Plan.query.filter_by(is_active=True).all() # Adicione esta linha
    return render_template('index.html', products=products, plans=plans) # E passe 'plans' aqui

@main_bp.route('/buscar')
def search():
    query = request.args.get('q', '').strip()
    if not query:
        return redirect(url_for('main.index'))
    
    # Busca por Marca de Bateria OU Modelo de Carro OU Fabricante de Carro
    products = Battery.query.join(Battery.compatible_cars, isouter=True).filter(
        (Battery.brand.ilike(f'%{query}%')) | 
        (Car.model.ilike(f'%{query}%')) | 
        (Car.make.ilike(f'%{query}%'))
    ).distinct().all()
    
    return render_template('index.html', products=products, search_query=query)

@main_bp.route('/produto/<int:product_id>')
def product_detail(product_id):
    product = Battery.query.get_or_404(product_id)
    return render_template('product_detail.html', product=product)