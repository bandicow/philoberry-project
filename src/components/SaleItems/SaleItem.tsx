import React from "react";
import SaleItemCard from "../UI/Card/Card";
import { Items } from "../../Types/Items";
import Image from "next/image";
import { useRouter } from "next/router";

const SaleItem = (props: Items) => {
  const router = useRouter();

  const showDetailHandler = () => {
    router.push(
      { pathname: "/sale/[itemid]", query: { itemid: props.id } },
      "/sale/" + props.id
    );
  };

  return (
    <li onClick={showDetailHandler} className="flex">
      <SaleItemCard>
        {/* <div className="w-full m-1 overflow-hidden rounded-t-lg h-80"> */}
        <div className="w-full m-1 h-[250px] overflow-hidden rounded-xl">
          <Image
            className="w-full"
            src={props.img}
            alt="이미지설명"
            width={500}
            height={500}
          />
        </div>
        <h3 className="mb-2 text-xl font-semibold">{props.name}</h3>
        <div>{props.descritption}</div>
      </SaleItemCard>
    </li>
  );
};

export default SaleItem;
