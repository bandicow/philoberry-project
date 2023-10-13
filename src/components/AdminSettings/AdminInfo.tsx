import ProfileImage from "./ProfileImage";
import Setting from "./Setting";
import { Session } from "../../Types/Art";
import { signOut } from "next-auth/react";
import Sidebar from "../layout/Sidebar";

type ClientAccountProps = {
  ClientInfo: Session;
};

const AdminInfo = (props: ClientAccountProps) => {
  //로그아웃은 비동기 과정, 요청 후 Promise 반환
  /**로그아웃을 위한 함수, next-auth의 signOut을 사용함  */
  const SignoutHandler = async () => {
    await signOut();
  };

  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <div className="grid justify-center w-4/5 settings">
        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-1 mr-10">
            <ProfileImage />
          </div>
          <div className="col-span-3">
            <p>Welcome {props.ClientInfo.user?.name}</p>
            <button onClick={SignoutHandler}>로그아웃</button>
          </div>
        </div>
        <div className="mt-5 border-t-2 border-gray-900">
          {/* Setting 컴포넌트를 changecolor 페이지에만 표시하도록 설정 */}
          <Setting />
        </div>
      </div>
    </div>
  );
};

export default AdminInfo;
