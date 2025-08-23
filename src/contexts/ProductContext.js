import React, { createContext, useContext, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase";
const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Generate Product ID
  const generateProductId = () => {
    return (
      "product_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
    );
  };
  // Add Product
  const addProduct = async (productData, imageUrls = []) => {
    try {
      setLoading(true);
      const productId = generateProductId();

      const newProduct = {
        Product_ID: productId,
        Product_Name: productData.productName,
        Product_Desc: productData.description || "",
        Product_Category: productData.category,
        Product_ImageURL: imageUrls[0] || "", // Primary image
        Product_AllImageURLs: imageUrls, // All images from backend
        Dermatologist_ID: productData.dermatologistId,
        Product_Ratings: 0,
        Product_DateCreated: new Date().toISOString(),
        Product_SkinCondition: productData.skinCondition,
        Product_Ingredients: productData.ingredients || "",
        Product_Status: "Pending",
        Product_ReviewedBy: null,
        Product_ApprovalDate: null,
      };

      const docRef = await addDoc(collection(db, "Product"), newProduct);
      setProducts((prev) => [...prev, { ...newProduct, id: docRef.id }]);

      return { success: true, productId };
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const deleteProductImages = async (imageUrls) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/product-images/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrls }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete images");
      }

      return await response.json();
    } catch (error) {
      console.error("Error deleting images:", error);
      throw error;
    }
  };
  // Get Products (with filters)
  const getProducts = async (filters = {}) => {
    try {
      setLoading(true);
      let q = collection(db, "Product");

      // Apply filters
      if (filters.dermatologistId) {
        q = query(q, where("Dermatologist_ID", "==", filters.dermatologistId));
      }
      if (filters.category) {
        q = query(q, where("Product_Category", "==", filters.category));
      }
      if (filters.status) {
        q = query(q, where("Product_Status", "==", filters.status));
      }

      q = query(q, orderBy("Product_DateCreated", "desc"));

      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productsData);
      return productsData;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update Product
  const updateProduct = async (productId, updateData, newImageUrls = []) => {
    try {
      setLoading(true);

      const updatePayload = {
        Product_Name: updateData.productName,
        Product_Desc: updateData.description || "",
        Product_Category: updateData.category,
        Product_SkinCondition: updateData.skinCondition,
        Product_Ingredients: updateData.ingredients || "",
      };

      // Update images if new ones provided
      if (newImageUrls.length > 0) {
        const currentProduct = products.find((p) => p.Product_ID === productId);
        const existingImages = currentProduct?.Product_AllImageURLs || [];
        updatePayload.Product_AllImageURLs = [
          ...existingImages,
          ...newImageUrls,
        ];
        updatePayload.Product_ImageURL = newImageUrls[0];
      }

      const currentProduct = products.find((p) => p.Product_ID === productId);
      if (!currentProduct) throw new Error("Product not found");
      const productRef = doc(db, "Product", currentProduct.id);
      await updateDoc(productRef, updatePayload);

      setProducts((prev) =>
        prev.map((product) =>
          product.Product_ID === productId
            ? { ...product, ...updatePayload }
            : product
        )
      );

      return { success: true };
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete Product
  const deleteProduct = async (productId) => {
    try {
      setLoading(true);

      // Get product data to access image URLs
      const productToDelete = products.find((p) => p.Product_ID === productId);

      // Delete images from Supabase Storage
      if (productToDelete?.Product_AllImageURLs?.length > 0) {
        await deleteProductImages(productToDelete.Product_AllImageURLs);
      }

      // Delete from Firestore
      if (!productToDelete) throw new Error("Product not found");
      await deleteDoc(doc(db, "Product", productToDelete.id));

      // Remove from local state
      setProducts((prev) =>
        prev.filter((product) => product.Product_ID !== productId)
      );

      return { success: true };
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  // Approve/Reject Product (Admin only)
  const updateProductStatus = async (productId, status, reviewerId) => {
    try {
      setLoading(true);

      const updateData = {
        Product_Status: status,
        Product_ReviewedBy: reviewerId,
        Product_ApprovalDate:
          status === "Approved" ? new Date().toISOString() : null,
      };

      const productRef = doc(db, "Product", productId);
      await updateDoc(productRef, updateData);

      // Update local state
      setProducts((prev) =>
        prev.map((product) =>
          product.Product_ID === productId
            ? { ...product, ...updateData }
            : product
        )
      );

      return { success: true };
    } catch (error) {
      console.error("Error updating product status:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    products,
    loading,
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    updateProductStatus,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
