import Profile from "../components/Profile";
import About from "../components/About";
import Navbar from "../components/Navbar";
import Work from "../components/Work";

const Home = () => {
    return (
        <>
            <Navbar />
            <Profile />
            <About />
            <Work />
        </>
    );
}

export default Home;