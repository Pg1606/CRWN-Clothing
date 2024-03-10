import CategoryItem from './components/category-item/category-item.component.jsx';
import './categories.styles.scss';
import { categories } from './components/directory/directory.component.jsx';

const App = () => {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))};
    </div>
  );
};

export default App;