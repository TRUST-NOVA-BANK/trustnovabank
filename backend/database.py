import mysql.connector
from urllib.parse import urlparse
import os

DATABASE_URL = "mysql://root:"wOWSnFrgtrUwNBhJjuIZxHEWbMhCxlYH@sakura.proxy.rlwy.net:59102/railway"
url = urlparse(DATABASE_URL)

connection = mysql.connector.connect(
    host=url.hostname,
    user=url.username,
    password=url.password,
    database=url.path.lstrip("/"),
    port=url.port
)

def get_connection():
    return connection
