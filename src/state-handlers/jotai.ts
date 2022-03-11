import data from '../data.json';
import { atom, useAtom } from 'jotai';
import { generateNextId, Plant, Plants } from './_none';

const plantsAtom = atom<Plants>(data);

/*
 * CONTRACT BETWEEN STORE AND COMPONENT - DO NOT MODIFY THE PARAMETERS OR RETURN SHAPE
 */

export function useFetchInitialData() {}

export function usePlants() {
  const [plants] = useAtom(plantsAtom);
  return plants;
}

export function usePlant(id: string) {
  const [plants] = useAtom(plantsAtom);
  return plants[id];
}

export function useAddPlant() {
  const [, setPlants] = useAtom(plantsAtom);
  const plants = usePlants();
  return (plant: Plant) => {
    const id = generateNextId(plants);
    setPlants((state) => ({ ...state, [id]: plant }));
  };
}

export function useDeletePlant(id: string) {
  const [, setPlants] = useAtom(plantsAtom);
  const plants = usePlants();
  const oldPlants = { ...plants };
  return () => {
    delete oldPlants[id];
    setPlants(oldPlants);
  };
}

export function useUpdatePlant(id: string) {
  const [, setPlants] = useAtom(plantsAtom);
  return (plant: Partial<Plant>) => {
    setPlants((state) => ({ ...state, [id]: { ...state[id], ...plant } }));
  };
}