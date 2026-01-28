# routes/admin.py
from database import db
from models import Battery, Car, Plan
import os
from flask import Blueprint, render_template, request, redirect, url_for, flash, current_app
from werkzeug.utils import secure_filename

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

def save_image(file):
    if file and file.filename != '':
        filename = secure_filename(file.filename)
        # Caminho: static/uploads/products/
        upload_path = os.path.join(current_app.root_path, 'static', 'uploads', 'products')
        os.makedirs(upload_path, exist_ok=True)
        file.save(os.path.join(upload_path, filename))
        return filename
    return None

# --- DASHBOARD PRINCIPAL ---
@admin_bp.route('/')
def dashboard():
    return render_template('admin/index.html')

# --- GERIR BATERIAS (CRUD) ---
@admin_bp.route('/baterias', methods=['GET', 'POST'])
def list_batteries():
    if request.method == 'POST':
        image_file = request.files.get('image')
        filename = save_image(image_file)

        new_b = Battery(
            brand=request.form.get('brand'),
            amps=int(request.form.get('amps')),
            price=float(request.form.get('price')),
            old_price=float(request.form.get('old_price')) if request.form.get('old_price') else None,
            stock_quantity=int(request.form.get('stock_quantity') or 0),
            image_url=filename if filename else 'default_battery.png'
        )
        db.session.add(new_b)
        db.session.commit()
        flash('Bateria cadastrada com sucesso!', 'success')
        return redirect(url_for('admin.list_batteries'))
    
    batteries = Battery.query.all()
    return render_template('admin/baterias.html', batteries=batteries)

# routes/admin.py
@admin_bp.route('/baterias/editar/<int:id>', methods=['GET', 'POST'])
def edit_battery(id):
    battery = Battery.query.get_or_404(id)
    if request.method == 'POST':
        image_file = request.files.get('image')
        filename = save_image(image_file)
        
        battery.brand = request.form.get('brand')
        battery.amps = int(request.form.get('amps'))
        battery.price = float(request.form.get('price'))
        battery.old_price = float(request.form.get('old_price')) if request.form.get('old_price') else None
        battery.stock_quantity = int(request.form.get('stock_quantity') or 0)
        
        if filename:
            battery.image_url = filename
            
        db.session.commit()
        flash('Bateria atualizada!', 'success')
        return redirect(url_for('admin.list_batteries'))
        
    return render_template('admin/edit_bateria.html', battery=battery)

@admin_bp.route('/baterias/deletar/<int:id>')
def delete_battery(id):
    battery = Battery.query.get_or_404(id)
    db.session.delete(battery)
    db.session.commit()
    flash('Bateria removida.', 'info')
    return redirect(url_for('admin.list_batteries'))

@admin_bp.route('/baterias/nova', methods=['GET', 'POST'])
def new_battery():
    if request.method == 'POST':
        # Captura dados do formulário
        brand = request.form.get('brand')
        amps = request.form.get('amps')
        price = request.form.get('price')
        old_price = request.form.get('old_price')
        
        new_b = Battery(
            brand=brand, 
            amps=int(amps), 
            price=float(price), 
            old_price=float(old_price) if old_price else None
        )
        db.session.add(new_b)
        db.session.commit()
        return redirect(url_for('admin.list_batteries'))
    
    return render_template('admin/form_bateria.html') # Criaremos este abaixo

# --- GERIR CARROS (CRUD) ---

# --- GERIR COMPATIBILIDADES ---
@admin_bp.route('/compatibilidades')
def compatibilities():
    batteries = Battery.query.all()
    cars = Car.query.all()
    return render_template('admin/compatibilidades.html', batteries=batteries, cars=cars)

# routes/admin.py

@admin_bp.route('/compatibilidades', methods=['GET', 'POST'])
def manage_compatibilities():
    if request.method == 'POST':
        battery_id = request.form.get('battery_id')
        car_id = request.form.get('car_id')
        
        battery = Battery.query.get(battery_id)
        car = Car.query.get(car_id)
        
        if battery and car:
            # Adiciona o carro à lista de compatíveis da bateria (relação Many-to-Many)
            if car not in battery.compatible_cars:
                battery.compatible_cars.append(car)
                db.session.commit()
                flash(f'Vínculo criado: {battery.brand} -> {car.model}', 'success')
            else:
                flash('Este vínculo já existe!', 'warning')
        
        return redirect(url_for('admin.manage_compatibilities'))

    batteries = Battery.query.all()
    cars = Car.query.all()
    return render_template('admin/compatibilidades.html', batteries=batteries, cars=cars)

@admin_bp.route('/compatibilidades/remover/<int:b_id>/<int:c_id>')
def remove_compatibility(b_id, c_id):
    battery = Battery.query.get_or_404(b_id)
    car = Car.query.get_or_404(c_id)
    
    if car in battery.compatible_cars:
        battery.compatible_cars.remove(car)
        db.session.commit()
        flash('Vínculo removido com sucesso.', 'info')
        
    return redirect(url_for('admin.manage_compatibilities'))

# routes/admin.py

@admin_bp.route('/carros', methods=['GET', 'POST'])
def list_cars():
    if request.method == 'POST':
        make = request.form.get('make')
        model = request.form.get('model')
        year_start = request.form.get('year_start')
        
        new_car = Car(make=make, model=model, year_start=int(year_start) if year_start else None)
        db.session.add(new_car)
        db.session.commit()
        return redirect(url_for('admin.list_cars'))
        
    cars = Car.query.all()
    return render_template('admin/carros.html', cars=cars)

@admin_bp.route('/cupons')
def list_coupons():
    # Aqui futuramente você consultará a tabela de cupons
    return render_template('admin/marketing.html', title="Cupons de Desconto")

@admin_bp.route('/afiliados')
def list_affiliates():
    # Aqui você gerenciará os parceiros de Campinas
    return render_template('admin/marketing.html', title="Programa de Afiliados")

@admin_bp.route('/planos', methods=['GET', 'POST'])
def list_plans():
    if request.method == 'POST':
        new_plan = Plan(
            name=request.form.get('name'),
            price=float(request.form.get('price')),
            benefits=request.form.get('benefits')
        )
        db.session.add(new_plan)
        db.session.commit()
        return redirect(url_for('admin.list_plans'))
    
    plans = Plan.query.all()
    return render_template('admin/planos.html', plans=plans)

@admin_bp.route('/planos/excluir/<int:id>')
def delete_plan(id):
    plan = Plan.query.get_or_404(id)
    db.session.delete(plan)
    db.session.commit()
    return redirect(url_for('admin.list_plans'))