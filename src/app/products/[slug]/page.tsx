interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold">Product Details: {slug}</h1>
      <p className="text-muted-foreground mt-2">Product detail placeholder.</p>
    </div>
  );
}

