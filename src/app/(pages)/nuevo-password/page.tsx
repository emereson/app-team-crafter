import PsAi from "../../components/PsAi";
import FormCambiarPassword from "./components/FormCambiarPassword";

export default function NuevoPassword() {
  return (
    <main className="w-screen min-h-screen  h-full  background-login ">
      <div className="w-full min-h-screen h-full  max-w-[1440px] m-auto flex  p-12 overflow-hidden">
        <PsAi />
        <FormCambiarPassword />
      </div>
    </main>
  );
}
