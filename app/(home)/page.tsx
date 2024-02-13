import { format, isFuture } from 'date-fns';
import Header from '../_components/header';
import { ptBR } from 'date-fns/locale';
import Search from './_components/search';
import BookingItem from '../_components/booking-item';
import { db } from '../_lib/prisma';
import BarbershopItem from './_components/barbershop-item';
import { Barbershop } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const [barbershops, confirmedBookings] = await Promise.all([
    await db.barbershop.findMany(),
    session?.user
      ? await db.booking.findMany({
          where: {
            userId: (session.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : [],
  ]);
  session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: true,
          barbershop: true,
        },
      })
    : Promise.resolve([]);
  return (
    <div>
      <Header />
      <div className='px-5 pt-5'>
        <h2 className='text-xl font-bold'>Olá, Diego</h2>
        <p className='capitalize'>{format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}</p>
      </div>
      <div className='px-5 mt-6'>
        <Search />
      </div>

      <div className='mt-6'>
        <h2 className='pl-5 text-xs uppercase text-gray-400 font-bold mb-3'>Agendamentos</h2>
        <div className='flex px-5 gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>

      <div className='mt-6'>
        <h2 className='px-5 text-xs uppercase text-gray-400 font-bold mb-3'>Recomendados</h2>
        <div className='flex gap-2 px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
          {barbershops.map((barbershop: Barbershop) => (
            <BarbershopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>
      </div>
      <div className='mt-6 mb-[4.5rem]'>
        <h2 className='px-5 text-xs uppercase text-gray-400 font-bold mb-3'>Populares</h2>
        <div className='flex gap-2 px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
          {barbershops.map((barbershop: Barbershop) => (
            <BarbershopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
