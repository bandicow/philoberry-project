import React from "react";
import SaleList from "../../src/components/SaleItems/SaleList";
import { NextPage } from "next";
import { Items, SaleItemProps } from "../../src/Types/Items";
import { DUMMY_ITEM } from "../../src/DummyData/DummyData";

const Sale: NextPage<SaleItemProps> = () => {
  //단일객체가 아닌 배열로 이루어져 Items 가 아닌 Items
  // const DUMMY_ITEM: Items[] = [
  //   {
  //     id: "1",
  //     name: "Man Cloth",
  //     category: "Shirt",
  //     color: "white",
  //     stock: 50,
  //     size: 105,
  //     descritption: "This is a PillaBerry MantoMan Cloth!",
  //     img: "https://source.unsplash.com/random/?cloth",
  //     url: "https://www.naver.com",
  //   },
  //   {
  //     id: "2",
  //     name: "Woman Cloth",
  //     category: "T-Shirt",
  //     color: "gray",
  //     stock: 70,
  //     size: 90,
  //     descritption: "This is a PillaBerry Cloth for Woman!",
  //     img: "https://source.unsplash.com/random/?woman",
  //     url: "https://www.naver.com",
  //   },
  //   {
  //     id: "3",
  //     name: "Cool Accessory",
  //     category: "Accessory",
  //     color: "silver",
  //     stock: 70,
  //     size: "Free",
  //     descritption: "This is a PillaBerry Shinny Accessory!",
  //     img: "https://source.unsplash.com/random/?accessory",
  //     url: "https://www.naver.com",
  //   },
  //   {
  //     id: "4",
  //     name: "Man Cloth",
  //     category: "Shirt",
  //     color: "white",
  //     stock: 50,
  //     size: 105,
  //     descritption: "This is a PillaBerry MantoMan Cloth!",
  //     img: "https://source.unsplash.com/random/?man",
  //     url: "https://www.naver.com",
  //   },
  //   {
  //     id: "5",
  //     name: "Woman Cloth",
  //     category: "T-Shirt",
  //     color: "gray",
  //     stock: 70,
  //     size: 90,
  //     descritption: "This is a PillaBerry Cloth for Woman!",
  //     img: "https://source.unsplash.com/random/?girl",
  //     url: "https://www.naver.com",
  //   },
  //   {
  //     id: "6",
  //     name: "Cool Accessory",
  //     category: "Accessory",
  //     color: "silver",
  //     stock: 70,
  //     size: "Free",
  //     descritption: "This is a PillaBerry Shinny Accessory!",
  //     img: "https://source.unsplash.com/random/?ring",
  //     url: "https://www.naver.com",
  //   },
  //   {
  //     id: "7",
  //     name: "Man Cloth",
  //     category: "Shirt",
  //     color: "white",
  //     stock: 50,
  //     size: 105,
  //     descritption: "This is a PillaBerry MantoMan Cloth!",
  //     img: "https://source.unsplash.com/random/?boy",
  //     url: "https://www.naver.com",
  //   },
  //   {
  //     id: "8",
  //     name: "Woman Cloth",
  //     category: "T-Shirt",
  //     color: "gray",
  //     stock: 70,
  //     size: 90,
  //     descritption: "This is a PillaBerry Cloth for Woman!",
  //     img: "https://source.unsplash.com/random/?women",
  //     url: "https://www.naver.com",
  //   },
  //   {
  //     id: "9",
  //     name: "Cool Accessory",
  //     category: "Accessory",
  //     color: "silver",
  //     stock: 70,
  //     size: "Free",
  //     descritption: "This is a PillaBerry Shinny Accessory!",
  //     img: "https://source.unsplash.com/random/?necklace",
  //     url: "https://www.naver.com",
  //   },
  // ];

  return (
    <div>
      <SaleList items={DUMMY_ITEM} />
    </div>
  );
};

export default Sale;
