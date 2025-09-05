"use client"; // Agrega esta directiva si estás usando el App Router de Next.js

import React, { useEffect } from "react";

// Se puede usar 'any' porque la librería no tiene tipos definidos.
declare const Flow: any;

interface FlowSubscribeProps {
  token: string;
}

const FlowSubscribe: React.FC<FlowSubscribeProps> = ({ token }) => {
  useEffect(() => {
    // Carga el script de Flow.cl dinámicamente
    const script = document.createElement("script");
    script.src =
      "https://sandbox.flow.cl/app/elements/flow-1.1.0.min.js?20241202";
    script.async = true;
    script.onload = () => {
      // Una vez que el script se ha cargado, inicializa Flow
      if (typeof Flow !== "undefined") {
        const flow = Flow();
        const elements = flow.elements();

        const subscribe = elements.create("subscribe", {
          style: {
            backgroundColor: "#f8f9fa",
          },
        });

        subscribe.mount("#subscribe-container", token);

        flow
          .handleCardSubscribed(subscribe)
          .then((data: any) => {
            console.log("Pago procesado correctamente:", data);

            setTimeout(() => {
              const form = document.getElementById(
                "formSubscribe"
              ) as HTMLFormElement;
              if (form) {
                console.log("Enviando formulario...");
                form.submit();
              }
            }, 3000);
          })
          .catch((error: any) => {
            console.error("Error en el pago:", error);
          });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Limpia el script al desmontar el componente
      document.body.removeChild(script);
    };
  }, [token]); // El efecto se ejecuta cuando el token cambia

  return (
    <form id="formSubscribe" action="/" method="POST">
      <input type="hidden" id="token" name="token" value={token} />
      <div id="subscribe-container" style={{ height: "250px" }}></div>
    </form>
  );
};

export default FlowSubscribe;
