// //#################################### 더미
// // const DUMMY_ARTIST = {
// //   artist_id: 1,
// //   artist_image: "https://example.com/artist_image.jpg",
// //   name: "홍길동",
// //   nationality: "한국",
// //   profile: "저는 홍길동이며, 다양한 예술 작품을 만들고 있습니다.",
// //   website_url: "https://example.com/artist_website",
// // };

// // const DUMMY_ARTWORK = {
// //   artwork_id: 1,
// //   artist_id: DUMMY_ARTIST.artist_id,
// //   title: "나의 첫 번째 작품",
// //   image_url: "https://example.com/artwork_image.jpg",
// //   descripton:
// //     "이 작품은 나의 첫 번째 작품으로, 자연의 아름다움을 표현하고자 했습니다.",
// //   createdAt: new Date(),
// //   medium: "유화",
// //   dimensions: "30cm x 40cm",
// //   price: null,
// //   isSold: false,
// // };

// // DUMMY_ARTIST.artworks = [DUMMY_ARTWORK];

// // ### s3 rds api
// typescript

// async function handleUpload(file: File) {
//   try {
//     const response = await axios.post("/api/s3Upload", {
//       file: { name: file.name, type: file.type },
//       name: 'unique-name',// 여기에 고유한 이름을 설정하세요.
//     });
//     ...
//   } catch (error) {
//     console.error(error);
//   }
// }

// typescript

// async function handleUpload(file: File) {
//   try {
//     const response = await axios.post("/api/s3Upload", {
//       file: { name: file.name, type: file.type },
//       name: `${Date.now()}-${file.name}`,// 원래 파일 이름에 타임스탬프 추가
//     });
//     ...
//   } catch (error) {
//     console.error(error);
//   }
// }
