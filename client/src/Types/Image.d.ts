export interface onImageUploadProps {
  onImagesUpload: (file: File[]) => Promise<void>;
  inputRef?: React.RefObject<HTMLInputElement>;
}
