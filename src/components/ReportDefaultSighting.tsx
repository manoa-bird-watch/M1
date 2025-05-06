'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row, Image } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { useState } from 'react';
// eslint-disable-next-line import/extensions
import { addSighting } from '@/lib/dbActions';
// eslint-disable-next-line import/extensions
import LoadingSpinner from '@/components/LoadingSpinner';
// eslint-disable-next-line import/extensions
import { AddSightingSchema } from '@/lib/validationSchemas';
import birdData from '../../config/settings.development.json';

const onSubmit = async (
  data: {
    imagepath: string;
    name: string;
    sciname: string;
    time: string;
    userid: number;
    description: string;
    location: string;
    owner: string; },
) => {
  console.log('Form submitted:', data);
  await addSighting(data);
  swal('Success', 'Your sighting has been added', 'success', {
    timer: 2000,
  });
};

const ReportDefaultSighting: React.FC = () => {
  const { data: session, status } = useSession();
  const [selectedBird, setSelectedBird] = useState<{
    name: string; sciname: string; imagepath: string; description: string } | null>(null);
  // console.log('AddStuffForm', status, session);
  const currentUser = session?.user?.email || '';
  const currentUserId = session?.user?.id || 0;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddSightingSchema),
  });

  console.log('Validation errors:', errors);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  const handleBirdSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!birdData?.defaultData) {
      console.error('birdData.defaultData is undefined');
      return;
    }
    const bird = birdData.defaultData.find((thisbird) => thisbird.name === event.target.value);
    if (bird) {
      console.log('Selected bird:', bird.imagepath);
      setValue('name', bird.name);
      setValue('sciname', bird.sciname);
      setValue('imagepath', bird.imagepath);
      setValue('description', bird.description);
      setSelectedBird(bird);
    } else {
      setSelectedBird(null);
    }
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Report Your Sighting</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>What did you see?</Form.Label>
                  <select
                    className="form-control"
                    onChange={handleBirdSelection}
                  >
                    <option value="">Select a bird</option>
                    {birdData.defaultData.map((bird) => (
                      <option key={bird.name} value={bird.name}>
                        {bird.name}
                      </option>
                    ))}
                  </select>
                </Form.Group>

                {selectedBird && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Selected Bird</Form.Label>
                      <div className="d-flex pt-3 pb-3 flex-column align-items-center">
                        <Image
                          src={selectedBird.imagepath}
                          alt={selectedBird.name}
                          style={{ width: '80%', height: '80%', marginRight: '10px' }}
                        />
                        <strong>{selectedBird.name}</strong>
                        <em className="text-muted">{selectedBird.sciname}</em>
                      </div>
                    </Form.Group>
                    <input type="hidden" {...register('name')} />
                    <input type="hidden" {...register('sciname')} />
                    <input type="hidden" {...register('imagepath')} />
                    <input type="hidden" {...register('description')} />
                  </>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>At what time?</Form.Label>
                  <input
                    type="text"
                    {...register('time')}
                    className={`form-control ${errors.time ? 'is-invalid' : ''}`}
                    placeholder="Enter time"
                  />
                  <div className="invalid-feedback">{errors.time?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Where did you see this bird?</Form.Label>
                  <input
                    type="text"
                    {...register('location')}
                    className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                    placeholder="Enter location"
                  />
                  <div className="invalid-feedback">{errors.location?.message}</div>
                </Form.Group>

                <input type="hidden" {...register('owner')} value={currentUser} />
                <input type="hidden" {...register('userid')} value={currentUserId} />
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button
                        type="submit"
                        variant="primary"
                        className="float-right"
                      >
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        onClick={() => {
                          reset(); setSelectedBird(null);
                        }}
                        variant="warning"
                        className="float-right"
                      >
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportDefaultSighting;
