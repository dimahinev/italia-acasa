import { client } from '../../../tina/__generated__/client';
import { ProductPageClient } from './client-page';

export async function generateStaticParams() {
    const productsConnection = await client.queries.productConnection();
    return (
        productsConnection.data.productConnection.edges?.map((edge) => ({
            slug: edge?.node?._sys.filename,
        })) || []
    );
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const result = await client.queries.product({
        relativePath: `${slug}.mdx`,
    });

    return <ProductPageClient {...result} />;
}
