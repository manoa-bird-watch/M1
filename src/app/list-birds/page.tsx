import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
// import StuffItem from '@/components/StuffItem';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { Sighting } from '@prisma/client';
import SightingCard from '@/components/SightingCard';

/** Render a list of stuff for the logged in user. */
const ListBirds = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const owner = session?.user!.email ? session.user.email : '';
  const sightings: Sighting[] = await prisma.sighting.findMany({
    where: {
      owner,
    },
  });
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center">Sightings</h1>
              <Row xs={1} md={2} lg={3} className="g-4">
                {sightings.map((sighting) => (
                  <Col>
                    <SightingCard sighting={sighting} />
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

export default ListBirds;
