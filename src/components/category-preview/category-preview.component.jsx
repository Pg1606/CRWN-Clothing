import ProductCard from '../product-card/product-card.component';

import {CategoryPreviewContainer, Title, Preview} from './category-preview.styles';
//
const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
        {/*this also works the same way in Link tag 'to' param -> {`/shop/${title}`}*/}
      </h2>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
}

export default CategoryPreview;