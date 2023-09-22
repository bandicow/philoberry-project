export type ISODateString = string;

export interface DefaultSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: ISODateString;
}

export interface Session extends DefaultSession {}

/**사용자가 올린 이미지 타입 */
export interface GalleryImage {
  id: string; // 이미지 고유 식별자
  imageUrl: string; // 이미지 URL
  timestamp: Date; // 업로드 시간
  user: {
    id: string; // 작가 고유 식별자
    username: string; // 작가 이름
    profileImageUrl: string; // 사용자 프로필 이미지 URL
  };
  tags: string[]; // 이미지에 태그된 문자열 배열
  isSold: boolean; // 판매 여부
  cost: string; // 가격 문의시 판매
}

/**
 id (S), imageUrl(S) , caption(이미지설명,S), likes(N) , comments(N) , timestamp(업로드날짜,D) , user(id,username,profileImageUrl)(AllS) , tags(S[])
 */
export interface ClientGalleyImageProps {
  GallreyImg: GalleryImage[];
}
