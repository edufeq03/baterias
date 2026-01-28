from flask import Blueprint, render_template, request, redirect, url_for
from models import Battery, Car, Plan
from database import db

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    products = Battery.query.all()
    plans = Plan.query.filter_by(is_active=True).all()
    return render_template('landing.html', products=products, plans=plans)

@main_bp.route('/buscar')
def search():
    query = request.args.get('q', '').strip()
    if not query:
        return redirect(url_for('main.landing'))
    
    # Busca por Marca de Bateria OU Modelo de Carro OU Fabricante de Carro
    products = Battery.query.join(Battery.compatible_cars, isouter=True).filter(
        (Battery.brand.ilike(f'%{query}%')) | 
        (Car.model.ilike(f'%{query}%')) | 
        (Car.make.ilike(f'%{query}%'))
    ).distinct().all()
    
    return render_template('landing.html', products=products, search_query=query)

@main_bp.route('/produto/<int:product_id>')
def product_detail(product_id):
    product = Battery.query.get_or_404(product_id)
    return render_template('product_detail.html', product=product)

@main_bp.route('/landing')
def landing():
    """Serve a nova landing page com dados do banco"""
    return render_template('landing.html')

@main_bp.route('/loja')
def shop():
    condicao = request.args.get('condicao')
    amps = request.args.get('amps')
    
    query = Battery.query
    
    if condicao == 'nova':
        query = query.filter(Battery.is_reconditioned == False)
    elif condicao == 'recondicionada':
        query = query.filter(Battery.is_reconditioned == True)
        
    if amps:
        query = query.filter(Battery.amps == int(amps))
        
    products = query.order_by(Battery.price.asc()).all()
    return render_template('shop.html', products=products)