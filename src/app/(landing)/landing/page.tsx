import Navbar from "@/app/(landing)/components/Navbar";
import Hero from "../components/Hero";
import Feature from "../components/Feature";
import Explore from "../components/Explore";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import LogoRoller from "../components/LogoRoller";
import Text from "../components/Text";

export default function LandingPage() {
    return (
        <main>
            <Navbar />
            <Hero />
            <LogoRoller />
            <Feature info="work" title="Find your perfect" subtitle="job with the us" content="we offer a wide range of job opportunities to help you find the perfect fit for your skills and experience by integrating our AI-powered job recommendation system." />
            <Explore />
            <Text />
            <Testimonials />
            <Footer />
        </main>
    );
}
