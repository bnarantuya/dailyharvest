import productReducer from './reducers';

describe('Reducer testing', () => {
  it('checks initial state is correct', () => {
    expect(productReducer(undefined, {})).toEqual(
      {
        searchValue: ''
      }
    )
  })
  
  it('checks reducer value equals', () => {
    expect(
      productReducer([], {
        type: "SET_SEARCH",
        payload: 'Organic kale'
      })
    ).toEqual({
        searchValue: 'Organic kale'
      })
  })

})

