// import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
// import authOptions from '@/lib/authOptions';
import { Sighting } from '@prisma/client';
import SightingCard from '@/components/SightingCard';

const ListAllSightings = async () => {
  // const session = await getServerSession(authOptions);
  // const currentUserEmail = session?.user?.email ?? '';
  // doesn't protect the page for only logged in users

  // Get all sightings regardless of user
  const sightings: Sighting[] = await prisma.sighting.findMany();

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center">All Sightings</h1>
              <Row xs={1} md={2} lg={3} className="g-4">
                {sightings.map((sighting) => (
                  <Col key={sighting.id}>
                    <SightingCard sighting={sighting} />
                    { /* also includes who made the sighting */}
                    <div className="mt-2 text-center small text-muted">
                      Submitted by: {sighting.owner}
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default ListAllSightings;
