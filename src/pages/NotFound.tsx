import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  // Un SPA estático siempre responde 200, así que Google podría indexar esta
  // página de error. El meta robots evita que entre al índice.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <Layout>
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-32 text-center">
        <p className="font-heading text-6xl text-primary mb-4">404</p>
        <h1 className="font-heading text-3xl text-foreground mb-3">
          Esta página no existe
        </h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-md">
          Puede que el enlace esté roto o que la página se haya movido.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link to="/">Volver al inicio</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/ubicaciones">Ver nuestras sedes</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
