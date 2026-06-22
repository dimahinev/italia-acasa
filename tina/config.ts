import { defineConfig } from 'tinacms';

// Your hosting provider likely exposes this as an environment variable
const branch =
    process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || 'main';

export default defineConfig({
    branch,

    // Get this from tina.io
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    // Get this from tina.io
    token: process.env.TINA_TOKEN,

    build: {
        outputFolder: 'admin',
        publicFolder: 'public',
    },

    media: {
        tina: {
            mediaRoot: 'uploads',
            publicFolder: 'public',
        },
    },

    schema: {
        collections: [
            {
                name: 'product',
                label: 'Products',
                path: 'content/products',
                format: 'mdx',
                ui: {
                    router: ({ document }) => `/products/${document._sys.filename}`,
                    filename: {
                        slugify: (values) => {
                            return (values.title || '')
                                .toLowerCase()
                                .replace(/ /g, '-')
                                .replace(/[^\w-]+/g, '');
                        },
                    },
                },
                fields: [
                    {
                        type: 'string',
                        name: 'title',
                        label: 'Product Name',
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: 'string',
                        name: 'category',
                        label: 'Category',
                        required: true,
                        options: [
                            { label: 'Shampoo', value: 'shampoo' },
                            { label: 'Spray', value: 'spray' },
                            { label: 'Toothpaste', value: 'toothpaste' },
                            { label: 'Mask', value: 'mask' },
                        ],
                    },
                    {
                        type: 'number',
                        name: 'price',
                        label: 'Price',
                        required: true,
                    },
                    {
                        type: 'image',
                        name: 'images',
                        label: 'Images',
                        list: true,
                    },
                    {
                        type: 'boolean',
                        name: 'featured',
                        label: 'Featured Product',
                    },
                    {
                        type: 'rich-text',
                        name: 'description',
                        label: 'Description',
                        isBody: true,
                    },
                ],
            },
        ],
    },
});
