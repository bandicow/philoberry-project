// import { useMutation, useQuery, useQueryClient } from "react-query";

// /** 배경색 설정  */
// const setBackground = async (color: Color) => {
//   const res = await fetch("/api/background", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ color }),
//   });
//   return res.json();
// };

// /** 현재 설정된 배경색*/
// const getBackground = async () => {
//   const response = await fetch("/api/getBackgroundColor");
//   const data = await response.json(); //비동기 함수기 때문에 await를 쓰면 response가 끝날때까지 기다려줘서 에러가 안남
//   return data.color;
// };

// /** 배경색 변경 함수*/
// export function useSetBackground() {
//   const queryClient = useQueryClient();
//   return useMutation(setBackground, {
//     onSuccess: () => {
//       queryClient.invalidateQueries("background");
//     },
//   });
// }

// /**현재 설정된 배경색 가져오는 함수 */
// export function useGetBackground() {
//   return useQuery("background", getBackground);
// }
