import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: "T-Shirts",
    slug: "t-shirts",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800",
  },
  {
    id: 2,
    name: "Hoodies",
    slug: "hoodies",
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800",
  },
  {
    id: 3,
    name: "Jackets",
    slug: "jackets",
    img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800",
  },
  {
    id: 4,
    name: "Accessories",
    slug: "accessories",
    img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800",
  },
];

function Categories() {
  const navigate = useNavigate();

  return (
    <section className="categories">
      <h2>Shop By Category</h2>

      <div className="category-grid">
        {categories.map((cat) => (
          <div
            className="category-card"
            key={cat.id}
            onClick={() => navigate(`/category/${cat.slug}`)}
            style={{ cursor: 'pointer' }}
          >
            <img src={cat.img} alt={cat.name} />
            <h3>{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
