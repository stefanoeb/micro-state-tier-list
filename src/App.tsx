import './App.css';
import React from 'react';
import {
  usePlants,
  usePlant,
  addPlant,
  updatePlant,
  deletePlant,
} from './state-handlers/_none';

function App() {
  const plants = usePlants();

  return (
    <div style={{ padding: 30 }}>
      <div>
        <h1>Plant directory</h1>
        <h3>Currently using: hookstate.ts</h3>
        <p>Open your console!</p>
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
          return <Item id={plantId} />;
        })}
      </div>
    </div>
  );
}

function Item(props: { id: string }) {
  const plant = usePlant(props.id);
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
}

function AddButton() {
  const [name, setName] = React.useState('');
  return (
    <div>
      <input
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
  return (
    <button
      type="button"
      onClick={() => {
        deletePlant(props.id);
      }}
    >
      Delete
    </button>
  );
}

function UpdateButton(props: { id: string; name: string }) {
  const [name, setName] = React.useState('');
  const [isEditing, setIsEditing] = React.useState(false);
  return (
    <div style={{marginBottom: 10}}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={name}
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              updatePlant(props.id, { name });
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
