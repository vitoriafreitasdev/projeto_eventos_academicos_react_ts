import UserPageHook from "./RoutesHooks/UserPageHook";

const UserPage = () => {
  const user = UserPageHook()
  console.log(user)
  return (
    <div>UserPage</div>
  )
}

export default UserPage