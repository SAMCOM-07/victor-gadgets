export interface RepairService {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryLabel?: string;
  shortDescription: string;
  description: string;
  image: string;
  estimatedTime: string;
  startingPrice: number;
  features: string[];
  supportedBrands: string[];
  warranty: string;
  processSteps?: {
    step: number;
    title: string;
    description: string;
  }[];
}

