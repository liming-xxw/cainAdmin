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
}
