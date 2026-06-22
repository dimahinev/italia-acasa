import { client } from '../../../tina/__generated__/client';
import { ProductPageClient } from './client-page';
import { getBlurDataURL } from '@/shared/lib/utils/getBlurDataURL';

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

    const images = (result.data.product.images ?? []).filter(
        (img): img is string => typeof img === 'string',
    );
    const imageBlurMap = Object.fromEntries(
        images.map((img) => [img, getBlurDataURL(img)] as const),
    );

    return <ProductPageClient {...result} imageBlurMap={imageBlurMap} />;
}
