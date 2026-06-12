import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductById, getRelatedProducts } from '@/lib/product-api';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { ProductImages } from '@/components/product-images';
import { ProductInfo } from '@/components/product-info';
import { Metadata } from 'next';

interface ProductPageProps {
  params: {
    id: string;
  };
}

// Generate metadata for Open Graph
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const productId = params.id;

  // Validate product ID
  if (!productId || isNaN(Number(productId))) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  try {
    // Fetch product data
    const product = await getProductById(productId);
    
    if (!product) {
      return {
        title: 'Product Not Found',
        description: 'The requested product could not be found.',
      };
    }

    // Open Graph metadata
    return {
      title: product.name,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: [
          {
            url: product.images[0] || '/placeholder-product.png',
            width: 800,
            height: 600,
            alt: product.name,
          },
        ],
        type: 'website',
        siteName: 'Your Site Name',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: product.description,
        images: [product.images[0] || '/placeholder-product.png'],
      },
    };
  } catch (error) {
    console.error('Error fetching product for metadata:', error);
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // ... rest of your existing code ...
}

// Generate static params for all products
export async function generateStaticParams() {
  try {
    const products = await getAllProducts(); // Assuming you have this function
    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
