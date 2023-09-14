import React from "react";
import SaleItemCard from "../UI/Card/Card";
import { Items } from "../../Types/Items";
import Image from "next/image";
import { useRouter } from "next/router";

const SaleItem = (item: Items) => {
  const router = useRouter();

  const { id, name, img } = item;

  console.log(item);

  const showDetailHandler = () => {
    router.push(
      { pathname: "/sale/[itemid]", query: { itemid: id } },
      "/sale/" + id
    );
  };

  return (
    <li onClick={showDetailHandler} className="flex">
      <SaleItemCard extraCalssName="hover:bg-red-100 active:bg-red-200">
        <div className="w-full m-1 h-[250px] overflow-hidden rounded-xl">
          <Image
            className="w-full"
            src={img}
            alt="임시"
            width={500}
            height={500}
          />
        </div>
        <h3 className="mb-2 text-xl font-semibold">{name}</h3>
        {/* <div>{description}</div> */}
      </SaleItemCard>
    </li>
  );
};

export default SaleItem;
