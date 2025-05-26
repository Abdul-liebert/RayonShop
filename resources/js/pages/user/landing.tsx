import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'landing',
        href: '/landing',
    },
];

export default function Landing() {
    return (
        <div className="text-lg">landing</div>
    );
}
