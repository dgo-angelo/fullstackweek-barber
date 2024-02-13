import { db } from '@/app/_lib/prisma';

import BarbershopInfo from './_components/barbershop-info';
import ServiceItem from './_components/service-item';
import { Service } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface BarbershopDetailsPageProp {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPageProp) => {
  const session = await getServerSession(authOptions);
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
        {barbershop.services.map((service: Service) => (
          <ServiceItem barbershop={barbershop} service={service} key={service.id} isAuthenticated={!!session?.user} />
        ))}
      </div>
    </div>
  );
};

export default BarbershopDetailsPage;
