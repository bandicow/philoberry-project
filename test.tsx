return (
<div className="mb-2" {...getRootProps()}>
<input
className="block w-full p-1 border border-gray-300 rounded-md font-inherit"
type="text"
ref={inputRef}
{...getInputProps()}
/>
<label className="block mb-2 font-bold" htmlFor="Imageurl">
제품 사진
</label>

<div className={`dropzone ${isDragActive ? 'active' : ''}`}>
<p>이미지를 드래그앤 드롭하거나 클릭하여 업로드하세요.</p>
<input {...getInputProps()} />
</div>

{isUploading && <p>Loading...</p>}
{!isUploading && uploadError && <p>{uploadError}</p>}

{/* 업로드된 이미지들의 미리보기 및 삭제 버튼 */}
{uploadedImages.length > 0 && (
<>
<h3>Uploaded Images:</h3>
{uploadedImages.map((imageFile, index) => (
<div key={index}>
{/* 이미지 미리보기 */}
<img 
src={URL.createObjectURL(imageFile)} 
alt={`Preview ${index}`} 
onClick={() => handleRemoveImage(index)} // 이미지 클릭으로 삭제
style={{cursor: 'pointer'}} // 마우스 커서를 포인터로 변경
/>
</div>
))}
</>
)}
</div>
);
};