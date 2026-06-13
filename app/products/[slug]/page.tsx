import { client } from '../../../tina/__generated__/client';
// Импортируй свой компонент для отображения продукта (клиентский компонент для live-edit)
import { ProductPageClient } from './client-page';

// 1. Генерируем статические пути для всех продуктов (для сборки)
export async function generateStaticParams() {
    const productsConnection = await client.queries.productConnection();
    return (
        productsConnection.data.productConnection.edges?.map((edge) => ({
            slug: edge?.node?._sys.filename,
        })) || []
    );
}

// 2. Серверный компонент страницы
export default async function ProductPage({ params }: { params: { slug: string } }) {
    // Получаем данные конкретного продукта из TinaCMS по его имени файла
    const res = await client.queries.product({
        relativePath: `${params.slug}.mdx`,
    });

    return (
        <div className="prose max-w-4xl mx-auto p-6">
            {/* Передаем данные в клиентский компонент для поддержки живого редактирования */}
            <ProductPageClient props={JSON.parse(JSON.stringify(res))} />
        </div>
    );
}
