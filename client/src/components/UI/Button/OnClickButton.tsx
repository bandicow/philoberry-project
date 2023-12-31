interface buttonName {
  goal: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function OnClickButton({ goal, onClick }: buttonName) {
  return (
    <div className="flex justify-center mt-5 font-bold">
      <button
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          onClick(event);
        }}
        className="px-1 py-2 font-normal text-white bg-red-500 border border-red-800 rounded cursor-pointer min-w-fit hover:font-bold hover:border-red-900"
      >
        {goal}
      </button>
    </div>
  );
}
