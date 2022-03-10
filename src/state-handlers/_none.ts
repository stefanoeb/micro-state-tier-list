import data from '../data.json';

export interface Plant {
  name: string;
}

export type Plants = Record<string, Plant>;

let plants: Record<string, { name: string }> = { ...data };

/*
 * CONTRACT BETWEEN STORE AND COMPONENT - DO NOT MODIFY THE PARAMETERS OR RETURN SHAPE
 */

export function useFetchInitialData() {}

export function usePlants() {
  return plants;
}

export function usePlant(id: string) {
  return plants[id];
}

export function useAddPlant() {
  return (plant: Plant) => {
    const id = generateNextId(plants);
    plants[id] = plant;
  };
}

export function useDeletePlant(id: string) {
  return () => {
    delete plants[id];
  };
}

export function useUpdatePlant(id: string) {
  return (plant: Partial<Plant>) => {
    plants[id] = { ...plants[id], ...plant };
  };
}

/**
 * UTILS
 */

export function generateNextId(collection: Record<string, any>) {
  return (Math.max(...Object.keys(collection).map(Number), 0) + 1).toString();
}
