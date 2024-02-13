'use client';
import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { LogOutIcon, MenuIcon, UserIcon, LogInIcon, HomeIcon, CalendarIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarImage } from './ui/avatar';
import Link from 'next/link';

const Header = () => {
  const { data } = useSession();

  const handleLogoutClick = async () => await signOut();
  const handleLoginClick = async () => await signIn('google');
  return (
    <Card>
      <CardContent className='p-5 flex justify-between items-center flex-row'>
        <Image src='/logo.png' alt='FSW Barber Logo' height={18} width={120}></Image>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' className='h-8 w-8'>
              <MenuIcon size={16} />
            </Button>
          </SheetTrigger>
          <SheetContent className='p-0'>
            <SheetHeader className='text-left border-b border-solid border-secondary p-5'>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            {data?.user ? (
              <div className='flex justify-between px-5 py-6 items-center'>
                <div className='flex items-center gap-3'>
                  <Avatar>
                    <AvatarImage src={data.user.image ?? ''} />
                  </Avatar>
                  <h2 className='font-bold'>{data.user.name}</h2>
                </div>
                <Button variant='secondary' size='icon' onClick={handleLogoutClick}>
                  <LogOutIcon />
                </Button>
              </div>
            ) : (
              <div className='flex gap-3 flex-col px-5 py-6'>
                <div className='flex items-center gap-2'>
                  <UserIcon size={32} />
                  <h2 className='font-bold'> Olá. Faça o seu login!</h2>
                </div>
                <Button variant='secondary' className='w-full justify-start' size='icon' onClick={handleLoginClick}>
                  <LogInIcon className='m-2' size={18} />
                  Fazer login
                </Button>
              </div>
            )}

            <div className='flex flex-col gap-3 px-5'>
              <Button variant='outline' className='justify-start' asChild>
                <Link href='/'>
                  <HomeIcon size={18} className='mr-2' />
                  Início
                </Link>
              </Button>
              {data?.user ? (
                <Button variant='outline' className='justify-start' asChild>
                  <Link href='/bookings'>
                    <CalendarIcon size={18} className='mr-2' />
                    Agendamentos
                  </Link>
                </Button>
              ) : (
                <div></div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
