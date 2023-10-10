export default function Button() {
  return (
    <div className="flex justify-center mt-10">
      <button
        type="submit"
        className="px-6 py-2 font-normal text-white bg-red-800 border border-red-800 rounded cursor-pointer hover:font-bold hover:bg-red-900 hover:border-red-900"
      >
        제품 추가하기
      </button>
    </div>
  );
}
