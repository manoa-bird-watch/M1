'use client';

import { Card, Image } from 'react-bootstrap';
import Link from 'next/link';
import { Sighting } from '@prisma/client';

/* Renders a single Sighting. See list-birds/page.tsx. */
const SightingCard = ({ sighting }: { sighting: Sighting }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={sighting.imagepath ?? 'public/bird-00.jpg'} alt={sighting.name} width={75} />
      <Card.Title>
        {sighting.name}
      </Card.Title>
      <Card.Subtitle>{sighting.time}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{sighting.description}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <Link href={`edit/${sighting.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default SightingCard;
