<!DOCTYPE html>
<html>
<head>
  <title>TrustNova Payment</title>
  <script src="https://www.paypal.com/sdk/js?client-id=AZviZQPVOBIySp2C3_E_NMtiDh5Pw7t8zLlryytjEWIGeduHvjRxkRl72uZIBlDjCbMZRGjJU31S99qZ&currency=USD"></script>
</head>
<body>

<h2>TrustNova Payment</h2>

<div id="paypal-button-container"></div>

<script>
paypal.Buttons({

  async createOrder() {
    const response = await fetch(
      "https://uiltkhacgipmjrlgsnvb.supabase.co/functions/v1/smart-function",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "create_order",
          amount: "10.00",
          currency: "USD",
          description: "TrustNova Payment"
        })
      }
    );

    const order = await response.json();
    return order.id;
  },

  async onApprove(data) {
    const response = await fetch(
      "https://uiltkhacgipmjrlgsnvb.supabase.co/functions/v1/smart-function",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "capture_order",
          orderId: data.orderID,
          amount: "10.00",
          currency: "USD",
          description: "TrustNova Payment"
        })
      }
    );

    const result = await response.json();
    alert("Payment successful!");
    console.log(result);
  }

}).render("#paypal-button-container");
</script>

</body>
</html>
