export interface SiteSettings {
  id: string;
  hotel_address: string;
  phone_number: string;
  email_address: string;
  map_coordinates: string;
  instagram_url?: string;
  facebook_url?: string;
  google_sheet_script_url?: string;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string;
  display_order: number;
}
