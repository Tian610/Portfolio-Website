import Profile from "../components/Profile";
import About from "../components/About";
import Navbar from "../components/Navbar";
import Work from "../components/Work";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

const Home = () => {
    return (
        <>
            <Navbar />
            <Profile />
            <About />
            <Work />
            <Projects />
            <Contact />
        </>
    );
}

export default Home;