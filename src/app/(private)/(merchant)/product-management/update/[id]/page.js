import { notFound } from "next/navigation";
import { getProductById } from "@/api/product";
import ProductForm from "../../_components/form";
import BackButton from "@/app/component/BackButton";

const UpdateProductPage = async ({ params }) => {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <BackButton/>
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Edit product
        </h2>
        <ProductForm initialProduct={product} />
      </div>
    </section>
  )
}

export default UpdateProductPage
