from database import get_connection


def get_dashboard(user_id):

    connection = get_connection()

    cursor = connection.cursor(dictionary=True)


    try:

        cursor.execute(
            """
            SELECT 
                users.full_name,
                accounts.account_number,
                accounts.balance,
                accounts.account_type

            FROM users

            JOIN accounts

            ON users.id = accounts.user_id

            WHERE users.id = %s
            """,
            (user_id,)
        )


        account = cursor.fetchone()


        if account:

            return {

                "success": True,

                "name": account["full_name"],

                "account_number": account["account_number"],

                "balance": account["balance"],

                "account_type": account["account_type"]

            }


        return {

            "success": False,

            "message": "Account not found"

        }


    except Exception as e:

        return {

            "success": False,

            "message": str(e)

        }


    finally:

        connection.close()