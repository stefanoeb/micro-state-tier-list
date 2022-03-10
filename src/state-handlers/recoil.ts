import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import data from '../data.json';
import { generateNextId, Plant, Plants } from './_none';

const plantsState = atom<Plants>({
  key: 'plants',
  default: data,
});

/*
 * CONTRACT BETWEEN STORE AND COMPONENT - DO NOT MODIFY THE PARAMETERS OR RETURN SHAPE
 */
export function usePlants() {
  const plants = useRecoilValue(plantsState);
  return plants;
}

export function usePlant(id: string) {
  const plants = useRecoilValue(plantsState);
  return plants[id];
}

export function useAddPlant() {
  const plants = usePlants();
  const setPlants = useSetRecoilState(plantsState);
  return (plant: Plant) => {
    const id = generateNextId(plants);
    setPlants({ ...plants, [id]: plant });
  };
}

export function useDeletePlant(id: string) {
  const plants = usePlants();
  const setPlants = useSetRecoilState(plantsState);
  const plantsCopy = { ...plants }; // Need to make a copy here because the return of recoil is a read-only object
  return () => {
    delete plantsCopy[id];
    setPlants(plantsCopy);
  };
}

export function useUpdatePlant(id: string) {
  const plants = usePlants();
  const setPlants = useSetRecoilState(plantsState);
  const plantsCopy = { ...plants }; // Need to make a copy here because the return of recoil is a read-only object
  return (plant: Partial<Plant>) => {
    plantsCopy[id] = { ...plantsCopy[id], ...plant };
    setPlants(plantsCopy);
  };
}
