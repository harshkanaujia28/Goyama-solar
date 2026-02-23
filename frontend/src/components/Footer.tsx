import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import footerLogo from "@/assets/footer-logo.png";

const Footer = () => (
  <footer className="bg-foreground text-background/80">
    <div className="container-section py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Logo Column */}
        <div className="flex flex-col">
          <img
            src={footerLogo}
            alt="Goyama Solar - Ahimsa In Every Ray"
          className="w-[75px] md:w-[100px] object-contain opacity-85"
          />

          <p className="mt-5 text-sm leading-relaxed opacity-70 max-w-xs">
            A registered trademark of Goyama International. Empowering India's
            renewable energy future through advanced solar manufacturing.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 hover:text-primary transition-all"
            >
              <Facebook size={18} />
            </a>

            <a
              href="https://instagram.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 hover:text-primary transition-all"
            >
              <Instagram size={18} />
            </a>

            <a
              href="https://linkedin.com/company/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 hover:text-primary transition-all"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-semibold text-background mb-5">
            Quick Links
          </h4>

          <ul className="space-y-3 text-sm">
            {[
              { label: "About Us", path: "/about" },
              { label: "Manufacturing", path: "/manufacturing" },
              { label: "Products", path: "/products" },
              { label: "Certifications", path: "/certifications" },
              { label: "Vision & Mission", path: "/vision-mission" },
              { label: "Contact Us", path: "/contact" },
            ].map((l) => (
              <li key={l.path}>
                <Link
                  to={l.path}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold text-background mb-5">
            Contact
          </h4>

          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-1 shrink-0 text-primary" />
              <span className="opacity-70">
                Munak, District Karnal, Haryana - 132040
              </span>
            </li>

            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-primary" />
              <a
                href="mailto:info@goyamasolar.com"
                className="opacity-70 hover:opacity-100"
              >
                info@goyamasolar.com
              </a>
            </li>

            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-primary" />
              <div className="opacity-70">
                <a href="tel:+919466666257" className="hover:opacity-100">
                  +91-9466666257
                </a>
                <span className="mx-1">|</span>
                <a href="tel:+919896684435" className="hover:opacity-100">
                  +91-9896684435
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h4 className="font-display font-semibold text-background mb-5">
            Company
          </h4>

          <p className="text-sm opacity-70 leading-relaxed max-w-xs">
            GOYAMA SOLAR is a national-level solar manufacturing brand aligned
            with India’s renewable energy goals and committed to responsible,
            sustainable production.
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="mt-14 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs opacity-50">
          © 2025 Goyama International. All rights reserved.
        </p>
        <p className="text-xs opacity-50 text-center md:text-right">
          GOYAMA SOLAR is a registered trademark of Goyama International.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;