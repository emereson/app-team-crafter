import PsAi from "../../components/PsAi";
import FormIniciarSesion from "./components/FormIniciarSesion";

export default function IniciarSesion() {
  return (
    <main className="w-screen min-h-screen  h-full  background-login ">
      <div className="w-full min-h-screen h-full  max-w-[1440px] m-auto flex  p-12 overflow-hidden">
        <PsAi />
        <FormIniciarSesion />
      </div>
    </main>
  );
}
