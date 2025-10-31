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
      <div className="flotantButtons">
        <div className="flotantButton" title="Contactar por WhatsApp">
          <a
            href="https://wa.me/5493515184315?"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ion-icon size="large" name="logo-whatsapp"></ion-icon>
          </a>
        </div>

        <div className="flotantButton" title="Ir a RedEVT - Autogestión">
          <a
            href="https://app.redevt.com/red/ag/login.asp?xpid=757877673430303736344331"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ion-icon size="large" name="airplane-outline"></ion-icon>
          </a>
        </div>
      </div>


    </div>
  );
}

export default Page;
