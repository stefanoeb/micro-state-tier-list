import { useLocalObservable } from 'mobx-react-lite';
import React from 'react';
import data from '../data.json';
import { generateNextId, Plant, Plants } from './_none';

interface MobxStore {
  plants: Plants;
  addPlant(id: string, plant: Plant): void;
  removePlant(id: string): void;
  updatePlant(id: string, plant: Partial<Plant>): void;
}

function createPlantsStore(): MobxStore {
  return {
    plants: data,
    addPlant(id: string, plant: Plant) {
      this.plants[id] = plant;
    },
    removePlant(id: string) {
      delete this.plants[id];
    },
    updatePlant(id: string, plant: Partial<Plant>) {
      this.plants[id] = { ...this.plants[id], ...plant };
    },
  };
}

const PlantsContext = React.createContext<MobxStore | null>(null);

export function PlantsProviderMobx({
  children,
}: {
  children: React.ReactElement;
}) {
  const plantsStore = useLocalObservable(createPlantsStore);
  return (
    <PlantsContext.Provider value={plantsStore}>
      {children}
    </PlantsContext.Provider>
  );
}

function usePlantsStore() {
  return React.useContext(PlantsContext);
}

/*
 * CONTRACT BETWEEN STORE AND COMPONENT - DO NOT MODIFY THE PARAMETERS OR RETURN SHAPE
 */

export function useFetchInitialData() {}

export function usePlants() {
  const plants = usePlantsStore()?.plants;
  return plants;
}

export function usePlant(id: string) {
  const plants = usePlantsStore()?.plants;
  return plants?.[id];
}

export function useAddPlant() {
  const store = usePlantsStore();
  return (plant: Plant) => {
    const id = generateNextId(store?.plants || {});
    store?.addPlant?.(id, plant);
  };
}

export function useDeletePlant(id: string) {
  const store = usePlantsStore();
  return () => {
    store?.removePlant?.(id);
  };
}

export function useUpdatePlant(id: string) {
  const store = usePlantsStore();
  return (plant: Partial<Plant>) => {
    store?.updatePlant?.(id, plant);
  };
}
