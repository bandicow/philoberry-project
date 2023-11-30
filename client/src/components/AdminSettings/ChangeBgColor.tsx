"use client";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBackgroundColor, setBackgroundColor } from "../../../lib/action";
import Image from "next/image";

import mainpage from "../../../public/images/mainpage.jpg";

export default function ChangeBgColor() {
  const queryClient = useQueryClient();

  // 배경색 정보를 가져옵니다.
  const { data: backgroundColor } = useQuery(
    ["backgroundColor"],
    getBackgroundColor
  );

  // 배경색 정보를 설정합니다.
  const setBackgroundColorMutation = useMutation(setBackgroundColor, {
    onSuccess: () => {
      // 성공적으로 색상이 변경되면 쿼리 데이터 갱신합니다.
      queryClient.invalidateQueries(["backgroundColor"]);
    },
  });

  const handleColorChange = (color: string) => {
    setBackgroundColorMutation.mutate({ backgroundColor: color });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {typeof backgroundColor === "string" && (
        <div className="center w-[100%]">
          <HexColorPicker
            color={backgroundColor}
            onChange={handleColorChange}
            className="w-full"
            style={{ height: "300px", width: "100%", maxWidth: "650px" }}
          />
          <div className="flex justify-center w-64 mt-3">
            <label className="flex justify-center items-center space-x-2">
              <span className="text-gray-800 font-bold">HEX : </span>
              <HexColorInput
                color={backgroundColor}
                onChange={handleColorChange}
                className="w-1/2 p-1 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-s-yellow-400 focus:border-transparent"
              />
            </label>
          </div>
        </div>
      )}
      <div className=" flex-col w-[100%] h-[50vh] tabletLandscape:h-[90vh] rounded-2xl flex justify-center items-center">
        <h1 className="text-xl font-bold text-gray-800">배경 미리보기</h1>
        <div
          style={{
            backgroundColor: backgroundColor,
          }}
          className="max-w-[650px] max-h-[600px] center rounded-md shadow-md w-[100%] my-3 border h-[100%] border-s-gray-400 test"
        >
          <div className="relative w-52 h-52 tabletLandscape:w-96 tabletLandscape:h-96">
            <Image src={mainpage} alt={"예시 이미지"} fill object-fit="cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
