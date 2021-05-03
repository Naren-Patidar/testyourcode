export interface RecentDocument {
  id: string;
  docName: string;
  docPath: string;
}

export interface DocumentToAdd {
  docName?: string;
  docPath?: string;
  title?: string;
}
