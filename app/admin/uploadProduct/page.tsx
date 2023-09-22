"use client";

import axios from "axios";
import DragAndDropUploader from "../../../src/components/ImageUploader/DragAndDrop";
import NewProductForm from "../../../src/components/products/NewProductForm";

function MyApp() {
  return (
    <div className="flex justify-center item-center">
      <div>
        <NewProductForm onAddProduct={() => {}} />
      </div>
    </div>
  );
}

export default MyApp;
