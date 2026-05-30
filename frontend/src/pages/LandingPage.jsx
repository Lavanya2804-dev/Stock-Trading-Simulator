import {
  Link,
} from "react-router-dom";

import {
  FaChartLine,
} from "react-icons/fa";

function LandingPage() {

  return (

    <div
      className="
        min-h-screen
        bg-gray-100
        text-black
      "
    >

      {/* NAVBAR */}
      <nav
        className="
          bg-white
          shadow-md
          px-6
          py-4
          flex
          justify-between
          items-center
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            text-green-600
          "
        >
          TradeX
        </h1>

        <div className="flex gap-4">

          <Link
            to="/login"
            className="
              px-5
              py-2
              rounded-lg
              border
              border-gray-400
              hover:bg-gray-200
            "
          >
            Login
          </Link>

          <Link
            to="/register"
            className="
              px-5
              py-2
              rounded-lg
              bg-green-500
              text-white
              hover:bg-green-600
            "
          >
            Register
          </Link>

        </div>

      </nav>


      {/* HERO SECTION */}
      <section
        className="
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          px-8
          md:px-20
          py-20
          gap-12
        "
      >

        {/* LEFT CONTENT */}
        <div className="flex-1">

          <h1
            className="
              text-5xl
              md:text-6xl
              font-bold
              leading-tight
            "
          >
            Smart Stock
            Trading Simulator
          </h1>

          <p
            className="
              text-gray-600
              text-lg
              mt-6
              max-w-xl
            "
          >
            Practice trading with
            virtual money, track
            your portfolio, analyze
            stocks and improve your
            investing skills in a
            realistic environment.
          </p>

          <div
            className="
              flex
              gap-5
              mt-8
            "
          >

            <Link
              to="/register"
              className="
                bg-green-500
                text-white
                px-8
                py-3
                rounded-xl
                font-semibold
                hover:bg-green-600
              "
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="
                border
                border-gray-400
                px-8
                py-3
                rounded-xl
                font-semibold
                hover:bg-gray-200
              "
            >
              Login
            </Link>

          </div>

        </div>


        {/* RIGHT IMAGE */}
        <div
          className="
            flex-1
            flex
            justify-center
          "
        >

          <img
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop"
            alt="Stock Trading"
            className="
              rounded-3xl
              shadow-2xl
              w-full
              max-w-lg
            "
          />

        </div>

      </section>


      {/* FEATURES */}
      <section
        className="
          px-8
          md:px-20
          py-16
        "
      >

        <h2
          className="
            text-4xl
            font-bold
            text-center
            mb-12
          "
        >
          Features
        </h2>

        <div
          className="
            grid
            md:grid-cols-3
            gap-8
          "
        >

          <div
            className="
              bg-white
              p-8
              rounded-2xl
              shadow-md
              text-center
            "
          >

            <FaChartLine
              className="
                text-5xl
                text-green-500
                mx-auto
              "
            />

            <h3
              className="
                text-2xl
                font-bold
                mt-5
              "
            >
              Live Market
            </h3>

            <p
              className="
                text-gray-600
                mt-3
              "
            >
              Track stocks and
              market performance
              in real time.
            </p>

          </div>


          <div
            className="
              bg-white
              p-8
              rounded-2xl
              shadow-md
              text-center
            "
          >

            <FaChartLine
              className="
                text-5xl
                text-blue-500
                mx-auto
              "
            />

            <h3
              className="
                text-2xl
                font-bold
                mt-5
              "
            >
              Portfolio Tracking
            </h3>

            <p
              className="
                text-gray-600
                mt-3
              "
            >
              Manage your virtual
              investments and
              monitor profits.
            </p>

          </div>


          <div
            className="
              bg-white
              p-8
              rounded-2xl
              shadow-md
              text-center
            "
          >

            <FaChartLine
              className="
                text-5xl
                text-purple-500
                mx-auto
              "
            />

            <h3
              className="
                text-2xl
                font-bold
                mt-5
              "
            >
              Secure Platform
            </h3>

            <p
              className="
                text-gray-600
                mt-3
              "
            >
              Safe authentication
              and smooth trading
              experience.
            </p>

          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer
        className="
          bg-white
          py-6
          text-center
          text-gray-500
          mt-10
        "
      >

        © 2026 TradeX.
        All Rights Reserved.

      </footer>

    </div>
  );
}

export default LandingPage;