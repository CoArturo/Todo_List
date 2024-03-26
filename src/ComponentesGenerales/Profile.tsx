import { useContext } from "react";
import { UserContext } from "../Context/UserContext"; 



export const Profile: React.FC = () => {
    
    const {usuario} = useContext(UserContext)

    console.log(usuario)
    return(
    <div>
        {usuario ? (
        <div>
            <h2>User Profile</h2>
            <p>Username: {usuario.user}</p>
            <p>Email: {usuario.name}</p>
        </div>
        ) : (
        <p>Please login</p>
        )}
    </div>
    )
}

export default Profile