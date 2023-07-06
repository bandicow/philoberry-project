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
  caption: string; // 이미지 캡션
  likes: number; // 좋아요 수
  comments: number; // 댓글 수
  timestamp: Date; // 업로드 시간
  user: {
    id: string; // 사용자 고유 식별자
    username: string; // 사용자 이름
    profileImageUrl: string; // 사용자 프로필 이미지 URL
  };
  tags: string[]; // 이미지에 태그된 문자열 배열
}

/**
 id (S), imageUrl(S) , caption(이미지설명,S), likes(N) , comments(N) , timestamp(업로드날짜,D) , user(id,username,profileImageUrl)(AllS) , tags(S[])
 */
export interface ClientGalleyImageProps {
  GallreyImg: GalleryImage[];
}
