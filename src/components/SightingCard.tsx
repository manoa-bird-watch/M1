'use client';

import { Card, Image } from 'react-bootstrap';
import Link from 'next/link';
import { Sighting } from '@prisma/client';

/* Renders a single Sighting. See list-birds/page.tsx and list-all-sightings/page.tsx for usage.*/
const SightingCard = ({
  sighting,
  currentUserEmail,
}: {
  sighting: Sighting;
  currentUserEmail: string | null;
}) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={sighting.imagepath ?? 'public/bird-00.jpg'} alt={sighting.name} width={75} />
      <Card.Title>{sighting.name}</Card.Title>
      <Card.Subtitle>{sighting.time}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{sighting.description}</Card.Text>
    </Card.Body>
    { /*  updated to only show edit and delete for the user's own sightings. */}
    <Card.Footer>
      {currentUserEmail === sighting.owner && (
        <>
          <Link href={`edit/${sighting.id}`} className="me-3">Edit</Link>
          <Link href={`delete/${sighting.id}`} className="text-danger">Delete</Link>
        </>
      )}
    </Card.Footer>
  </Card>
);

export default SightingCard;
