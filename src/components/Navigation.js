import { Link } from "react-router-dom";
// 라우터 내에서 직접적으로 페이지 이동을 하고자 할때 사용하는 컴포넌트

const Navigation = ({ userObj }) => {
    console.log(userObj);
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">{userObj.displayName}의 My Profile</Link>
                </li>
            </ul>
        </nav>
    );

};

export default Navigation;