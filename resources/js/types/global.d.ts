import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}

declare module '@inertiajs/react' {
    interface PageProps {
        auth: {
            user: {
                id: number;
                name: string;
                email: string;
                is_admin: boolean;
                avatar_url?: string;
            } | null;
        };
        flash?: {
            success?: string;
            error?: string;
        };
    }
}
