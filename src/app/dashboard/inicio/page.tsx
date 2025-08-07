import BannerInicio from "./components/BannerInicio";
import ClasesRecientesInicio from "./components/ClasesRecientesInicio";
import DescuentoParati from "./components/DescuentosParaTi";
import RecursosMesInicio from "./components/RecursosMesInicio";

export default function Inicio() {
  return (
    <main className="w-full p-10">
      <BannerInicio />
      <ClasesRecientesInicio />
      <RecursosMesInicio />
      <DescuentoParati />
    </main>
  );
}
