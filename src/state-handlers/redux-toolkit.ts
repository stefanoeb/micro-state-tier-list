import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { generateNextId, Plant, Plants } from './_none';
import data from '../data.json';

const addPlant = createAction<Plant & { id: string }>('ADD_PLANT');
const deletePlant = createAction<string>('DELETE_PLANT');
const updatePlant = createAction<Partial<Plant> & { id: string }>(
  'UPDATE_PLANT'
);

const plantsReducer = createReducer<Plants>(data, (builder) => {
  builder
    .addCase(addPlant, (state, action) => {
      state[action.payload.id] = action.payload;
    })
    .addCase(deletePlant, (state, action) => {
      delete state[action.payload];
    })
    .addCase(updatePlant, (state, action) => {
      state[action.payload.id] = {
        ...state[action.payload.id],
        ...action.payload,
      };
    })
});

type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: { plants: plantsReducer },
});

/*
 * CONTRACT BETWEEN STORE AND COMPONENT - DO NOT MODIFY THE PARAMETERS OR RETURN SHAPE
 */

export function useFetchInitialData() {}

export function usePlants() {
  const plants = useSelector((state: RootState) => state.plants);
  return plants;
}

export function usePlant(id: string) {
  const plants = useSelector((state: RootState) => state.plants);
  return plants[id];
}

export function useAddPlant() {
  const plants = usePlants();
  const dispatch = useDispatch();
  return (plant: Plant) => {
    const id = generateNextId(plants);
    dispatch(addPlant({ id, ...plant }));
  };
}

export function useDeletePlant(id: string) {
  const dispatch = useDispatch();
  return () => {
    dispatch(deletePlant(id));
  };
}

export function useUpdatePlant(id: string) {
  const dispatch = useDispatch();
  return (plant: Partial<Plant>) => {
    dispatch(updatePlant({ id, ...plant }));
  };
}
