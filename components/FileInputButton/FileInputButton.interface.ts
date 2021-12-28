export interface FileInputButtonProps {
  acceptedFileTypes?: string;
  allowMultipleFiles?: boolean;
  label: string;
  onChange: (uploadedImages: any) => void;
  uploadFileName: string;
}
