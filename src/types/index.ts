export interface Tour {
  title: string;
  location: string;
  date: string;
  duration: string;
  transport: string;
  price: string;
  badge?: string;
  specialPrice?: string;
  originalPrice?: string;
  airline?: string;
  viewDetails: string;
}

export interface Destination {
  name: string;
  image?: string;
}

export interface LocaleTexts {
  hero: {
    searchPlaceholder: string;
    searchButton: string;
  };
  specialTours: {
    title: string;
    tours: string[];
  };
  popularTours: {
    title: string;
    domestic: string;
    international: string;
    tours: {
      domestic: Tour[];
      international: Tour[];
    };
  };
  destinations: {
    title: string;
    description: string;
    tabs: {
      domestic: string;
      international: string;
    };
    regions: string[];
    places: Destination[];
  };
  footer: {
    awards: string[];
    email: string;
    services: {
      title: string;
      items: string[];
    };
    customerCare: {
      title: string;
      items: string[];
    };
    aboutUs: {
      title: string;
      items: string[];
    };
    policies: {
      title: string;
      items: string[];
    };
    company: {
      name: string;
      address: string;
      phone: string;
      businessLicense: string;
      tourLicense: string;
      representative: string;
      copyright: string;
      hotline: string;
      website: string;
    };
  };
}
