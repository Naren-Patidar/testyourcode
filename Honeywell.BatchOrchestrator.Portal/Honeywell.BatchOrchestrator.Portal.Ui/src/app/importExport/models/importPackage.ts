export interface ImportPackage {
  lockId: string;
  fileName: string;
  fileExtension: string;
  data: string | ArrayBuffer | null;
  encryptionKey: string;
}
