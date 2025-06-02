import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Head, useForm } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inventory',
        href: '/admin/inventory',
    },
];

interface ProductCategory {
  id: number;
  category_name: string;
}

export default function Inventory({ categoryp = [] }: { categoryp?: ProductCategory[] }) {
    // Log received data
    useEffect(() => {
        console.log('Received categories:', categoryp);
    }, [categoryp]);

    const { data, setData, post, processing, reset, errors } = useForm({
        category_name: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('categoryp.store'), {
            onSuccess: () => reset('category_name'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <div className="flex">
                            <div className="w-full flex-col p-4">
                                <span> Category</span>
                                <form onSubmit={handleSubmit} className="mt-4 flex w-full items-center gap-2">
                                    <Input
                                        className="w-full"
                                        placeholder="add category..."
                                        value={data.category_name}
                                        onChange={(e) => setData('category_name', e.target.value)}
                                    />
                                    <Button className="rounded-lg p-2" variant="default" disabled={processing}>
                                        <PlusCircle className="h-4 w-4" />
                                    </Button>
                                </form>
                                {errors.category_name && <p className="mt-2 text-sm text-red-500">{errors.category_name}</p>}
                                <Separator className="my-4" />
                                {categoryp.length > 0 ? (
                                    <ul className="space-y-2">
                                        {categoryp.map((cat) => (
                                            <li key={cat.id} className="flex items-center justify-between">
                                                <span>{cat.category_name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-muted-foreground">No categories found</p>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* ... rest of your code ... */}
                </div>
            </div>
        </AppLayout>
    );
}
