import Contact from "./pageBody/Contact";
import Experiences from "./pageBody/Experiences";
import Home from "./pageBody/Home";
import Offers from "./pageBody/Offers";
import QuienesSomos from "./pageBody/QuienesSomos";

function Page() {
  return (
    <div>
      <Home />
      <Offers />
      <Experiences />
      <QuienesSomos />
      <Contact />
      <div className="flotantButton">
        <a
          type="button"
          href="https://wa.me/5493515184315?"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ion-icon size="large" name="logo-whatsapp"></ion-icon>
        </a>
      </div>
    </div>
  );
}

export default Page;
