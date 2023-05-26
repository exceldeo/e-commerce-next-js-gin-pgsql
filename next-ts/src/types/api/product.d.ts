export interface Product {
  id: string;
  slug: string;
  price: number;
  group_category: string;
  brand_id: string;
  vendor_id: VendorId;
  sku: string;
  title: string;
  description: string;
  unit_sold: any;
  listing_status: string;
  rating_avg: any;
  thumbnail: any;
  qty: number;
  weight: any;
  size: any;
  hazardous: any;
  condition: any;
  created_at: string;
}

export interface VendorId {}
