import { Suspense } from "react";
import PsAi from "../../components/PsAi";
import FormCambiarPassword from "./components/FormCambiarPassword";
import Loading from "@/app/components/Loading";

function NuevoPassword() {
  return (
    <main className="w-screen min-h-screen  h-full  background-login ">
      <div className="w-full min-h-screen h-full  max-w-[1440px] m-auto flex  p-12 overflow-hidden">
        <PsAi />
        <FormCambiarPassword />
      </div>
    </main>
  );
}

export default function NuevoPasswordPage() {
  return (
    <Suspense fallback={<Loading />}>
      <NuevoPassword />
    </Suspense>
  );
}
