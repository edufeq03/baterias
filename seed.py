# seed.py
from app import app
from database import db 
from models import Battery, Car

def seed_data():
    with app.app_context():
        print("Limpando banco de dados...")
        db.drop_all()
        db.create_all()

        print("Criando carros de exemplo...")
        civic = Car(make="Honda", model="Civic", year_start=2006, year_end=2024)
        fit = Car(make="Honda", model="Fit", year_start=2003, year_end=2021)
        gol = Car(make="VW", model="Gol", year_start=2010, year_end=2023)
        corolla = Car(make="Toyota", model="Corolla", year_start=2008, year_end=2024)

        print("Criando baterias e vinculando compatibilidades...")
        
        # Bateria 45Ah - Comum em Honda (Civic/Fit)
        b_honda = Battery(
            brand="Heliar (Linha Honda)", 
            amps=45, 
            price=250.0, 
            old_price=650.0,
            stock_quantity=10,
            image_url="default_battery.png"
        )
        b_honda.compatible_cars.append(civic)
        b_honda.compatible_cars.append(fit)

        # Bateria 60Ah - Comum em Gol e Corolla
        b_moura = Battery(
            brand="Moura", 
            amps=60, 
            price=220.0, 
            old_price=580.0,
            stock_quantity=15,
            image_url="default_battery.png"
        )
        b_moura.compatible_cars.append(gol)
        b_moura.compatible_cars.append(corolla)

        # Bateria Econômica (Marca própria ou Genérica)
        b_revolt = Battery(
            brand="ReVolt Premium", 
            amps=60, 
            price=180.0, 
            old_price=450.0,
            stock_quantity=20,
            image_url="default_battery.png"
        )
        b_revolt.compatible_cars.append(gol) # Também serve no Gol

        print("Salvando no banco de dados...")
        db.session.add_all([civic, fit, gol, corolla, b_honda, b_moura, b_revolt])
        db.session.commit()
        
        print("\n✅ BANCO POPULADO COM SUCESSO!")
        print("--- TESTES DISPONÍVEIS NA BUSCA ---")
        print("1. Busque por 'Honda' (Achará a Heliar)")
        print("2. Busque por 'Civic' (Achará a Heliar)")
        print("3. Busque por 'Gol' (Achará a Moura e a ReVolt)")
        print("4. Busque por 'Moura' (Achará a Moura)")

if __name__ == '__main__':
    seed_data()