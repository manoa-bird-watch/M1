'use client';

import { Container, Image, Nav, Navbar } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#">
          <Image src="/I3.jpg" alt="Manoa Bird Watching" width={150} height={50} className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/add">Report Sighting</Nav.Link>
            <Nav.Link href="/list">List Sightings</Nav.Link>
            <Nav.Link href="/auth/signin">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <header className="hero text-center text-white d-flex flex-column justify-content-center align-items-center">
      <div className="container">
        <h1>Welcome to Manoa Bird Watch</h1>
        <p className="lead">Your gateway to discovering the vibrant birdlife of Manoa Valley.</p>
      </div>
    </header>

    <section className="section py-5 text-center">
      <div className="container">
        <h2>Observed Bird Species</h2>
        <div className="row">
          {[
            {
              id: 'apapane',
              src: 'Apapane1.jpg',
              title: 'Apapane',
              text: 'A vibrant red honeycreeper commonly seen in Manoa\'s forests.',
              location: 'Manoa Falls Trail',
            },
            {
              id: 'white-rumped_shama',
              src: 'White-rumped_Shama.jpg',
              title: 'White-rumped Shama',
              text: 'Famous for its melodious calls, often found near dense vegetation.',
              location: 'Manoa Cliffs Trail',
            },
            {
              id: 'rose-ringed_parakeet',
              src: 'rose-ringed-parakeet.jpg',
              title: 'Rose-ringed Parakeet',
              text: 'Bright green parakeet, often seen flying in groups.',
              location: 'Lyon Arboretum',
            },
          ].map((bird) => (
            <div key={bird.id} className="col-md-4 mb-4">
              <div className="card">
                <Image src={bird.src} alt={bird.title} width={400} height={250} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{bird.title}</h5>
                  <p className="card-text">{bird.text}</p>
                  <div className="text-muted">
                    {'Location '}
                    {bird.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default Home;
