from database import get_connection
from werkzeug.security import check_password_hash


def login_user(email, password):

    connection = get_connection()

    cursor = connection.cursor(dictionary=True)


    try:

        cursor.execute(
            """
            SELECT * FROM users
            WHERE email = %s
            """,
            (email,)
        )


        user = cursor.fetchone()


        if not user:

            return {
                "success": False,
                "message": "User not found"
            }


        if check_password_hash(
            user["password"],
            password
        ):


            return {

                "success": True,

                "user_id": user["id"],

                "message": "Login successful"

            }


        else:

            return {

                "success": False,

                "message": "Incorrect password"

            }



    except Exception as e:

        return {

            "success": False,

            "message": str(e)

        }



    finally:

        connection.close()