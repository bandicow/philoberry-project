import React from "react";
import SaleItemCard from "../UI/Card/Card";
import { Items } from "../../Types/Items";
import Image from "next/image";
import { useRouter } from "next/router";

const SaleItem = (props: Items) => {
  const router = useRouter();

  function showDetailHandler() {
    router.push("/" + props.id);
  }

  return (
    <li onClick={showDetailHandler} className="flex">
      <SaleItemCard>
        <div className="m-4">
          <div className="w-full overflow-hidden rounded-t-lg h-80">
            <Image
              className="w-full"
              src={props.img}
              alt="이미지설명"
              width={500}
              height={500}
            />
          </div>
        </div>
        <h3 className="mb-2 text-xl font-semibold">{props.name}</h3>
        <div>{props.descritption}</div>
      </SaleItemCard>
    </li>
  );
};

export default SaleItem;
