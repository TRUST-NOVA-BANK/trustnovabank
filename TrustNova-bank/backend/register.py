from database import get_connection
from werkzeug.security import generate_password_hash


def register_user(full_name, email, phone, password):
 connection = get_connection()
    cursor = connection.cursor()
    # Encrypt password
    hashed_password = generate_password_hash(password)
    try:

        # Add user
        cursor.execute(
            """
            INSERT INTO users
            (full_name, email, phone, password)
            VALUES (%s, %s, %s, %s)
            """,
            (
                full_name,
                email,
                phone,
                hashed_password
            )
        )


        user_id = cursor.lastrowid


        # Create bank account

        account_number = "TN" + str(user_id).zfill(8)


        cursor.execute(
            """
            INSERT INTO accounts
            (user_id, account_number, balance, account_type)
            VALUES (%s, %s, %s, %s)
            """,
            (
                user_id,
                account_number,
                1000.00,
                "Checking"
            )
        )


        connection.commit()


        return {
            "success": True,
            "message": "Account created successfully",
            "account_number": account_number
        }


    except Exception as e:

        connection.rollback()

        return {
            "success": False,
            "error": str(e)
        }


    finally:

        connection.close()