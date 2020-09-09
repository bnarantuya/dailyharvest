import React from "react";
import Home from './Home';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
// import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { render, fireEvent } from '@testing-library/react'
import SearchBar from "../SearchBar/SearchBar";
// import { setProducts, setIngredients, setSearchValue } from '../Reducer/reducers';

const products =
  [
    {
      "id": 1,
      "name": "Acai + Cherry",
      "collection": "Smoothie",
      "ingredientIds": [
        31,
        79,
        81,
        4,
        51,
        67
      ],
      "image": {
        "url": "http://www.daily-harvest.com/static/img/products/01-acai/product-shot-ingredients.jpeg"
      }
    },
    {
      "id": 2,
      "name": "Carrot + Cinnamon",
      "collection": "Smoothie",
      "ingredientIds": [
        81,
        86,
        80,
        78,
        14,
        44,
        64,
        21,
        75,
        197
      ],
      "image": {
        "url": "http://www.daily-harvest.com/static/img/products/02-carro/product-shot-ingredients.jpeg"
      }
    },
    {
      "id": 3,
      "name": "Mango + Papaya",
      "collection": "Smoothie",
      "ingredientIds": [
        70,
        57,
        46,
        72,
        66
      ],
      "image": {
        "url": "http://www.daily-harvest.com/static/img/products/03-papa/product-shot-ingredients.jpeg"
      }
    },
    {
      "id": 4,
      "name": "Strawberry + Peach",
      "collection": "Smoothie",
      "ingredientIds": [
        85,
        81,
        10,
        51,
        19,
        38,
        18
      ],
      "image": {
        "url": "http://www.daily-harvest.com/static/img/products/04-straw/product-shot-ingredients.jpeg"
      }
    },
    {
      "id": 5,
      "name": "Cold Brew + Almond",
      "collection": "Smoothie",
      "ingredientIds": [
        30,
        68,
        81,
        26,
        71,
        9,
        75,
        33
      ],
      "image": {
        "url": "http://www.daily-harvest.com/static/img/products/05-coldb/product-shot-ingredients.jpeg"
      }
    }];

const ingredients = [
  {
    "id": 1,
    "name": "Hemp Protein"
  },
  {
    "id": 2,
    "name": "Avocado"
  },
  {
    "id": 3,
    "name": "Organic Maca"
  },
  {
    "id": 4,
    "name": "Organic Kale"
  },
  {
    "id": 5,
    "name": "Organic Coconut Water"
  },
];

const initialState = { products: products, ingredients: ingredients, searchValue: '' }
const mockStore = configureStore()
const store = mockStore(initialState);
store.dispatch = jest.fn();

describe('Testing on Home component', () => {
//   let container = null;
//   beforeEach(() => {
//     container = document.createElement("div");
//     document.body.appendChild(container);
//   });

//   afterEach(() => {
//     unmountComponentAtNode(container);
//     container.remove();
//     container = null;
//   });

  // it('Should render products correctly', () => {
  //   act(() => {
  //     render(<Provider store={store}><Home /></Provider>, container);
  //   });
  //   expect(container.querySelectorAll('.product').length).toBeGreaterThan(0);
  // })

  const setup = () => {
    const utils = render(<Provider store={store}><Home /></Provider>);
    const input = utils.getByLabelText('search-input-label')
    return {
      input,
      ...utils,
    }
  }

  it('shows search input contains correct content', () => {

    const { getByText, input } = setup()
    fireEvent.change(input, { target: { value: 'Organic Kale' } })
    expect(getByText(/Acai \+ Cherry/i)).toBeInTheDocument()
  });

  it('shows correct search result', () => {
    const { getByTestId, input } = setup()
    fireEvent.change(input, { target: { value: 'Organic kale' } })
    expect(getByTestId('product-test-id').children).toHaveLength(1)
  })

})