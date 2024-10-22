// Fetch the JSON data
fetch('data.json')
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
        const purchaseOrders = data.mvPurchaseOrders; // Get the purchase orders array
        const orderList = document.getElementById('order-list'); // Grab the order list element
        const orderDetails = document.getElementById('order-details'); // Grab the order details element

        // Create list items for each order
        purchaseOrders.forEach((order, index) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = "#";
            a.textContent = `${order.PurchaseOrderTypeAbbreviation} – ${order.PurchaseOrderNo}`;
            a.onclick = () => showOrderDetails(index);
            li.appendChild(a);
            orderList.appendChild(li);
        });

        // Show details for a specific order
        function showOrderDetails(index) {
            const order = purchaseOrders[index];
            orderDetails.innerHTML = `
                <h2>Order Details</h2>
                <p>Address: ${order.PurchaseOrderAddress}</p>
                <p>Contact Person: ${order.PurchaseOrderContactPerson}</p>
                <p>Status: ${order.PurchaseOrderStatus}</p>
                <h3>Items</h3>
                <table>
                    <tr>
                        <th>Product SKU</th>
                        <th>Quantity Ordered</th>
                        <th>Unit Price</th>
                        <th>Total Amount</th>
                    </tr>
                    ${order.PurchaseOrderDetails.map(detail => `
                        <tr>
                            <td>${detail.PurchaseOrderRowProductSKU}</td>
                            <td>${detail.PurchaseOrderRowQuantity}</td>
                            <td>${detail.PurchaseOrderRowUnitPriceWithoutTaxOrDiscount}</td>
                            <td>${detail.PurchaseOrderRowTotalAmount}</td>
                        </tr>
                    `).join('')}
                </table>
            `;
            orderDetails.style.display = 'block'; // Make the details visible
        }
    })
    .catch(error => console.error('Error fetching JSON:', error)); // Handle errors
