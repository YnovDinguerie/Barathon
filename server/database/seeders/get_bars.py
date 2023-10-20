import json
import mysql.connector


import os
from dotenv import find_dotenv
from dotenv import load_dotenv

env_file = find_dotenv()
load_dotenv(env_file)
# Accédez aux valeurs individuelles


host = os.environ.get('DB_HOST')
user = os.environ.get('DB_USERNAME')
password = os.environ.get('DB_PASSWORD')
database = os.environ.get('DB_DATABASE')

print(f'Raw host value: {host}')
print(f'Raw user value: {user}')
print(f'Raw password value: {password}')
print(f'Raw database value: {database}')

# # Charger le fichier JSON
with open('database/seeders/bars.json', 'r') as json_file:
    data = json.load(json_file)

# Liste pour stocker les données extraites
extracted_data = []
URL = "http://127.0.0.1:8000/api/bars"


# Connexion à la base de données SQLite
conn = mysql.connector.connect(
    host=host,
    user=user,
    password=password,
    database=database
)


# Création d'un curseur
cursor = conn.cursor()


# Parcourir chaque élément du tableau
for index, item in enumerate(data):
    name = item['name']
    longitude = item['geo_point_2d']['lon']
    latitude = item['geo_point_2d']['lat']
    website = item['website']
    phone = item['phone']
    opening_hours = item['opening_hours']
    wheelchair = item['wheelchair']
    # extracted_data.append(entry)
    # Exécutez la requête SQL pour insérer les données dans la table MySQL
    cursor.execute("INSERT INTO bars (name, longitude, latitude, website, phone, opening_hours, wheelchair) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                   (name, longitude, latitude, website, phone, opening_hours, wheelchair))
    conn.commit()


# Fermer la connexion
conn.close()
