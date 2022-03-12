import { createState, none, useHookstate } from '@hookstate/core';
import data from '../data.json';
import { generateNextId, Plant, Plants } from './_none';

const plantsStore = createState<Plants>(data);

/*
 * CONTRACT BETWEEN STORE AND COMPONENT - DO NOT MODIFY THE PARAMETERS OR RETURN SHAPE
 */

export function useFetchInitialData() {}

export function usePlants() {
  const plants = useHookstate(plantsStore).get();
  return plants;
}

export function usePlant(id: string) {
  const plant = useHookstate(plantsStore.nested(id)).get();
  return plant;
}

export function useAddPlant() {
  return (plant: Plant) => {
    const id = generateNextId(plantsStore.get());
    plantsStore.nested(id).set(plant);
  };
}

export function useDeletePlant(id: string) {
  return () => {
    plantsStore.merge({ [id]: none });
  };
}

export function useUpdatePlant(id: string) {
  return (plant: Partial<Plant>) => {
    plantsStore.nested(id).merge(plant);
  };
}
