import UserPageHook from "./RoutesHooks/UserPageHook";

const UserPage = () => {
  const postId = UserPageHook()
  console.log(postId)
  return (
    <div>UserPage</div>
  )
}

export default UserPage