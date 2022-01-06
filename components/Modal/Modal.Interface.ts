export interface ModalProps {
  id: string;
  closeModal: (...args: any) => void;
  firstName: string;
  lastName: string;
  avatar: string;
  enableUploadFunctionality: boolean;
}
