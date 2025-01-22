import { useSelector } from "react-redux";


export default function AuthWrapper({ children }) {
    const {isLoading} = useSelector((state) => state.user);   

    if (isLoading) {
        return <div>Loading....</div>;
    }
    return children;
}