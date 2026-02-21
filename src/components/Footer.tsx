import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import GoyamaLogo from "./GoyamaLogo";

const Footer = () => (
  <footer className="bg-foreground text-background/80">
    <div className="container-section py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <GoyamaLogo size="small" className="mb-4 [&_span]:!text-background/90" />
          <p className="text-sm leading-relaxed opacity-70">
            A registered trademark of Goyama International. Empowering India's renewable energy future through advanced solar manufacturing.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-background mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: "About Us", path: "/about" },
              { label: "Manufacturing", path: "/manufacturing" },
              { label: "Products", path: "/products" },
              { label: "Certifications", path: "/certifications" },
            ].map((l) => (
              <li key={l.path}>
                <Link to={l.path} className="opacity-70 hover:opacity-100 transition-opacity">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-background mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Vision & Mission", path: "/vision-mission" },
              { label: "Contact Us", path: "/contact" },
            ].map((l) => (
              <li key={l.path}>
                <Link to={l.path} className="opacity-70 hover:opacity-100 transition-opacity">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-background mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
              <span className="opacity-70">Munak, District Karnal, Haryana - 132040</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-primary" />
              <a href="mailto:info@goyamasolar.com" className="opacity-70 hover:opacity-100">info@goyamasolar.com</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-primary" />
              <div className="opacity-70">
                <a href="tel:+919466666257" className="hover:opacity-100">+91-9466666257</a>
                <span className="mx-1">|</span>
                <a href="tel:+919896684435" className="hover:opacity-100">+91-9896684435</a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs opacity-50">© 2025 Goyama International. All rights reserved.</p>
        <p className="text-xs opacity-50">GOYAMA SOLAR is a registered trademark of Goyama International.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
