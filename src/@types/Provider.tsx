export interface Provider {
  id: string;
  name: string;
  avatarUrl: string;
  category: "Saúde" | "Beleza" | "Bem-estar";
  rating: number;
}
