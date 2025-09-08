import { cancelarSuscripcion } from "@/services/auth/suscripcion.service";
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
}

export default function ModalCancelarSuscripcion({
  onOpenChange,
  isOpen,
  selectSuscripcion,
}: Props) {
  const handleMigrarPlan = async () => {
    try {
      await cancelarSuscripcion(selectSuscripcion.subscriptionId),
        toast.success("La membresía ha sido cancelada con éxito");
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
              Cancelar membresía
            </ModalHeader>
            <ModalBody>
              <p>¿Estás seguro de que deseas cancelar tu membresía</p>
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
