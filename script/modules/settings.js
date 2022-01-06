const orders_api = "https://foo-bar-database.herokuapp.com/";
const beer_api = "https://foo-bar-database.herokuapp.com/beertypes";

const refresh_rate = 3000; // in miliseconds

const beerColors = {
    beers: [
        {
            name: "El Hefe",
            color: "#FED13D",
            gradient:
                "linear-gradient(180deg, #FDEEBB 0%, rgba(255, 255, 255, 1) 100%)",
        },
        {
            name: "Row 26",
            color: "#AEC1FF",
            gradient:
                "linear-gradient(180deg, #C7D3FA 0%, rgba(255, 255, 255, 1) 100%)",
        },
        {
            name: "GitHop",
            color: "#FFCBBB",
            gradient:
                "linear-gradient(180deg, #FDD1D0 0%, rgba(255, 255, 255, 1) 100%)",
        },
        {
            name: "Hollaback Lager",
            color: "#FFBB87",
            gradient:
                "linear-gradient(180deg, #FEE2CD 0%, rgba(255, 255, 255, 1) 100%)",
        },
        {
            name: "Mowintime",
            color: "#A5FFDA",
            gradient:
                "linear-gradient(180deg, #B8FCE1 0%, rgba(255, 255, 255, 1) 100%)",
        },
        {
            name: "Fairy Tale Ale",
            color: "#EFACFF",
            gradient:
                "linear-gradient(180deg, #F9E1FF 0%, rgba(255, 255, 255, 1) 100%)",
        },
        {
            name: "Hoppily Ever After",
            color: "#A2E34C",
            gradient:
                "linear-gradient(180deg, #DAFCAE 0%, rgba(255, 255, 255, 1) 100%)",
        },
        {
            name: "Steampunk",
            color: "#A0B3C2",
            gradient:
                "linear-gradient(180deg, #CDDEEB 0%, rgba(255, 255, 255, 1) 100%)",
        },
        {
            name: "Ruined Childhood",
            color: "#E9EF39",
            gradient:
                "linear-gradient(180deg, #FBFDB6 0%, rgba(255, 255, 255, 1) 100%)",
        },
        {
            name: "Sleighride",
            color: "#CAABFF",
            gradient:
                "linear-gradient(180deg, #E0D0FD 0%, rgba(255, 255, 255, 1) 100%)",
        },
    ],
};

export { orders_api, beer_api, refresh_rate, beerColors };
