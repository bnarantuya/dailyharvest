import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import './Home.css';
import SearchBar from '../SearchBar/SearchBar';
import Product from '../Product/Product';
import { setProducts, setIngredients, productSelector } from '../Reducer/reducers';

function Home({ initialProducts = [] }) {
  const dispatch = useDispatch();
  //Getting filtered/non-filtered products from the state
  const products = useSelector(state => productSelector(state));
  useEffect(() => {
    //Getting products
    axios.get('https://raw.githubusercontent.com/daily-harvest/opportunities/master/web-1/data/products.json')
      .then(res => {
        //Setting products on store
        dispatch(setProducts(res.data));
      })
      .catch(err => {
        console.log(err.response);
      })
    //Getting ingredients
    axios.get('https://raw.githubusercontent.com/daily-harvest/opportunities/master/web-1/data/ingredients.json')
      .then(res => {
        dispatch(setIngredients(res.data));
      })
      .catch(err => {
        console.log(err);
      })
  }, [dispatch]);
  return (
    <div className="home">
      <SearchBar />
      <div className="product-list" data-testid='product-test-id'>
        {products.length > 0 ?
          (
            products.map((product, index) => (
              <Product
                product={product}
                key={product.id}
              />
            ))
          ) :
          (<div className="empty">No products</div>)
        }
      </div>
    </div>
  )
}

export default Home;
