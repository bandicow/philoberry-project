import React from "react";
import Link from "next/link";
import NoticeCard from "../UI/Card/NoticeCard";

type NoticeEvent = {
  id: number;
  title: string;
  content: string;
  date: string;
};

type NoticeEventListProps = {
  items: NoticeEvent[];
  title: string;
};

const NoticeEventList: React.FunctionComponent<NoticeEventListProps> = ({
  items,
  title,
}) => (
  <div className="flex flex-col items-center w-full">
    <h1 className="text-2xl font-bold mt-4 mb-4">{title}</h1>
    {items.length > 0 ? (
      items.map((item) => (
        <div className="w-4/5 mx-auto" key={item.id}>
          <Link href={`/notices/${item.id}`}>
            <NoticeCard>
              <div className="font-bold text-xl mb-2">{item.title}</div>
              <p className="text-gray-700 text-base">{item.date}</p>
            </NoticeCard>
          </Link>
        </div>
      ))
    ) : (
      <div>{title}가 없습니다.</div>
    )}
  </div>
);

export default NoticeEventList;
