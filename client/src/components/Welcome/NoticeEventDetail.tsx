"use client";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { usePathname } from "next/navigation";
import NoticeCard from "../UI/Card/NoticeCard";

type NoticeEvent = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export default function NoticeEventDetail() {
  const pathname = usePathname();

  const stringId = pathname?.split("/")?.slice(-1)[0];

  //   const [detail, setDetail] = useState<NoticeEvent | null>(null);
  const [notices, setNotices] = useState<NoticeEvent>({
    id: 1,
    title: "사이트테스트입니다.",
    content: "개발중에 있으며, 근시일 내에 완성될 예정입니다.",
    date: "2023-12-01",
  });

  useEffect(() => {
    const fetchNoticeEventDetail = async () => {
      if (stringId) {
        // 이 부분은 실제 API 호출 함수로 교체해야 합니다.
        // setDetail(detailData);
      }
    };

    fetchNoticeEventDetail();
  }, [stringId]);

  if (!notices) {
    return <Loading />;
  }

  return (
    <div>
      <NoticeCard>
        <h1 className="text-2xl font-bold mt-4 mb-4 h-full">
          제목: {notices.title}
        </h1>
        <p className="text-sm">날짜: {notices.date}</p>
        <p className="text-lg">내용: {notices.content}</p>
      </NoticeCard>
    </div>
  );
}
