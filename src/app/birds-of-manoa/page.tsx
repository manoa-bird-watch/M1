import { prisma } from '@/lib/prisma'; // adjust path if needed
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function BirdsOfManoaPage() {
  const birds = await prisma.bird.findMany();

  return (
    <main className="py-5">
      <div className="container">
        <h1 className="text-center mb-4">Birds of Manoa</h1>
        <div className="row">
          { /* maps over the birds array and creates a card for each bird */ }
          {birds.map((bird) => {
            const imgSrc = bird.imagepath ?? '/bird-00.jpg'; // default fallback
            return (
              <div key={bird.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <Image
                    src={imgSrc ?? '/bird-00.jpg'}
                    alt={bird.name}
                    width={400}
                    height={250}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{bird.name}</h5>
                    <div className="text-muted">
                      <em>{bird.sciname}</em>
                    </div>
                    <p className="card-text">{bird.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
