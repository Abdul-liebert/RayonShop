import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { type SharedData } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { type ReactNode, FormEventHandler } from 'react';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function Layout({ children }: { children: ReactNode }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: auth?.user?.name || '',
        email: auth?.user?.email||'' ,
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    console.log(auth.user);

    return (
        <div className="flex min-h-screen flex-col">
            {/* Header */}
            <header className="w-full border-b border-solid border-[#19140035] py-6 text-sm dark:border-[#3E3E3A]">
                <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
                    <nav className="flex items-center justify-end gap-3">
                        {auth.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2 px-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>{auth.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <span className="hidden md:inline">{auth.user.name.split(' ')[0]}</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    {auth.user.isAdmin === 1 && (
                                        <DropdownMenuItem asChild>
                                            <Link href={route('dashboard')} className="flex w-full cursor-pointer items-center">
                                                <Settings className=" h-4 w-4" />
                                                <span>Dashboard</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                    <Separator className='my-1'/>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                                                <div className="flex">
                                                    <User className="mr-2 h-4 w-4" />
                                                    <span>Edit Profile</span>
                                                </div>
                                            </DropdownMenuItem>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <form onSubmit={submit}>
                                                <DialogHeader>
                                                    <DialogTitle>Edit profile</DialogTitle>
                                                    <DialogDescription>
                                                        Make changes to your profile here. Click save when you're done.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="name" className="text-right">
                                                            Name
                                                        </Label>
                                                        <Input
                                                            id="name"
                                                            value={data.name}
                                                            onChange={(e) => setData('name', e.target.value)}
                                                            className="col-span-3"
                                                        />
                                                        {errors.name && <p className="col-span-4 col-start-2 text-sm text-red-500">{errors.name}</p>}
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="email" className="text-right">
                                                            Email
                                                        </Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            value={data.email}
                                                            onChange={(e) => setData('email', e.target.value)}
                                                            className="col-span-3"
                                                        />
                                                        {errors.email && (
                                                            <p className="col-span-4 col-start-2 text-sm text-red-500">{errors.email}</p>
                                                        )}
                                                    </div>
                                                    {/* password form */}
                                                    {/* <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="password" className="text-right">
                                                            Password
                                                        </Label>
                                                        <Input
                                                            id="password"
                                                            type="password"
                                                            value={data.password}
                                                            onChange={(e) => setData('password', e.target.value)}
                                                            className="col-span-3"
                                                        />
                                                        {errors.password && (
                                                            <p className="col-span-4 col-start-2 text-sm text-red-500">
                                                                {errors.password}
                                                            </p>
                                                        )}
                                                    </div> */}
                                                </div>
                                                <DialogFooter>
                                                    <div className="flex w-full gap-4">
                                                        <DialogTrigger asChild>
                                                            <Button type="button" variant="destructive">
                                                                Close
                                                            </Button>
                                                        </DialogTrigger>
                                                        <Button type="submit" disabled={processing}>
                                                            {processing ? 'Saving...' : 'Save changes'}
                                                        </Button>
                                                    </div>
                                                </DialogFooter>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                    <DropdownMenuItem asChild>
                                        <Link href={route('logout')} method="post" as="button" className="flex w-full cursor-pointer items-center">
                                            <LogOut className=" h-4 w-4" />
                                            <span>Logout</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm hover:border-[#19140035]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm hover:border-[#1915014a]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="border-t border-[#19140035] p-6 text-center text-sm text-[#666] dark:border-[#3E3E3A] dark:text-[#aaa]">
                © {new Date().getFullYear()} Rayonstyle. All rights reserved.
            </footer>
        </div>
    );
}
