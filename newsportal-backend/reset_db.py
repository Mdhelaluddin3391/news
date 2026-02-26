import os
import shutil

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
APPS_DIR = os.path.join(BASE_DIR, 'apps')

for root, dirs, files in os.walk(APPS_DIR):
    if 'migrations' in root.split(os.sep):
        for file in files:
            if file != '__init__.py':
                file_path = os.path.join(root, file)
                os.remove(file_path)
                print(f"Deleted: {file_path}")

        if '__pycache__' in dirs:
            pycache_path = os.path.join(root, '__pycache__')
            shutil.rmtree(pycache_path)
            print(f"Deleted: {pycache_path}")

db_path = os.path.join(BASE_DIR, 'db.sqlite3')
if os.path.exists(db_path):
    os.remove(db_path)
    print(f"Deleted: {db_path}")

print("Database aur migrations successfully clean ho gaye hain!")