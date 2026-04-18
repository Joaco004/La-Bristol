export interface PlayerStats {
  kd: number;
  winrate: number;
  hoursPlayed: number;
  tournamentsPlayed: number;
}

export interface Player {
  id: string;
  nickname: string;
  realName: string;
  role: string;
  game: string;
  bio: string;
  traits: string[];
  stats: PlayerStats;
  image?: string;
  photo?: string;
  photoPosition?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SocialLinks {
  twitter?: string;
  instagram?: string;
  kick?: string;
  youtube?: string;
  discord?: string;
}

export interface TeamInfo {
  name: string;
  tagline: string;
  founded: number;
  description: string;
  games: string[];
  socials: SocialLinks;
}

export interface Achievement {
  label: string;
  value: string | number;
  icon: string;
}
