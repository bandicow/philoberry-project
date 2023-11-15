"use client";
import { SketchPicker, ColorResult } from "react-color";
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

  const handleColorChange = (ColorResult: ColorResult) => {
    setBackgroundColorMutation.mutate({ backgroundColor: ColorResult.hex });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {typeof backgroundColor === "string" && (
        <div className="relative">
          <SketchPicker
            color={backgroundColor}
            onChangeComplete={handleColorChange}
            styles={{
              default: {
                picker: {
                  width: "95%",
                  borderRadius: "4px",
                  margin: "10px",
                  boxSizing: "border-box",
                },
              },
            }}
          />
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
