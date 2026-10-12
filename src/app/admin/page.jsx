"use client";
import AdminGuard from "@/components/guard/adminGuard";
import AddProductModal from "@/components/modals/addProductModal";
import { useState } from "react";

export default function Admin() {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  return (
    <AdminGuard>
      <div>
        <button onClick={() => setShowAddProductModal(true)}>Add items</button>
      </div>
      {showAddProductModal && (
        <AddProductModal setShowAddProductModal={setShowAddProductModal} />
      )}
    </AdminGuard>
  );
}
