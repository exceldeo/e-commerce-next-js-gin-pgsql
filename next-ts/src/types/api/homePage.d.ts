export interface HomePage {
  section_title: SectionTitle[];
  seoSetting: SeoSetting;
  sliderVisibilty: boolean;
  sliders: Slider[];
  sliderBannerOne: SliderBannerOne;
  sliderBannerTwo: SliderBannerTwo;
  serviceVisibilty: boolean;
  services: Service[];
  homepage_categories: HomepageCategory[];
  popularCategorySidebarBanner: string;
  popularCategoryVisibilty: boolean;
  popularCategories: PopularCategory[];
  popularCategoryProducts: PopularCategoryProduct[];
  brandVisibility: boolean;
  brands: Brand[];
  flashSale: FlashSale;
  flashSaleSidebarBanner: FlashSaleSidebarBanner;
  topRatedVisibility: boolean;
  topRatedProducts: TopRatedProduct[];
  sellerVisibility: boolean;
  sellers: Seller[];
  twoColumnBannerOne: TwoColumnBannerOne;
  twoColumnBannerTwo: TwoColumnBannerTwo;
  featuredProductVisibility: boolean;
  featuredCategorySidebarBanner: string;
  featuredCategories: FeaturedCategory[];
  featuredCategoryProducts: FeaturedCategoryProduct[];
  singleBannerOne: SingleBannerOne;
  newArrivalProductVisibility: boolean;
  newArrivalProducts: NewArrivalProduct[];
  bestProductVisibility: boolean;
  singleBannerTwo: SingleBannerTwo;
  bestProducts: BestProduct[];
  subscriptionBanner: SubscriptionBanner;
}

export interface SectionTitle {
  key: string;
  default: string;
  custom: string;
}

export interface SeoSetting {
  id: number;
  page_name: string;
  seo_title: string;
  seo_description: string;
  created_at: any;
  updated_at: string;
}

export interface Slider {
  id: number;
  badge: string;
  title_one: string;
  title_two: string;
  image: string | null;
  status: number;
  serial: number;
  slider_location: any;
  product_slug: string;
  created_at: string;
  updated_at: string;
}

export interface SliderBannerOne {
  id: number;
  product_slug: string;
  image: string;
  banner_location: string;
  title_one: string;
  title_two: string;
  badge: string;
  status: number;
}

export interface SliderBannerTwo {
  id: number;
  product_slug: string;
  image: string;
  banner_location: string;
  title_one: string;
  title_two: string;
  badge: string;
  status: number;
}

export interface Service {
  id: number;
  title: string;
  icon: string;
  description: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface HomepageCategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
  image?: string | null;
}

export interface PopularCategory {
  id: number;
  category_id: number;
  created_at: string;
  updated_at: string;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  status: number;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface PopularCategoryProduct {
  id: number;
  name: string;
  short_name: string;
  slug: string;
  thumb_image: string;
  qty: number;
  sold_qty: number;
  price: number;
  offer_price: number | null;
  is_undefine: number;
  is_featured: number;
  new_product: number;
  is_top: number;
  is_best: number;
  category_id: number;
  sub_category_id: number;
  child_category_id: number;
  brand_id: number;
  averageRating: string;
  totalSold: any;
  active_variants: ActiveVariant[];
}

export interface ActiveVariant {
  id: number;
  name: string;
  product_id: number;
  active_variant_items: any[];
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface FlashSale {
  id: number;
  title: string;
  homepage_image: string;
  flashsale_page_image: string;
  end_time: string;
  offer: number;
  status: number;
  created_at: any;
  updated_at: string;
}

export interface FlashSaleSidebarBanner {
  id: number;
  play_store: any;
  image: string;
  banner_location: string;
  status: number;
  app_store: string;
}

export interface TopRatedProduct {
  id: number;
  name: string;
  short_name: string;
  slug: string;
  thumb_image: string;
  qty: number;
  sold_qty: number;
  price: number;
  offer_price: number;
  is_undefine: number;
  is_featured: number;
  new_product: number;
  is_top: number;
  is_best: number;
  category_id: number;
  sub_category_id: number;
  child_category_id: number;
  brand_id: number;
  averageRating: string;
  totalSold: string;
  active_variants: any[];
}

export interface Seller {
  id: number;
  logo: string;
  banner_image: string;
  shop_name: string;
  slug: string;
  averageRating: string;
}

export interface TwoColumnBannerOne {
  id: number;
  product_slug: string;
  image: string;
  banner_location: string;
  status: number;
  title_one: string;
  title_two: string;
  badge: string;
}

export interface TwoColumnBannerTwo {
  id: number;
  product_slug: string;
  image: string;
  banner_location: string;
  status: number;
  title_one: string;
  title_two: string;
  badge: string;
}

export interface FeaturedCategory {
  id: number;
  category_id: number;
  created_at: string;
  updated_at: string;
  category: Category2;
}

export interface Category2 {
  id: number;
  name: string;
  slug: string;
  icon: string;
  status: number;
  image: string | null;
  created_at: string;
  updated_at: string;
}

export interface FeaturedCategoryProduct {
  id: number;
  name: string;
  short_name: string;
  slug: string;
  thumb_image: string;
  qty: number;
  sold_qty: number;
  price: number;
  offer_price: number | null;
  is_undefine: number;
  is_featured: number;
  new_product: number;
  is_top: number;
  is_best: number;
  category_id: number;
  sub_category_id: number;
  child_category_id: number;
  brand_id: number;
  averageRating: string;
  totalSold: any;
  active_variants: any[];
}

export interface SingleBannerOne {
  id: number;
  product_slug: string;
  image: string;
  banner_location: string;
  status: number;
  title_one: string;
  title_two: string;
}

export interface NewArrivalProduct {
  id: number;
  name: string;
  short_name: string;
  slug: string;
  thumb_image: string;
  qty: number;
  sold_qty: number;
  price: number;
  offer_price: number | null;
  is_undefine: number;
  is_featured: number;
  new_product: number;
  is_top: number;
  is_best: number;
  category_id: number;
  sub_category_id: number;
  child_category_id: number;
  brand_id: number;
  averageRating: string;
  totalSold: any;
  active_variants: any[];
}

export interface SingleBannerTwo {
  id: number;
  product_slug: string;
  image: string;
  banner_location: string;
  status: number;
  title_one: string;
}

export interface BestProduct {
  id: number;
  name: string;
  short_name: string;
  slug: string;
  thumb_image: string;
  qty: number;
  sold_qty: number;
  price: number;
  offer_price: number | null;
  is_undefine: number;
  is_featured: number;
  new_product: number;
  is_top: number;
  is_best: number;
  category_id: number;
  sub_category_id: number;
  child_category_id: number;
  brand_id: number;
  averageRating: string;
  totalSold: any;
  active_variants: ActiveVariant2[];
}

export interface ActiveVariant2 {
  id: number;
  name: string;
  product_id: number;
  active_variant_items: any[];
}

export interface SubscriptionBanner {
  id: number;
  image: string;
  banner_location: string;
  header: string;
  title: string;
}
