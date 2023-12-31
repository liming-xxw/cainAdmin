export interface routers {
  path?: string;
  name?: string;
  title?: string;
  icon?: string;
  component?: string;
  parent?: string;
  pageParent?: string;
  child?: routers[];
  isRouter?: boolean;
  meta?: { title: string };
}

export interface TabsDto {
  name: string;
  path: string;
}
