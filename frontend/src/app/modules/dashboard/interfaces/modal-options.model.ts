export interface ModalOptions {
  title?: string;
  body?: Array<string | ModalBodyObject>;
  primary?: string;
  secondary?: string;
}

export interface ModalBodyObject {
  key: string;
  value: string;
  options: {
    bold: boolean;
  };
}
