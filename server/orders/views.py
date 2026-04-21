from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import OrderSerializer

@api_view(['POST'])
def create_order(request):
    data = request.data

    if 'items' in data and isinstance(data['items'], list):
        items = data['items']
        if not items:
            return Response({'items': ['Cart cannot be empty']}, status=status.HTTP_400_BAD_REQUEST)

        product_name = ', '.join([str(item.get('name', '')).strip() for item in items if item])
        price = sum(float(item.get('price', 0)) * int(item.get('quantity', 1)) for item in items)
    elif 'product' in data:
        product = data['product']
        product_name = product.get('name', '')
        price = float(product.get('price', 0))
    else:
        return Response({'detail': 'No product or cart items provided.'}, status=status.HTTP_400_BAD_REQUEST)

    customer = data.get('customer', {})
    order_data = {
        'product_name': product_name,
        'price': price,
        'customer_name': customer.get('name', ''),
        'address': customer.get('address', ''),
        'phone': customer.get('phone', ''),
    }

    serializer = OrderSerializer(data=order_data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Order placed successfully'}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
