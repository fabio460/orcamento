import { configureStore } from '@reduxjs/toolkit'
import updateReducer from './reducers/updateReducer'
import productSelected from './reducers/productSelected'
import checkBoxReducer from './reducers/checkBoxReducer'
import checkBoxReducer2 from './reducers/checkBoxReducer2'
import checkBoxReducer3 from './reducers/checkBoxReducer3'
export const store = configureStore({
  reducer: {
    checkBoxReducer2,
    checkBoxReducer3,
    checkBoxReducer,
    productSelected,
    updateReducer,
        
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch