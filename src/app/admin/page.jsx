"use client";
import AddProductModal from "@/components/modals/addProductModal";
import { useState } from "react";

export default function Admin() {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  return (
    <>
      <div>
        <button onClick={() => setShowAddProductModal(true)}>Add items</button>
      </div>
      {showAddProductModal && <AddProductModal setShowAddProductModal={setShowAddProductModal} />}
    </>
  );
}
