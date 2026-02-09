export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at?: string;
  status?: string;
  thumbnail?: string;
}

export interface CosmicFile {
  url: string;
  imgix_url: string;
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
  };
}

export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name: string;
    bio?: string;
    profile_photo?: CosmicFile;
    social_link?: string;
  };
}

export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    content: string;
    featured_image?: CosmicFile;
    excerpt?: string;
    author?: Author;
    category?: Category;
  };
}