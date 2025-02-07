interface Order {
    id: string;
    products: {
      productId: string;
      productQuantity: number;
      quantityUnit: 'kilo gram' | 'gram';
    }[];
    finalPrice?: number;
    deliveredDate: string;
    address: string;
    usedPaymentMethod: string;
    usedCard?: string;
    status: string;
  }
  
  const OrderData: Order[] = [
    {
      id: 'OR0001',
      products: [
        { productId: 'PR0001', productQuantity: 2, quantityUnit: 'kilo gram' },
        { productId: 'PR0003', productQuantity: 500, quantityUnit: 'gram' }
      ],
      deliveredDate: '21 Dec 2024',
      address: 'AD0001',
      usedPaymentMethod: 'Cash on delivery',
      status: 'Delivered'
    },
    {
      id: 'OR0002',
      products: [
        { productId: 'PR0012', productQuantity: 1, quantityUnit: 'kilo gram' },
        { productId: 'PR0008', productQuantity: 300, quantityUnit: 'gram' }
      ],
      deliveredDate: '21 Dec 2024',
      address: 'AD0001',
      usedPaymentMethod: 'Card payment',
      usedCard: 'C0001',
      status: 'Cancelled'
    },
    {
      id: 'OR0003',
      products: [
        { productId: 'PR0010', productQuantity: 3, quantityUnit: 'kilo gram' },
        { productId: 'PR0003', productQuantity: 150, quantityUnit: 'gram' }
      ],
      deliveredDate: '21 Dec 2024',
      address: 'AD0001',
      usedCard: 'C0001',
      usedPaymentMethod: 'Card payment',
      status: 'Delivered'
    },
    {
      id: 'OR0004',
      products: [
        { productId: 'PR0020', productQuantity: 2, quantityUnit: 'kilo gram' },
        { productId: 'PR0008', productQuantity: 500, quantityUnit: 'gram' }
      ],
      deliveredDate: '21 Dec 2024',
      address: 'AD0001',
      usedPaymentMethod: 'Cash on delivery',
      status: 'Cancelled'
    }
  ];
  
  OrderData.forEach(order => {
    if (order.usedPaymentMethod === 'Card payment' && !order.usedCard) {
      console.error(`Order ${order.id} is missing the usedCard property.`);
    }
  });
  
  export default OrderData;
  