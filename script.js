fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const purchaseOrders = data.mvPurchaseOrders;
        const orderList = document.getElementById('order-list');
        const orderDetails = document.getElementById('order-details');

        purchaseOrders.forEach((order, index) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = "#";
            a.textContent = `${order.PurchaseOrderTypeAbbreviation} – ${order.PurchaseOrderNo}`;
            a.onclick = () => showOrderDetails(index);
            li.appendChild(a);
            orderList.appendChild(li);
        });

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
            orderDetails.style.display = 'block';
        }
    })
    .catch(error => console.error('Error fetching JSON:', error));
