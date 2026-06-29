export interface Branch {
  id: string;
  name: string;
  address?: string;
  hours?: string;
  phone?: string;
  facebook: string;
}

export interface Region {
  id: string;
  name: string;
  branches: Branch[];
}

export const REGIONS: Region[] = [
  {
    id: 'pampanga',
    name: 'Pampanga',
    branches: [
      {
        id: 'angeles-flagship',
        name: "Hola Flagship Store",
        address: 'Don Juan Nepomuceno Ave., Angeles City, Pampanga (in front of Rockwell)',
        hours: 'Open daily 7am – 11pm',
        phone: '0919 949 3041',
        facebook: 'https://www.facebook.com/TheCafeHola/',
      },
      {
        id: 'sm-clark',
        name: 'Hola SM Clark',
        address: 'In front of Jollibee, SM Clark',
        hours: 'Open daily 10am – 9pm',
        facebook: 'https://www.facebook.com/HOLAsmclark',
      },
      {
        id: 'sm-pampanga',
        name: 'Hola SM Pampanga',
        facebook: 'https://www.facebook.com/Hola-SM-City-Pampanga-101043169313455/',
      },
      {
        id: 'san-fernando',
        name: 'Hola San Fernando Downtown',
        facebook: 'https://www.facebook.com/profile.php?id=100088218548174',
      },
      {
        id: 'guagua',
        name: 'Hola Guagua',
        address: 'Guagua, Pampanga',
        facebook: 'https://www.facebook.com/profile.php?id=100094043894116',
      },
    ],
  },
  {
    id: 'bulacan',
    name: 'Bulacan',
    branches: [
      {
        id: 'sm-baliwag',
        name: 'Hola SM Baliwag',
        facebook: 'https://www.facebook.com/HOLAsmcitybaliwag',
      },
      {
        id: 'sm-marilao',
        name: 'Hola SM Marilao',
        facebook: 'https://www.facebook.com/profile.php?id=100093269094365',
      },
    ],
  },
  {
    id: 'metro-manila',
    name: 'Metro Manila',
    branches: [
      {
        id: 'edsa-shangrila',
        name: 'Hola EDSA Shangri-La',
        address: 'EDSA Shangri-La @ 2, Mandaluyong',
        facebook: 'https://www.facebook.com/profile.php?id=100084127605450',
      },
      {
        id: 'sm-fairview',
        name: 'Hola SM City Fairview',
        facebook: 'https://www.facebook.com/share/1J82hNVDid/',
      },
      {
        id: 'sm-south-mall',
        name: 'Hola SM South Mall',
        facebook: 'https://www.facebook.com/profile.php?id=100095268370349',
      },
      {
        id: 'sm-grand-central',
        name: 'Hola SM Grand Central',
        address: 'SM Grand Central, Caloocan',
        facebook: 'https://www.facebook.com/HOLAGrandCentral',
      },
      {
        id: 'ayala-feliz',
        name: 'Hola Ayala Malls Feliz',
        address: '3rd Level, in front of CCF Church',
        facebook: 'https://www.facebook.com/share/18GkS1B23y/',
      },
    ],
  },
  {
    id: 'rizal',
    name: 'Rizal',
    branches: [
      {
        id: 'antipolo',
        name: 'Hola Antipolo',
        address: 'Antipolo, Rizal',
        facebook: 'https://www.facebook.com/HolaAntipolo',
      },
    ],
  },
  {
    id: 'central-luzon',
    name: 'Central Luzon',
    branches: [
      {
        id: 'olongapo',
        name: 'Hola Olongapo City',
        facebook: 'https://www.facebook.com/profile.php?id=61554692871849',
      },
      {
        id: 'cabanatuan',
        name: 'Hola Cabanatuan & San Leonardo',
        address: 'Kapt. Pepe Subd & 4L Gas Station, Nueva Ecija',
        facebook: 'https://www.facebook.com/CafeHolaNE/',
      },
      {
        id: 'sm-tarlac',
        name: 'Hola SM Tarlac',
        facebook: 'https://www.facebook.com/profile.php?id=100086601128908',
      },
      {
        id: 'concepcion-tarlac',
        name: 'Hola Concepcion',
        address: 'Concepcion, Tarlac',
        facebook: 'https://www.facebook.com/share/1B9EASNaPD/',
      },
    ],
  },
  {
    id: 'batangas',
    name: 'Batangas',
    branches: [
      {
        id: 'sm-sto-tomas',
        name: 'Hola SM Sto. Tomas',
        address: 'In front of SM Department Store, Sto. Tomas, Batangas',
        facebook: 'https://www.facebook.com/share/18Kw3gQmHU/',
      },
    ],
  },
  {
    id: 'bataan',
    name: 'Bataan',
    branches: [
      {
        id: 'sm-bataan',
        name: 'Hola SM Bataan',
        address: 'Ground Level, in front of Jollibee',
        facebook: 'https://www.facebook.com/share/1EeBNHhWwz/',
      },
    ],
  },
];

export const BRANCH_COUNT = REGIONS.reduce((n, r) => n + r.branches.length, 0);
