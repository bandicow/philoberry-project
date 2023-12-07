interface ColorState {
  color: string;
  setBgColor?: (color: string) => void;
}

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
