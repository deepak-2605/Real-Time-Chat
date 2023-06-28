// import { Avatar } from "@chakra-ui/avatar";
// import { Box, div } from "@chakra-ui/layout";
// import { ChatState } from "../../context/ChatProvider";

const UserListItem = ({ user }) => {
    // const { user } = ChatState();

    return (
        <div className="flex items-center my-2 px-2 rounded-xl bg-slate-900">
            <img className="rounded-xl" width='50px' src={user.profilePic} alt="" />
            <div className="m-2">
                <div className="text-lg">{user.name}</div>
                <div className="text-xs">{user.email}</div>
            </div>
        </div>

    );
};

export default UserListItem;