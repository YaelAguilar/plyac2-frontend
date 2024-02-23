import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center space-y-4 p-4 md:space-y-10 md:p-6">
      <div className="w-full max-w-sm space-y-2">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-extrabold">Gestión de Datos</h1>
          <p className="text-gray-500 dark:text-gray-400">Administra tus datos con facilidad</p>
        </div>
        <div className="space-y-4">
          <Link to="/login">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90 h-10 px-4 py-2 w-full">
              Iniciar sesión
            </button>
          </Link>
          <Link to="/register">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full">
              Registrarse
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
