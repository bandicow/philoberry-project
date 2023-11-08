interface buttonName {
  goal: string;
  onClick: () => void;
}

export default function OnClickButton({ goal, onClick }: buttonName) {
  return (
    <div className="flex justify-center mt-5">
      <button
        onClick={onClick}
        className="px-6 py-2 font-normal text-white bg-red-800 border border-red-800 rounded cursor-pointer hover:font-bold hover:border-red-900"
      >
        {goal}
      </button>
    </div>
  );
}
