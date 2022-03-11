import data from '../data.json';
import create from 'zustand';
import { generateNextId, Plant, Plants } from './_none';

const useStore = create<{
  plants: Plants;
  addPlant: (id: string, plant: Plant) => void;
  deletePlant: (id: string) => void;
  updatePlant: (id: string, plant: Partial<Plant>) => void;
}>((set) => ({
  plants: data,
  addPlant: (id, plant) =>
    set((state) => ({ plants: { ...state.plants, [id]: plant } })),
  deletePlant: (id: string) =>
    set((state) => {
      const plants = { ...state.plants };
      delete plants[id];
      return { plants };
    }),
  updatePlant: (id: string, plant: Partial<Plant>) =>
    set((state) => {
      const plants = { ...state.plants };
      plants[id] = { ...plants[id], ...plant };
      return { plants };
    }),
}));

/*
 * CONTRACT BETWEEN STORE AND COMPONENT - DO NOT MODIFY THE PARAMETERS OR RETURN SHAPE
 */

export function useFetchInitialData() {}

export function usePlants() {
  const plants = useStore((state) => state.plants);
  return plants;
}

export function usePlant(id: string) {
  const plant = useStore((state) => state.plants[id]);
  return plant;
}

export function useAddPlant() {
  const addPlant = useStore((state) => state.addPlant);
  const plants = usePlants()
  return (plant: Plant) => {
    const id = generateNextId(plants);
    addPlant(id, plant);
  };
}

export function useDeletePlant(id: string) {
  const deletePlant = useStore((state) => state.deletePlant);
  return () => deletePlant(id);
}

export function useUpdatePlant(id: string) {
  const updatePlant = useStore((state) => state.updatePlant);
  return (plant: Partial<Plant>) => {
    updatePlant(id, plant);
  };
}
