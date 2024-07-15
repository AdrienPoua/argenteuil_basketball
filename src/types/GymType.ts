export default interface GymType {
    id?: string;
    name: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
    img?: string; // Optional image property
    available: string[]; // Array of days the gym is available
  };
  