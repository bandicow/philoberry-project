"use client";
import React, { useState } from "react";
import NoticeEventList from "./NoticeEventList";

type NoticeEvent = {
  id: number;
  title: string;
  content: string;
  date: string;
};

const NoticeEventPage = () => {
  const [notices, setNotices] = useState<NoticeEvent[]>([
    {
      id: 1,
      title: "사이트테스트입니다.",
      content: "개발중에 있으며, 근시일 내에 완성될 예정입니다.",
      date: "2023-12-01",
    },
    {
      id: 2,
      title: "공지사항 테스트",
      content: "공지사항 테스트",
      date: "2023-12-01",
    },
  ]);

  const [events, setEvents] = useState<NoticeEvent[]>([]);

  return (
    <div className="flex flex-col items-center">
      <NoticeEventList title="공지사항" items={notices} />
      <NoticeEventList title="이벤트" items={events} />
    </div>
  );
};

export default NoticeEventPage;
