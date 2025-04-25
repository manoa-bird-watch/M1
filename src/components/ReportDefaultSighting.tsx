'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
// eslint-disable-next-line import/extensions
import { addSighting } from '@/lib/dbActions';
// eslint-disable-next-line import/extensions
import LoadingSpinner from '@/components/LoadingSpinner';
// eslint-disable-next-line import/extensions
import { AddSightingSchema } from '@/lib/validationSchemas';
import birdData from '../../config/settings.development.json';

const onSubmit = async (
  data: { imagepath: string; name: string; sciname: string; time: string; userid: number; description: string },
) => {
  await addSighting(data);
  swal('Success', 'Your sighting has been added', 'success', {
    timer: 2000,
  });
};

const ReportDefaultSighting: React.FC = () => {
  const { data: session, status } = useSession();
  // console.log('AddStuffForm', status, session);
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddSightingSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  const handleBirdSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBird = birdData.defaultData.find((bird) => bird.name === event.target.value);
    if (selectedBird) {
      // Autofill form fields with selected bird data
      setValue('name', selectedBird.name);
      setValue('sciname', selectedBird.sciname);
      setValue('imagepath', `/public/${selectedBird.imagepath}`); // Assuming images are in the public folder
      setValue('description', selectedBird.description);
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

                <Form.Group>
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

                <Form.Group>
                  <Form.Label>Selected Bird Preview</Form.Label>
                  <div>
                    {birdData.defaultData.map((bird) => (
                      <div key={bird.name} className="d-flex align-items-center mb-2">
                        <img
                          src={`/public/${bird.imagepath}`}
                          alt={bird.name}
                          style={{ width: '50px', height: '50px', marginRight: '10px' }}
                        />
                        <span>{bird.name}</span>
                      </div>
                    ))}
                  </div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>At what time?</Form.Label>
                  <input
                    type="text"
                    {...register('time')}
                    className={`form-control ${errors.time ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.time?.message}</div>
                </Form.Group>

                <input type="hidden" {...register('owner')} value={currentUser} />
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
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
