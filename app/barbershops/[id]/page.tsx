import { Button } from '@/app/_components/ui/button';
import { db } from '@/app/_lib/prisma';
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react';
import Image from 'next/image';
import BarbershopInfo from './_components/barbershop-info';
import ServiceItem from './_components/service-item';

interface BarbershopDetailsPageProp {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPageProp) => {
  if (!params.id) {
    //TODO redirecionar para home page
    return null;
  }
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    //TODO redirecionar para home page
    return null;
  }
  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />
      <div className='flex flex-col gap-4 px-5 py-6'>
        {barbershop.services.map((service) => (
          <ServiceItem service={service} key={service.id} />
        ))}
      </div>
    </div>
  );
};

export default BarbershopDetailsPage;
