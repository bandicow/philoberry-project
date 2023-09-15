"use client";

import { SketchPicker, ColorResult } from "react-color";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

// 배경색 정보를 가져오는 함수
async function getBackgroundColor() {
  const response = await axios.get("../api/getBackgroundColor");
  return response.data.color;
}

// 배경색 정보를 설정하는 함수
async function setBackgroundColor(data: ColorState) {
  const response = await axios.post("../api/setBackgroundColor", data);
  return response.data;
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

    // Local state 업데이트는 선택적입니다.
    // React Query가 서버 상태와 자동 동기화해주므로 굳이 필요하지 않을 수 있습니다.
    // 하지만 UI가 더 빠르게 반응하도록 하려면 local state 업데이트도 고려해볼 만 합니다.
    // setBackgroundColor(color);
  };
  console.log(color);

  return (
    <div style={{ backgroundColor: color }} className="flex">
      <SketchPicker color={color} onChangeComplete={handleColorChange} />
      <div
        style={{
          width: "20rem",
          height: "20rem",
          backgroundColor: color,
        }}
        className="rounded-md test"
      />
    </div>
  );
}
