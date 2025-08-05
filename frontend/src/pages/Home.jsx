import Profile from "../components/Profile";
import About from "../components/About";
import Work from "../components/Work";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Contact from "../components/Contact";


function Home() {
    return (
        <>
            <Profile />
            <About />
            <Work />
            <Experience />
            <Projects />
            <Contact />
        </>
    );
}

export default Home;