import { Plan } from "@/interfaces/plan.interface";
import { patchMigrarSuscripcion } from "@/services/auth/suscripcion.service";
import { Suscripcion } from "@/stores/SuscripcionContext";
import { handleAxiosError } from "@/utils/errorHandler";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { toast } from "sonner";

interface Props {
  onOpenChange: (i: boolean) => void;
  isOpen: boolean;
  selectSuscripcion: Suscripcion;
  plan: Plan;
}

export default function ModalMigrarPlan({
  onOpenChange,
  isOpen,
  selectSuscripcion,
  plan,
}: Props) {
  const handleMigrarPlan = async () => {
    try {
      await patchMigrarSuscripcion(selectSuscripcion.subscriptionId, {
        planExternalId: plan.flow_plan_id,
      }),
        toast.success("✅ Plan migrado con éxito");
    } catch (err) {
      handleAxiosError(err);
    } finally {
      onOpenChange(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-[#8A8A8A] font-bold text-xl max-sm:text-xl">
              Confirmar membresía de plan
            </ModalHeader>
            <ModalBody>
              <p>
                ¿Estás seguro de que deseas migrar tu membresía al{" "}
                <strong className="text-[#FC68B9] ">{plan.nombre_plan}</strong>?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                className="bg-[#FC68B9]"
                color="primary"
                onPress={handleMigrarPlan}
              >
                Confirmar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
