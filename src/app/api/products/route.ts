import { NextResponse } from 'next/server';
import products from '../products.json';

export async function GET(request:Request,) {
  const { searchParams } = new URL(request.url);

  // Extract the "limit" parameter from the query parameters
  const limit = searchParams.get('limit');

  if (limit) {
    // Parse the limit parameter as an integer
    const limitValue = parseInt(limit);

    if (!isNaN(limitValue) && limitValue > 0) {
      // If a valid limit value is provided, return the first "limitValue" products
      const limitedProducts = products.slice(0, limitValue);

      return NextResponse.json(limitedProducts, { status: 200 });
    } else {
      // If the "limit" parameter is not a valid positive integer, return a 400 error response
      return NextResponse.error();
    }
  } else {
    // If no "limit" parameter is provided, return the list of all products
    return NextResponse.json(products, { status: 200 });
  }
}