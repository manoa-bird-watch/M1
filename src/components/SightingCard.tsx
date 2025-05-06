'use client';

import { Card, Image } from 'react-bootstrap';
import Link from 'next/link';
import { Sighting } from '@prisma/client';

/* Renders a single Sighting. See list-birds/page.tsx and list-all-sightings/page.tsx for usage.
  Added current user's role for edit / delete permissions */
const SightingCard = ({
  sighting,
  currentUserEmail,
  currentUserRole,
}: {
  sighting: Sighting;
  currentUserEmail: string | null;
  currentUserRole: string | null;
}) => {
  const canEditOrDelete = currentUserEmail === sighting.owner || currentUserRole === 'ADMIN';

  return (
    <Card className="h-100">
      <Card.Header>
        <Image src={sighting.imagepath ?? '/bird-00.jpg'} alt={sighting.name} width={75} />
        <Card.Title>{sighting.name}</Card.Title>
        <Card.Subtitle>{sighting.time}</Card.Subtitle>
        <Card.Subtitle className="mt-1">{sighting.location || 'Unknown location'}</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>{sighting.description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        {canEditOrDelete && (
          <>
            <Link href={`edit/${sighting.id}`} className="me-3">Edit</Link>
            <Link href={`delete/${sighting.id}`} className="text-danger">Delete</Link>
          </>
        )}
      </Card.Footer>
    </Card>
  );
};

export default SightingCard;
