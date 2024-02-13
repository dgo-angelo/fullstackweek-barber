'use client';
import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

import SideMenu from './side-menu';

const Header = () => {
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
            <SideMenu />
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
