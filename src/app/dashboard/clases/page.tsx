import ListaClases from "./components/ListaClases";
import TitleFilterClases from "./components/TitleFilterClases";

export default function Clases() {
  return (
    <main className="w-full p-10 py-8">
      <TitleFilterClases />
      <ListaClases />
    </main>
  );
}
