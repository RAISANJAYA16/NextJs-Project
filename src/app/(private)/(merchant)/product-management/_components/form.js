"use client";

import { addProduct, updateProduct } from "@/api/product";
import { uploadProductImages } from "@/api/images";
import useAuthStore from "@/stores/authStores";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { FaUpload } from "react-icons/fa";

const ProductForm = ({ initialProduct }) => {
  const [submitMessage, setSubmitMessage] = useState("");
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const isEditing = Boolean(initialProduct);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialProduct ?? { stock: 1 },
  });
  const [localImageUrls, setLocalImageUrls] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(
    () => () => {
      localImageUrls.forEach((url) => URL.revokeObjectURL(url));
    },
    [localImageUrls],
  );

  async function submitForm(data, event) {
    setSubmitMessage("");
    try {
      const productData = {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
      };
      const imageUrls = isEditing
        ? initialProduct?.imageUrls ?? []
        : selectedFiles.length
          ? await uploadProductImages(selectedFiles)
          : [];
      const productPayload = { ...productData, imageUrls };

      if (isEditing) {
        const id = initialProduct._id ?? initialProduct.id;
        await updateProduct(id, productPayload, token);
        router.push("/product-management");
        router.refresh();
      } else {
        await addProduct(productPayload, token);
        setSubmitMessage("Product added successfully.");
        reset();
        setSelectedFiles([]);
        setLocalImageUrls([]);
        event?.target?.reset?.();
      }
    } catch (error) {
      console.error(
        isEditing ? "Unable to update product:" : "Unable to add product:",
        error,
      );
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : isEditing
            ? "Unable to update product."
            : "Unable to add product.",
      );
    }
  }

  return (
      <form onSubmit={handleSubmit(submitForm)}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
          <input type="text"  id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required 
          {...register("name")}
          />
        </div>
        <div className="w-full">
          <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
          <input type="text"  id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" required
          {...register("brand")}
          
          />
        </div>
        <div className="w-full">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
          <input type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Rs. 2999" required
          {...register("price", { valueAsNumber: true })}
          
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
           <div className="w-full">
         
          <input type="text" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product category" required 
          {...register("category")}
          
          />


        </div>
        </div>
        <div>
          <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock </label>
          <input type="number" id="stock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={1} required 
          defaultValue={1}
          {...register("stock", { valueAsNumber: true })}

          />
        </div> 


        <div className="sm:col-span-2">
          {isEditing ? (
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Existing product images will be kept. Image replacement is
              currently unavailable.
            </p>
          ) : (
            <>
          <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Product Images </label>


            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-lg cursor-pointer hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                  <FaUpload className="text-2xl"/>
               
                  <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs">JPG, PNG, WEBP</p>
                </div>

                <input id="dropzone-file" type="file" className="hidden" 
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={(event) => {
                  const files = Array.from(event.currentTarget.files ?? []);
                  const urls = files.map((file) => URL.createObjectURL(file));
                  setSelectedFiles(files);
                  setLocalImageUrls(urls);
                }}
                />
              </label>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {localImageUrls.map((url, index) => (
                <Image
                  key={url}
                  src={url}
                  height={64}
                  width={64}
                  unoptimized
                  className="h-16 w-16 rounded object-cover"
                  alt={`Product image preview ${index + 1}`}
                />
              ))}
            </div>
            </>
          )}
        </div> 
        <div className="sm:col-span-2">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <textarea id="description" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here" defaultValue={""} 
          {...register("description")}
          
          />
        </div>
      </div>
      {submitMessage && (
        <p role="status" className="mt-4 text-sm" aria-live="polite">
          {submitMessage}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting
          ? isEditing
            ? "Saving..."
            : "Adding..."
          : isEditing
            ? "Save changes"
            : "Add product"}
      </button>
    </form>
  )
}

export default ProductForm
