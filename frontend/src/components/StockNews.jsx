function StockNews() {

  const news = [

    {
      title:
        "Apple launches next-gen AI chips",
      source: "Bloomberg",
      time: "2h ago",
    },

    {
      title:
        "Tesla stock jumps 5% after earnings",
      source: "CNBC",
      time: "4h ago",
    },

    {
      title:
        "NVIDIA crosses record market cap",
      source: "Reuters",
      time: "6h ago",
    },

    {
      title:
        "Microsoft expands cloud AI services",
      source: "Forbes",
      time: "8h ago",
    },

  ];


  return (

    <div
      className="
        bg-white
        dark:bg-gray-900
        rounded-2xl
        shadow-lg
        p-6
        mt-8
      "
    >

      <h2
        className="
          text-3xl
          font-bold
          mb-6
          dark:text-white
        "
      >
        Latest Stock News 📰
      </h2>


      <div className="space-y-4">

        {news.map(
          (item, index) => (

            <div
              key={index}
              className="
                border
                dark:border-gray-700
                rounded-xl
                p-4
                hover:shadow-md
                transition
                cursor-pointer
              "
            >

              <h3
                className="
                  font-bold
                  text-lg
                  dark:text-white
                "
              >
                {item.title}
              </h3>

              <div
                className="
                  flex
                  justify-between
                  mt-2
                  text-sm
                  text-gray-500
                "
              >

                <span>
                  {item.source}
                </span>

                <span>
                  {item.time}
                </span>

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );
}

export default StockNews;