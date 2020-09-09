import { createSlice, createSelector } from '@reduxjs/toolkit';

//creating slice of state(which is the only state) returns actions and reducer(which works with slice)
const productSlice = createSlice({
  name: 'items',
  initialState: {
    searchValue: '',
    products: [],
    ingredients: []
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setIngredients(state, action) {
      state.ingredients = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    }
  }
});

const { actions, reducer } = productSlice;
const currentProducts = state => state.products;
const currentIngredients = state => state.ingredients;
const currentSearchValue = state => state.searchValue;

//provides array of ingredient ids depends on search value
const ingredientSelector = createSelector(currentIngredients,
  currentSearchValue,
  (ingredients, searchValue) => ingredients.filter(ingredient => searchValue.length > 0 ? ingredient.name.toLowerCase().includes(searchValue.toLowerCase()):true).map(ingredient => ingredient.id)
)

//selector for products
export const productSelector = createSelector(currentProducts,
  ingredientSelector,
  (products, ingredients) => products.filter(product => product.ingredientIds.some(ingredientId => ingredients.includes(ingredientId)))
)
export const { setProducts, setIngredients, setSearchValue } = actions;
export default reducer;