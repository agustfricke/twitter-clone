// THIS IS HOW YOU DO NESTED ARRAYS BITCH !!

export default function App() {
  const people = [
    {id: 1, name: 'Alice', pets: ['dog', 'cat']},
    {id: 2, name: 'Bob', pets: ['turtle', 'rabbit']},
    {id: 3, name: 'Carl', pets: ['hamster', 'parrot']},
  ];

  return (
    <div>
      {people.map((person, index) => {
        return (
          <div key={index}>
            <h2>Name: {person.name}</h2>

            {person.pets.map((pet, index) => {
              return (
                <div key={index}>
                  <h2>Pet: {pet}</h2>
                </div>
              );
            })}

            <hr />
          </div>
        );
      })}
    </div>
  );
}
