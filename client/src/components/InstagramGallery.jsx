const photos = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200",
    alt: "Instagram post 1",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200",
    alt: "Instagram post 2",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200",
    alt: "Instagram post 3",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1200",
    alt: "Instagram post 4",
  },
];

function InstagramGallery() {
  return (
    <section className="instagram">
      <div className="section-title">
        <span>FOLLOW US</span>
        <h2>@INBARE</h2>
      </div>

      <div className="instagram-grid">
        {photos.map((photo) => (
          <img key={photo.id} src={photo.img} alt={photo.alt} />
        ))}
      </div>
    </section>
  );
}

export default InstagramGallery;
