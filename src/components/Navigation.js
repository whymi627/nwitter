import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
// 라우터 내에서 직접적으로 페이지 이동을 하고자 할때 사용하는 컴포넌트

const Navigation = ({ userObj }) => {
    return (
        <nav>
            <ul style={{ display: "flex", justifyContent: "center", marginTop: 50}}>
                <li>
                    <Link to="/" style={{ marginRight: 10 }}>
                       <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" /> 
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/profile"
                        style={{
                            marginLeft: 10,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            fontSize: 12,
                        }}
                    >

                        <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
                        <span style= {{ marginTop: 10 }}>
                            {userObj.displayName
                            ? `${userObj.displayName}의 My Profile`
                            : "Profile"}
                        </span>   
                    </Link>
                </li>
            </ul>
        </nav>
    );

};

export default Navigation;