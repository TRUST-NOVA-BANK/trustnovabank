import mysql.connector

def get_connection():
connection = mysql.connector.connect(
host="localhost",
     

    user="root",

        password="",

        database="trustnova_bank"

    )

    return connection