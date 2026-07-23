from database import get_connection

try:
    db = get_connection()

    print("Database connected successfully")

    db.close()

except Exception as e:
    print("Connection failed:")
    print(e)