import { useEffect } from 'react';
import {
  atom,
  atomFamily,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import data from '../data.json';
import { generateNextId, Plant, Plants } from './_none';

const plantsState = atomFamily<Plant, string>({
  key: 'plants',
  default: { name: 'default??' },
});

const plantIdsState = atom<string[]>({
  key: 'plantIds',
  default: [],
});

/*
 * CONTRACT BETWEEN STORE AND COMPONENT - DO NOT MODIFY THE PARAMETERS OR RETURN SHAPE
 */

export function useFetchInitialData() {
  const setInitialPlants = useRecoilCallback(
    ({ set }) =>
      (plants: Plants) => {
        Object.keys(plants).forEach((id) => {
          set(plantsState(id), plants[id]);
        });
      },
    []
  );

  const setPlantIds = useSetRecoilState(plantIdsState);
  useEffect(() => {
    setInitialPlants(data);
    setPlantIds(Object.keys(data));
  }, []);
}

export function usePlants() {
  const plantIds = useRecoilValue(plantIdsState);
  return plantIds.reduce((acc, id) => {
    return {
      ...acc,
      [id]: undefined,
    };
  }, {});
}

export function usePlant(id: string) {
  const plant = useRecoilValue(plantsState(id));
  return plant;
}

export function useAddPlant() {
  const plants = usePlants();
  const id = generateNextId(plants);
  const setPlant = useSetRecoilState(plantsState(id));
  const [plantIds, setPlantIds] = useRecoilState(plantIdsState);
  return (plant: Plant) => {
    setPlant(plant as any);
    setPlantIds([...plantIds, id]);
  };
}

export function useDeletePlant(id: string) {
  const deletePlant = useResetRecoilState(plantsState(id));
  const [plantIds, setPlantIds] = useRecoilState(plantIdsState);
  return () => {
    deletePlant();
    setPlantIds(plantIds.filter((plantId) => plantId !== id));
  };
}

export function useUpdatePlant(id: string) {
  const oldPlant = usePlant(id);
  const setPlant = useSetRecoilState(plantsState(id));
  return (plant: Partial<Plant>) => {
    setPlant({ ...oldPlant, ...plant });
  };
}
