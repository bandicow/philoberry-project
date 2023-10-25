import Image from "next/image";

type SlideProps = {
  key: number;
  image: string;
};

const Slide = ({ key, image }: SlideProps) => {
  return (
    <div key={key} className="relative float-left w-full h-full">
      <Image src={image} alt={`이미지 ${key}`} fill objectFit="contain" />
    </div>
  );
};

export default Slide;
