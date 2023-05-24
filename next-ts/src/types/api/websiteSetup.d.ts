export interface WebsiteSetup {
  language: Language;
  setting: Setting;
  maintainance: Maintainance;
  flashSaleActive: boolean;
  flashSale: FlashSale;
  flashSaleProducts: FlashSaleProduct[];
  announcementModal: AnnouncementModal;
  productCategories: ProductCategory[];
  megaMenuCategories: MegaMenuCategory[];
  megaMenuBanner: MegaMenuBanner;
  customPages: CustomPage[];
  googleAnalytic: GoogleAnalytic;
  facebookPixel: FacebookPixel;
  tawk_setting: TawkSetting;
  cookie_consent: CookieConsent;
  seo_setting: SeoSetting[];
  filter_price_range: number;
  footer_first_col: FooterFirstCol;
  footer_second_col: FooterSecondCol;
  footer_third_col: FooterThirdCol;
  footer: Footer;
  social_links: SocialLink[];
  image_content: ImageContent;
  pusher_info: PusherInfo;
}

export interface Language {
  'blogs details': string;
  'Search products': string;
  products: string;
  Product: string;
  'Somethings went wrong': string;
  'Become seller': string;
  Cart: string;
  Checkout: string;
  FAQ: string;
  'Forgot password': string;
  Login: string;
  Register: string;
  'Privacy Policy': string;
  'Product Compaire': string;
  Signup: string;
  'Term and Conditions': string;
  home: string;
  'About us': string;
  'Contact Us': string;
  'Customers Feedback': string;
  'My Latest News': string;
  'Shop Now': string;
  Showing: string;
  results: string;
  'View by': string;
  'Product categories': string;
  'Price Range': string;
  Price: string;
  Brands: string;
  Send: string;
  'Reset Password': string;
  OTP: string;
  'Email Address': string;
  Email: string;
  'New Password': string;
  'Confirm Password': string;
  Reset: string;
  'Please verify your account. If you didnt get OTP, please resend your OTP and verify': string;
  'Send OTP': string;
  'Login Successfully': string;
  'Invalid Credentials': string;
  'Log In': string;
  Password: string;
  'Remember Me': string;
  "Dont't have an account": string;
  'sign up free': string;
  dashboard: string;
  profile: string;
  'Your Dashboard': string;
  'Switch Dashboard': string;
  Dashboard: string;
  'Personal Info': string;
  Order: string;
  Wishlist: string;
  Address: string;
  Reviews: string;
  'Change Password': string;
  Logout: string;
  'Add New Address': string;
  'First Name': string;
  'Demo Name': string;
  'Last Name': string;
  'Phone Number': string;
  phone: string;
  Country: string;
  Select: string;
  State: string;
  City: string;
  'your address here': string;
  Office: string;
  'Save Address': string;
  Name: string;
  Hello: string;
  'Welcome to your Profile': string;
  'New Orders': string;
  'Delivery Completed': string;
  'Total Orders': string;
  'Personal Information': string;
  Date: string;
  Amount: string;
  Action: string;
  'View Details': string;
  'Old Password': string;
  'Re-enter Password': string;
  'Update Password': string;
  Cancel: string;
  'Read Only': string;
  'Update Profile': string;
  'Profile of at least Size': string;
  'Max 5mb': string;
  'Pending review': string;
  'Clear wishlist': string;
  'Clean Wishlist': string;
  'View Cards': string;
  'Verify You': string;
  Verify: string;
  'Create Account': string;
  'in ecoShop': string;
  'Already have an Account': string;
  'Congratulation Your seller request successfully delivered': string;
  'Please Login First': string;
  'Seller Information': string;
  'Fill the form below or write us We will help you as soon as possible': string;
  'Shop Information': string;
  'Shop Name': string;
  'Your address Here': string;
  'I agree all terms and condition in ecoShop': string;
  'Create Seller Account': string;
  'Update Logo': string;
  'Gifs work too': string;
  'Update Cover': string;
  'Cover of at least Size': string;
  blogs: string;
  'By Admin': string;
  Search: string;
  'Latest Post': string;
  Categories: string;
  'Our Newsletter': string;
  'Follow our newsletter to stay updated about us': string;
  Subscribe: string;
  Message: string;
  'Submit Review': string;
  Comments: string;
  'Blog Not Found': string;
  'Remove from Cart': string;
  'No items found': string;
  'View Cart': string;
  'Checkout Now': string;
  'Get Return within': string;
  cart: string;
  'Clear Cart': string;
  'Update Cart': string;
  'Proceed to Checkout': string;
  checkout: string;
  Addresses: string;
  'Billing Address': string;
  'Shipping Address': string;
  'Add New': string;
  Selected: string;
  'Add new address': string;
  'Apply Coupon': string;
  'Order Summary': string;
  total: string;
  SUBTOTAL: string;
  Shipping: string;
  'Cash On Delivery': string;
  'Transaction Information': string;
  'Place Order Now': string;
  'Get In Touch': string;
  'Send Now': string;
  'Back to Shop': string;
  "Empty! You don't Cart any Products": string;
  "Empty! You don't Wishlist any Products": string;
  'Frequently asked questions': string;
  'Have Any Qustion': string;
  Days: string;
  Hours: string;
  Minutes: string;
  Seconds: string;
  "Sorry! We cant't Find that page!": string;
  'Add To Cart': string;
  'Item added': string;
  'Go To Cart': string;
  'Select One': string;
  'Get the Coupon': string;
  'View More': string;
  OFF: string;
  'Main Menu': string;
  About: string;
  Contact: string;
  'Delivered on': string;
  'Your order is declined': string;
  Pending: string;
  Progress: string;
  Delivered: string;
  'Order ID': string;
  Type: string;
  'Print PDF': string;
  quantity: string;
  review: string;
  'Shipping Cost': string;
  'Write Your Reviews': string;
  'Contact Info': string;
  Hi: string;
  Settings: string;
  'Sign Out': string;
  'All Categories': string;
  Shop: string;
  Sellers: string;
  Pages: string;
  'Seller Login': string;
  'Seller Register': string;
  Account: string;
  'Track Order': string;
  Support: string;
  compare: string;
  'Product Comparison': string;
  'Select products to see the differences and similarities between them': string;
  'Star Rating': string;
  Availability: string;
  'In Stock': string;
  'Out of Stock': string;
  Specification: string;
  'Your Compare List Is Empty': string;
  'Store Open': string;
  Description: string;
  'Seller Info': string;
  Introduction: string;
  'Related Product': string;
  'Report Products': string;
  'Enter Report Ttile': string;
  'Enter Report Note': string;
  'Submit Report': string;
  'Report This Item': string;
  'Share This': string;
  'View Shop': string;
  'Track Your Order': string;
  'Enter your order tracking number and your secret id': string;
  'Track Now': string;
  wishlist: string;
  'Update address': string;
  'Our blogs': string;
  'Show more': string;
  'leave a comment': string;
  'Write something': string;
  'Your cart': string;
  'Something missing': string;
  'Select your payment system': string;
  'Discount code': string;
  Apply: string;
  'Bank Payment': string;
  Subject: string;
  'Seller terms and conditions': string;
  Completed: string;
  Declined: string;
  'Delivered On': string;
  'Total Paid': string;
  of: string;
  'Products Available': string;
  'Products not Available': string;
  SKU: string;
  'order number': string;
  'order tracking nubmer': string;
  'Invalid data': string;
  'Delivery Date': string;
  'Accept All': string;
  Deny: string;
  'Read more': string;
  category: string;
  'Coupon Applied': string;
  'Discount coupon': string;
  'Your total price not able to apply coupon': string;
  'Please Select Your Payment Method': string;
  'Please Select Shipping Rule': string;
  'Enabled Location': string;
  'Not Now': string;
  'Choose Product': string;
  'Make Your Payment': string;
  'Fast Delivery': string;
  'on boarding subtitle': string;
  next: string;
  'see all': string;
  'See all Reviews': string;
  'Confirm Email': string;
  "Password dosen't match": string;
  'I Consent to the Privacy Policy': string;
  'Continue as Guest': string;
  'username or email': string;
  'Sale Over': string;
  'Yes Exit': string;
  'You Want to Exit from Application': string;
  'Are You Sure': string;
  'Total Price': string;
  'Product Details': string;
  'Select Location': string;
  'SignIn with Social': string;
  'Mobile,Electronics': string;
  Tags: string;
  'Beer, Former': string;
  'Please wait a moment': string;
  'Item Added Successfully': string;
  'Items in your cart': string;
  'Item in your cart': string;
  'Remove Successfully': string;
  'Order Amount': string;
  'Total Amount': string;
  'Something went wrong': string;
  Total: string;
  'Please agree terms condition': string;
  'Please add new location or press exiting location': string;
  'Delivery Location': string;
  Add: string;
  'No Address': string;
  Loading: string;
  'Bill Details': string;
  'promo code': string;
  'Place Order': string;
  fees: string;
  'free shipping': string;
  'home delivery free shipping': string;
  'shipping rules based on qty 6 10': string;
  'home delivery': string;
  'Pay With Stripe': string;
  'Pay With Paypal': string;
  'Pay With Razorpay': string;
  'Pay with Flutter-wave': string;
  'Pay With Mollie': string;
  'Pay With InstaMojo': string;
  'Pay With PayStack': string;
  'Pay with Ssl-commerce': string;
  'Please add new location or select exiting location': string;
  'Please enter bank information': string;
  'Sign-In please': string;
  'Order No': string;
  'Tracking number': string;
  Active: string;
  'Single Order': string;
  'What is your Rate': string;
  'Please write something': string;
  Other: string;
  Offers: string;
  'Items in Your Cart': string;
  'swipe right to delete any item': string;
  'My Offers': string;
  filter: string;
  Size: string;
  'Find Product': string;
  'All Popular Product': string;
  'wishlist added successfully': string;
  'app info': string;
  'Edit Profile': string;
  'Your zip-code': string;
  'Your address': string;
  'Send Us A Message': string;
  'Enter valid email': string;
  'Verification Code': string;
  'Enter Code': string;
  'I dont received a code': string;
  Resend: string;
  ecoshop: string;
  'Buy groceries and feed yourself': string;
  Version: string;
  'Developed By': string;
  Dismiss: string;
  Confirmation: string;
  'you wish to delete this address': string;
  delete: string;
  ZipCode: string;
  'field required': string;
  'Enter valid': string;
  'No Category': string;
  'All Seller': string;
  'New Arrival': string;
  'Best Selling': string;
  'Discount Products': string;
  'Highest Price': string;
  'Low Price': string;
  'Free Delivery': string;
  California: string;
  Victoria: string;
  Toronto: string;
  'Date in required': string;
  'MOBILE APP VERSION': string;
  'Get Our': string;
  'Mobile App': string;
  "It's Make easy for you life!": string;
  Features: string;
  'Reports Headline here': string;
  'Type Here': string;
  'Product from Shop': string;
  'Send Product': string;
  'No Message yet!': string;
  'Its seems, No Message in your inbox': string;
  Messages: string;
  'Email or Phone': string;
  'Payment Declined': string;
  'Oh snap The Payment Information was declined': string;
  'Delete Account': string;
  'Once you delete your account, there is no going back. Please be certain.': string;
  'Are You Sure?': string;
  'Do you really want to delete these account? This process cannot be undone.': string;
  cancel: string;
  Delete: string;
  'Already in Cart': string;
  'Are you sure, you want to Logout': string;
  'Do you want to Delete account': string;
}

export interface Setting {
  logo: string;
  favicon: string;
  enable_user_register: number;
  phone_number_required: number;
  default_phone_code: string;
  enable_multivendor: number;
  text_direction: string;
  timezone: string;
  topbar_phone: string;
  topbar_email: string;
  currency_icon: string;
  currency_name: string;
  show_product_progressbar: number;
  theme_one: string;
  theme_two: string;
  seller_condition: string;
}

export interface Maintainance {
  id: number;
  status: number;
  image: string;
  description: string;
  created_at: any;
  updated_at: string;
}

export interface FlashSale {
  status: number;
  offer: number;
  end_time: string;
}

export interface FlashSaleProduct {
  product_id: number;
}

export interface AnnouncementModal {
  id: number;
  status: number;
  title: string;
  description: string;
  image: string;
  expired_date: number;
  created_at: any;
  updated_at: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
  active_sub_categories: ActiveSubCategory[];
}

export interface ActiveSubCategory {
  id: number;
  name: string;
  slug: string;
  category_id: number;
  active_child_categories: ActiveChildCategory[];
}

export interface ActiveChildCategory {
  id: number;
  name: string;
  slug: string;
  sub_category_id: number;
}

export interface MegaMenuCategory {
  id: number;
  category_id: number;
  status: number;
  serial: number;
  created_at: string;
  updated_at: string;
  category: Category;
  sub_categories: SubCategory[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  status: number;
  image: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubCategory {
  id: number;
  mega_menu_category_id: number;
  sub_category_id: number;
  status: number;
  serial: number;
  created_at: string;
  updated_at: string;
  sub_category: SubCategory2;
}

export interface SubCategory2 {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface MegaMenuBanner {
  id: number;
  header: any;
  title: any;
  link: string;
  image: string;
  banner_location: string;
  after_product_qty: number;
  status: number;
  created_at: any;
  updated_at: string;
  title_one: string;
  title_two: string;
  badge: any;
  product_slug: string;
}

export interface CustomPage {
  id: number;
  page_name: string;
  slug: string;
  description: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface GoogleAnalytic {
  id: number;
  analytic_id: string;
  status: number;
  created_at: any;
  updated_at: string;
}

export interface FacebookPixel {
  id: number;
  status: number;
  app_id: string;
  created_at: any;
  updated_at: string;
}

export interface TawkSetting {
  id: number;
  chat_link: string;
  widget_id: string;
  property_id: string;
  status: number;
  created_at: any;
  updated_at: string;
}

export interface CookieConsent {
  id: number;
  status: number;
  border: string;
  corners: string;
  background_color: string;
  text_color: string;
  border_color: string;
  btn_bg_color: string;
  btn_text_color: string;
  message: string;
  link_text: string;
  btn_text: string;
  link: any;
  created_at: any;
  updated_at: string;
}

export interface SeoSetting {
  id: number;
  page_name: string;
  seo_title: string;
  seo_description: string;
  created_at: any;
  updated_at: string;
}

export interface FooterFirstCol {
  col_links: ColLink[];
  columnTitle: string;
}

export interface ColLink {
  id: number;
  column: string;
  link: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface FooterSecondCol {
  col_links: ColLink2[];
  columnTitle: string;
}

export interface ColLink2 {
  id: number;
  column: string;
  link: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface FooterThirdCol {
  col_links: ColLink3[];
  columnTitle: string;
}

export interface ColLink3 {
  id: number;
  column: string;
  link: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface Footer {
  id: number;
  about_us: string;
  phone: string;
  email: string;
  address: string;
  first_column: string;
  second_column: string;
  third_column: string;
  copyright: string;
  payment_image: string;
  created_at: any;
  updated_at: string;
}

export interface SocialLink {
  id: number;
  link: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

export interface ImageContent {
  empty_cart: string;
  empty_wishlist: string;
  change_password_image: string;
  become_seller_avatar: string;
  become_seller_banner: string;
  login_image: string;
  error_page: string;
}

export interface PusherInfo {
  id: number;
  app_id: string;
  app_key: string;
  app_secret: string;
  app_cluster: string;
  created_at: any;
  updated_at: string;
}
