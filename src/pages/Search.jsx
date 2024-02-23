import { useState } from 'react';

function Search() {
  const [columna, setColumna] = useState('Clave_cliente');
  const [valor, setValor] = useState('');
  const [resultados, setResultados] = useState([]);

  const handleColumnaChange = (e) => {
    setColumna(e.target.value);
  };

  const handleValorChange = (e) => {
    setValor(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/buscar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ columna, valor }),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud al servidor.');
      }

      const data = await response.json();
      setResultados(data.resultados);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto my-10">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-medium mb-2 text-primary">Search</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="columna" className="text-sm font-medium block">
                Seleccione la columna:
              </label>
              <select
                name="columna"
                id="columna"
                className="w-full border py-2 px-3 rounded-md"
                value={columna}
                onChange={handleColumnaChange}
              >
                <option value="Clave_cliente">Clave_cliente</option>
                <option value="Nombre_Contacto">Nombre_Contacto</option>
                <option value="Correo">Correo</option>
                <option value="Teléfono_Contacto">Teléfono_Contacto</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="valor" className="text-sm font-medium block">
                Ingrese el valor a buscar:
              </label>
              <input
                type="text"
                name="valor"
                id="valor"
                className="w-full border py-2 px-3 rounded-md"
                value={valor}
                onChange={handleValorChange}
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-black text-white py-2 px-4 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:border-blue-300"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
        <div>
          {resultados.length > 0 && (
            <>
              <h2 className="text-lg font-medium mb-2 text-primary">Resultados:</h2>
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="py-2 px-4 text-left">Clave Cliente</th>
                    <th className="py-2 px-4 text-left">Nombre Contacto</th>
                    <th className="py-2 px-4 text-left">Correo</th>
                    <th className="py-2 px-4 text-left">Teléfono Contacto</th>
                  </tr>
                </thead>
                <tbody>
                  {resultados.map((resultado, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4">{resultado[0]}</td>
                      <td className="py-2 px-4">{resultado[1]}</td>
                      <td className="py-2 px-4">{resultado[2]}</td>
                      <td className="py-2 px-4">{resultado[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
