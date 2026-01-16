export interface Tour {
  _id: string;
  title: string;
  slug: string;
}

export interface ToursResponse {
  success: boolean;
  data: {
    tours: Tour[];
    total: number;
  };
}
