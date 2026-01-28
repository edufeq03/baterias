from flask import Blueprint, render_template, redirect, url_for, request, flash
from flask_login import login_user, logout_user, login_required, current_user
from models import User
from database import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))

    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        remember = True if request.form.get('remember') else False

        user = User.query.filter_by(email=email).first()

        # Verifica se o usuário existe e se a senha coincide
        if not user or not user.check_password(password):
            flash('E-mail ou senha incorretos. Tente novamente.', 'danger')
            return redirect(url_for('auth.login'))

        login_user(user, remember=remember)
        
        # Redireciona para o admin se for administrador, senão para a home
        if user.is_admin:
            return redirect(url_for('admin.dashboard')) # Supondo que você terá um blueprint admin
        
        return redirect(url_for('main.index'))

    return render_template('auth/login.html')

@auth_bp.route('/cadastro', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user_exists = User.query.filter_by(email=email).first()
        if user_exists:
            flash('Este e-mail já está cadastrado.', 'warning')
            return redirect(url_for('auth.register'))

        new_user = User(email=email)
        new_user.set_password(password) # Criptografa a senha

        db.session.add(new_user)
        db.session.commit()

        flash('Conta criada com sucesso! Faça seu login.', 'success')
        return redirect(url_for('auth.login'))

    return render_template('auth/register.html')

@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))