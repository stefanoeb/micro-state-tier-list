import './App.css';
import React from 'react';
import * as none from './state-handlers/_none';
import * as recoil from './state-handlers/recoil';
import * as jotai from './state-handlers/jotai';
import * as zustand from './state-handlers/zustand';
import * as hookstate from './state-handlers/hookstate';
import * as redux from './state-handlers/redux-toolkit';

let store: any = none;
let storeName: string = 'Nothing';
switch (window.location.pathname) {
  case '/recoil':
    storeName = 'Recoil';
    store = recoil;
    break;
  case '/zustand':
    storeName = 'Zustand';
    store = zustand;
    break;
  case '/jotai':
    storeName = 'Jotai';
    store = jotai;
    break;
  case '/hookstate':
    storeName = 'Hookstate';
    store = hookstate;
    break;
  case '/redux':
    storeName = 'Redux';
    store = redux;
    break;
  default:
    break;
}

console.log(`[INFO] Using ${storeName}`);

function App() {
  const plants = store.usePlants();
  store.useFetchInitialData();
  return (
    <div style={{ padding: 30 }}>
      <div>
        <h1>Plant directory</h1>
        <p>Currently using {storeName} as the state manager</p>
        <AddButton />
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {Object.keys(plants).map((plantId) => {
          return <Item id={plantId} key={plantId} />;
        })}
      </div>
    </div>
  );
}

const Item = React.memo(function Item(props: { id: string }) {
  const plant = store.usePlant(props.id);
  return (
    <div
      style={{
        width: 200,
        height: 155,
        border: '1px solid black',
        borderRadius: 5,
        padding: 10,
        margin: 20,
      }}
    >
      <span>ID: {props.id}</span>
      <h3>{plant.name}</h3>
      <UpdateButton id={props.id} name={plant.name} />
      <DeleteButton id={props.id} />
    </div>
  );
});

function AddButton() {
  const [name, setName] = React.useState('');
  const addPlant = store.useAddPlant();
  return (
    <div>
      <input
        style={{ marginRight: 10 }}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          addPlant({ name });
          setName('');
        }}
      >
        Add new plant
      </button>
    </div>
  );
}

function DeleteButton(props: { id: string }) {
  const deletePlant = store.useDeletePlant(props.id);
  return (
    <button
      type="button"
      onClick={() => {
        deletePlant();
      }}
    >
      Delete
    </button>
  );
}
function UpdateButton(props: { id: string; name: string }) {
  const [name, setName] = React.useState(props.name);
  const [isEditing, setIsEditing] = React.useState(false);
  const updatePlant = store.useUpdatePlant(props.id);
  return (
    <div style={{ marginBottom: 10 }}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              updatePlant({ name });
              setIsEditing(false);
              setName('');
            }}
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setName('');
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          Update name
        </button>
      )}
    </div>
  );
}

export default App;
