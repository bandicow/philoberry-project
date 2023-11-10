interface buttonName {
  goal: string;
}

export default function Button({ goal }: buttonName) {
  return (
    <div className="flex justify-center mt-5 font-bold">
      <button
        type="submit"
        className="px-6 py-2 font-normal text-white bg-blue-500 border border-red-800 rounded cursor-pointer hover:font-bold hover:border-red-900"
      >
        {goal}
      </button>
    </div>
  );
}
