"use client";
import { SketchPicker, ColorResult } from "react-color";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

// 배경색 정보를 가져오는 함수
async function getBackgroundColor() {
  const response = await axios.get("../../api/getBackgroundColor");
  return response.data.color;
}

// 배경색 정보를 설정하는 함수
async function setBackgroundColor(data: ColorState) {
  try {
    const response = await axios.post("../../api/setBackgroundColor", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default function Home() {
  const queryClient = useQueryClient();

  // 배경색 정보를 가져옵니다.
  const { data: color } = useQuery("backgroundColor", getBackgroundColor);

  // 배경색 정보를 설정합니다.
  const setBackgroundColorMutation = useMutation(setBackgroundColor, {
    onSuccess: () => {
      // 성공적으로 색상이 변경되면 쿼리 데이터를 갱신합니다.
      queryClient.invalidateQueries("backgroundColor");
    },
  });

  const handleColorChange = (ColorResult: ColorResult) => {
    setBackgroundColorMutation.mutate({ color: ColorResult.hex });
  };
  console.log(color);

  return (
    <div style={{ backgroundColor: color }} className="flex">
      {color && (
        <>
          <SketchPicker color={color} onChangeComplete={handleColorChange} />
          <div
            style={{
              width: "20rem",
              height: "20rem",
              backgroundColor: color,
            }}
            className="rounded-md test"
          />
        </>
      )}
      {!color && <div>에러가 발생했습니다.</div>}
    </div>
  );
}
