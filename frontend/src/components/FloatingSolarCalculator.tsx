import { Calculator } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function FloatingSolarCalculator() {
  const location = useLocation();

  if (location.pathname === "/solar-calculator") {
    return null;
  }

  return (
    <Link
      to="/solar-calculator"
      className="
        fixed
        bottom-24
        right-6
        z-[999]
        group
      "
    >
      <div
        className="
          flex
          items-center
          gap-4
          bg-white
          rounded-full
          pl-5
          pr-2
          py-2
          shadow-xl
          border
          border-orange-100
          hover:shadow-2xl
          hover:-translate-y-1
          transition-all
          duration-300
        "
      >
        {/* Text */}
        <div className="text-right">
          <p className="text-[11px] text-gray-500 leading-none">
            Check Your Savings
          </p>

          <p className="text-sm font-semibold text-gray-900">
            Solar Calculator
          </p>
        </div>

        {/* Icon */}
        <div
          className="
            relative
            w-14
            h-14
            rounded-full
            bg-[#F37021]
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          <span
            className="
              absolute
              inset-0
              rounded-full
              bg-[#F37021]
              opacity-30
              animate-ping
            "
          />

          <Calculator
            size={28}
            className="text-white relative z-10"
          />
        </div>
      </div>
    </Link>
  );
}