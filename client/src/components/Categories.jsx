import { useNavigate } from 'react-router-dom';
import hoodieImg from '../assets/Hoodie.jpg';
import jacketImg from '../assets/jacket.jpg';
import accessoriesImg from '../assets/Accessories.jpg';

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
    img: hoodieImg,
  },
  {
    id: 3,
    name: "Jackets",
    slug: "jackets",
    img: jacketImg,
  },
  {
    id: 4,
    name: "Accessories",
    slug: "accessories",
    img: accessoriesImg,
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
