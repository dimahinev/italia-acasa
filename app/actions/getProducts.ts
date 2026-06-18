'use server';

import { client } from '@/tina/__generated__/client';

export interface SearchedProduct {
    id: string;
    title: string;
    price: number;
    images?: (string | null)[] | null;
    slug: string;
    category?: string | null;
}

export async function getProducts(): Promise<SearchedProduct[]> {
    try {
        const productsResponse = await client.queries.productConnection();
        const products =
            productsResponse.data.productConnection.edges
                ?.map((edge) => edge?.node)
                .filter((node): node is NonNullable<typeof node> => !!node) || [];

        return products.map((product) => ({
            id: product.id,
            title: product.title,
            price: product.price,
            images: product.images,
            slug: product._sys.filename,
            category: product.category,
        }));
    } catch (error) {
        console.error('Error fetching products from Tina CMS:', error);
        return [];
    }
}
