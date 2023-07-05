import Product from "./product";
import classes from "./MeetupList.module.css";

interface ProductData {
  name: string;
  id: string;
  description: string;
  price: number;
  category: string;
  imageurl: string;
  stock: number;
  createdAt: Date | string;
}

interface ProductsListProps {
  items: ProductData[];
}

function ProductList(props: ProductsListProps) {
  return (
    <>
      <h2>작동테스트</h2>
      <ul className={classes.list}>
        {props.items?.map((item) => (
          <Product
            key={item.id}
            id={item.id}
            name={item.name}
            imageurl={item.imageurl}
            price={item.price}
            category={item.category}
            stock={item.stock}
            description={item.description}
            createdAt={item.createdAt}
          />
        ))}
      </ul>
    </>
  );
}

export default ProductList;
