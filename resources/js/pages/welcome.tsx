import EmblaCarousel from '@/components/carousel';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Layout from './layout';

import ProductCard from '@/components/product-card';

const slides = ['/public/img/1.png', '/public/img/1.png', '/public/img/1.png'];

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const dummyProducts = [
        {
            image: '/img/1.png',
            title: 'Slogan Print T-Shirt',
            price: 19.95,
        },
        {
            image: '/img/2.png',
            title: 'The Notorious B.I.G.® Brooklyn Tee',
            price: 22.95,
        },
        {
            image: '/img/3.png',
            title: 'Sweater with Topstitching',
            price: 35.95,
        },
        {
            image: '/img/4.png',
            title: 'Acid Wash T-Shirt with Slogan',
            price: 19.95,
        },
    ];

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <Layout>
                <section className="mx-auto my-auto w-full overflow-hidden p-6 lg:justify-center lg:p-8">
                    <EmblaCarousel />
                </section>
                {/* Card Image */}
                <div className="mx-auto my-auto w-full overflow-hidden p-6 lg:justify-center lg:p-8">

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {dummyProducts.map((product, index) => (
                        <ProductCard key={index} title={product.title} price={product.price} />
                    ))}
                </div>
                </div>
            </Layout>
        </>
    );
}
