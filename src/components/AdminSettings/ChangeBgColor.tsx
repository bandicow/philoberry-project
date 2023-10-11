import { SketchPicker, ColorResult } from "react-color";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

export default function ChangeBgColor() {
  const queryClient = useQueryClient();

  // 배경색 정보를 가져오는 함수
  async function getBackgroundColor() {
    const response = await axios.get("/api/getBackgroundColor");
    return response.data.backgroundColor;
  }

  // 배경색 정보를 설정하는 함수
  async function setBackgroundColor(data: { backgroundColor: string }) {
    try {
      const response = await axios.post("/api/setBackgroundColor", data);
      console.log(response.data.backgroundColor);
      return response.data.backgroundColor;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // 배경색 정보를 가져옵니다.
  const { data: backgroundColor } = useQuery(
    "backgroundColor",
    getBackgroundColor
  );

  // 배경색 정보를 설정합니다.
  const setBackgroundColorMutation = useMutation(setBackgroundColor, {
    onSuccess: () => {
      // 성공적으로 색상이 변경되면 쿼리 데이터 갱신합니다.
      queryClient.invalidateQueries("backgroundColor");
    },
  });

  const handleColorChange = (ColorResult: ColorResult) => {
    setBackgroundColorMutation.mutate({ backgroundColor: ColorResult.hex });
  };

  return (
    <div style={{ backgroundColor: backgroundColor }} className="flex">
      test
      {typeof backgroundColor === "string" && (
        <>
          <SketchPicker
            color={backgroundColor}
            onChangeComplete={handleColorChange}
          />
          <div
            style={{
              width: "20rem",
              height: "20rem",
              backgroundColor: backgroundColor,
            }}
            className="rounded-md test"
          />
        </>
      )}
    </div>
  );
}
