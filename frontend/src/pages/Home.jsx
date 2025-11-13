import Profile from "../components/Profile";
import About from "../components/About";
import Navbar from "../components/Navbar";
import Work from "../components/Work";
import Projects from "../components/Projects";

const Home = () => {
    return (
        <>
            <Navbar />
            <Profile />
            <About />
            <Work />
            <Projects />
        </>
    );
}

export default Home;