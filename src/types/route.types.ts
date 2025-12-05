export type RouteI = {
  label: string;
  title?: string;
  url: string;
  menu?: {
    mobile: boolean;
    desktop: boolean;
    header: boolean;
    footer: boolean;
    order?: number;
  };
  private: boolean;
  roles: string[];
};

export type RoutesI = {
  [route: string]: RouteI;
};
