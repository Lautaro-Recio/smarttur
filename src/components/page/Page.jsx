import Contact from "./pageBody/Contact";
import Experiences from "./pageBody/Experiences";
import Home from "./pageBody/Home";
import Offers from "./pageBody/Offers";
import QuienesSomos from "./pageBody/QuienesSomos";

function Page() {
    return (
        <div>
            <Home/>
            <Offers/>
            <Experiences/>
            <QuienesSomos/>
            <Contact/>
        </div>
    );
}

export default Page;