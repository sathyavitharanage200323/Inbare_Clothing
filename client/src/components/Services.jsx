function Services() {
  const services = [
    "Brand Identity",
    "UI/UX Design",
    "Web Development",
    "Digital Marketing",
  ];

  return (
    <section className="services">
      <h2>Our Services</h2>

      <div className="service-grid">
        {services.map((item) => (
          <div className="card" key={item}>
            <h3>{item}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;