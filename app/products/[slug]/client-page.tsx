'use client';
import { useTina } from 'tinacms/dist/react';

export function ProductPageClient(props: any) {
    // Хук useTina обновляет интерфейс на лету, когда ты печатаешь в админке
    const { data } = useTina({
        query: props.props.query,
        variables: props.props.variables,
        data: props.props.data,
    });

    const product = data.product;

    return (
        <div>
            <h1>{product.title}</h1>
            <p>Категория: {product.category}</p>
            <p>Цена: {product.price}</p>
            {product.images && (
                <div className="flex gap-4">
                    {product.images.map((img: string, i: number) => (
                        <img key={i} src={img} alt={product.title} width={200} />
                    ))}
                </div>
            )}
        </div>
    );
}
