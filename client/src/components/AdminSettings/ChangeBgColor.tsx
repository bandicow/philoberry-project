import { SketchPicker, ColorResult } from "react-color";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBackgroundColor, setBackgroundColor } from "../../../lib/action";

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
      <div className="w-[95vw] h-[50vh] rounded-2xl flex justify-center items-center">
        <div
          style={{
            backgroundColor: backgroundColor,
          }}
          className="w-[100%] m-2 border h-[90%] border-s-gray-400 test"
        />
      </div>
    </div>
  );
}
