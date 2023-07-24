import React, { ReactElement, ReactNode } from "react";

//ReactElement 는 함수형 컴포넌트(Component, props, ...children) 제네릭 , ReactNode는 클래스형 컴포넌트 하지만 ReactElement와 JSX Element를 감싼다.
// ReactNode만이 null타입을 가지기에 ReactElement를 사용시에는 null을 union 해줘야한다.

interface CardProps {
  children: ReactNode;
}
// interface CardProps {d
//   children: ReactElement;
// }

// 여기서 맨 아래 div를 p로 하면 hydrate 에러 남
const Card: React.FC<CardProps> = (props) => {
  return (
    <div className="w-full text-base text-red-700 bg-white cursor-pointer hover:bg-red-100 active:bg-red-200">
      <div className="text-gray-700">{props.children}</div>
    </div>
  );
};

export default Card;
