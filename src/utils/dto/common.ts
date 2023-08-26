export interface routers {
  path?: string;
  name?: string;
  icon?: string;
  component?: string;
  parent?: string;
  pageParent?: string;
  child?: routers[];
  isRouter?: boolean;
}
