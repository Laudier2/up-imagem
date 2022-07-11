//import Home from './components/index'

const lista = [
  {
    name: "Laudier",
    idade: 37,
    sexo: "Masculino"
  }
]

function App() {
  return (
    <>
      <div className="container">
        <h1 className="h1">Isso é um teste</h1>
        <hr />
        <h5 className="h5 mt-2">Dados do cliente</h5>
        {
          lista.map(e => (
            <ul key={e}>
              <li>{e.name}</li>
              <li>{e.idade}</li>
              <li>{e.sexo}</li>
            </ul>
          ))
        }
      </div>
    </>
  );
}

export default App;
