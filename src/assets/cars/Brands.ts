const brands = [
    {
        "value": 140,
        "label": "Abarth"
    },
    {
        "value": 203,
        "label": "AC"
    },
    {
        "value": 375,
        "label": "Acura"
    },
    {
        "value": 800,
        "label": "Aixam"
    },
    {
        "value": 900,
        "label": "Alfa Romeo"
    },
    {
        "value": 1100,
        "label": "ALPINA"
    },
    {
        "value": 121,
        "label": "Artega"
    },
    {
        "value": 1750,
        "label": "Asia Motors"
    },
    {
        "value": 1700,
        "label": "Aston Martin"
    },
    {
        "value": 1900,
        "label": "Audi"
    },
    {
        "value": 2000,
        "label": "Austin"
    },
    {
        "value": 1950,
        "label": "Austin Healey"
    },
    {
        "value": 31863,
        "label": "BAIC"
    },
    {
        "value": 3100,
        "label": "Bentley"
    },
    {
        "value": 3500,
        "label": "BMW"
    },
    {
        "value": 3850,
        "label": "Borgward"
    },
    {
        "value": 4025,
        "label": "Brilliance"
    },
    {
        "value": 4350,
        "label": "Bugatti"
    },
    {
        "value": 4400,
        "label": "Buick"
    },
    {
        "value": 4700,
        "label": "Cadillac"
    },
    {
        "value": 112,
        "label": "Casalini"
    },
    {
        "value": 5300,
        "label": "Caterham"
    },
    {
        "value": 83,
        "label": "Chatenet"
    },
    {
        "value": 5600,
        "label": "Chevrolet"
    },
    {
        "value": 5700,
        "label": "Chrysler"
    },
    {
        "value": 5900,
        "label": "Citroën"
    },
    {
        "value": 6200,
        "label": "Cobra"
    },
    {
        "value": 6325,
        "label": "Corvette"
    },
    {
        "value": 3,
        "label": "Cupra"
    },
    {
        "value": 6600,
        "label": "Dacia"
    },
    {
        "value": 6800,
        "label": "Daewoo"
    },
    {
        "value": 7000,
        "label": "Daihatsu"
    },
    {
        "value": 7400,
        "label": "DeTomaso"
    },
    {
        "value": 31864,
        "label": "DFSK"
    },
    {
        "value": 7700,
        "label": "Dodge"
    },
    {
        "value": 255,
        "label": "Donkervoort"
    },
    {
        "value": 235,
        "label": "DS Automobiles"
    },
    {
        "value": 8600,
        "label": "Ferrari"
    },
    {
        "value": 8800,
        "label": "Fiat"
    },
    {
        "value": 172,
        "label": "Fisker"
    },
    {
        "value": 9000,
        "label": "Ford"
    },
    {
        "value": 205,
        "label": "GAC Gonow"
    },
    {
        "value": 204,
        "label": "Gemballa"
    },
    {
        "value": 9900,
        "label": "GMC"
    },
    {
        "value": 122,
        "label": "Grecav"
    },
    {
        "value": 186,
        "label": "Hamann"
    },
    {
        "value": 10850,
        "label": "Holden"
    },
    {
        "value": 11000,
        "label": "Honda"
    },
    {
        "value": 11050,
        "label": "Hummer"
    },
    {
        "value": 11600,
        "label": "Hyundai"
    },
    {
        "value": 11650,
        "label": "Infiniti"
    },
    {
        "value": 11900,
        "label": "Isuzu"
    },
    {
        "value": 12100,
        "label": "Iveco"
    },
    {
        "value": 12400,
        "label": "Jaguar"
    },
    {
        "value": 12600,
        "label": "Jeep"
    },
    {
        "value": 13200,
        "label": "Kia"
    },
    {
        "value": 13450,
        "label": "Koenigsegg"
    },
    {
        "value": 13900,
        "label": "KTM"
    },
    {
        "value": 14400,
        "label": "Lada"
    },
    {
        "value": 14600,
        "label": "Lamborghini"
    },
    {
        "value": 14700,
        "label": "Lancia"
    },
    {
        "value": 14800,
        "label": "Land Rover"
    },
    {
        "value": 14845,
        "label": "Landwind"
    },
    {
        "value": 15200,
        "label": "Lexus"
    },
    {
        "value": 15400,
        "label": "Ligier"
    },
    {
        "value": 15500,
        "label": "Lincoln"
    },
    {
        "value": 15900,
        "label": "Lotus"
    },
    {
        "value": 16200,
        "label": "Mahindra"
    },
    {
        "value": 16600,
        "label": "Maserati"
    },
    {
        "value": 16700,
        "label": "Maybach"
    },
    {
        "value": 16800,
        "label": "Mazda"
    },
    {
        "value": 137,
        "label": "McLaren"
    },
    {
        "value": 17200,
        "label": "Mercedes-Benz"
    },
    {
        "value": 17300,
        "label": "MG"
    },
    {
        "value": 30011,
        "label": "Microcar"
    },
    {
        "value": 17500,
        "label": "MINI"
    },
    {
        "value": 17700,
        "label": "Mitsubishi"
    },
    {
        "value": 17900,
        "label": "Morgan"
    },
    {
        "value": 18700,
        "label": "Nissan"
    },
    {
        "value": 18875,
        "label": "NSU"
    },
    {
        "value": 18975,
        "label": "Oldsmobile"
    },
    {
        "value": 19000,
        "label": "Opel"
    },
    {
        "value": 149,
        "label": "Pagani"
    },
    {
        "value": 19300,
        "label": "Peugeot"
    },
    {
        "value": 19600,
        "label": "Piaggio"
    },
    {
        "value": 19800,
        "label": "Plymouth"
    },
    {
        "value": 4,
        "label": "Polestar"
    },
    {
        "value": 20000,
        "label": "Pontiac"
    },
    {
        "value": 20100,
        "label": "Porsche"
    },
    {
        "value": 20200,
        "label": "Proton"
    },
    {
        "value": 20700,
        "label": "Renault"
    },
    {
        "value": 21600,
        "label": "Rolls-Royce"
    },
    {
        "value": 21700,
        "label": "Rover"
    },
    {
        "value": 125,
        "label": "Ruf"
    },
    {
        "value": 21800,
        "label": "Saab"
    },
    {
        "value": 22000,
        "label": "Santana"
    },
    {
        "value": 22500,
        "label": "Seat"
    },
    {
        "value": 22900,
        "label": "Skoda"
    },
    {
        "value": 23000,
        "label": "Smart"
    },
    {
        "value": 188,
        "label": "speedART"
    },
    {
        "value": 100,
        "label": "Spyker"
    },
    {
        "value": 23100,
        "label": "Ssangyong"
    },
    {
        "value": 23500,
        "label": "Subaru"
    },
    {
        "value": 23600,
        "label": "Suzuki"
    },
    {
        "value": 23800,
        "label": "Talbot"
    },
    {
        "value": 23825,
        "label": "Tata"
    },
    {
        "value": 189,
        "label": "TECHART"
    },
    {
        "value": 135,
        "label": "Tesla"
    },
    {
        "value": 24100,
        "label": "Toyota"
    },
    {
        "value": 24200,
        "label": "Trabant"
    },
    {
        "value": 24400,
        "label": "Triumph"
    },
    {
        "value": 24500,
        "label": "TVR"
    },
    {
        "value": 25200,
        "label": "Volkswagen"
    },
    {
        "value": 25100,
        "label": "Volvo"
    },
    {
        "value": 25300,
        "label": "Wartburg"
    },
    {
        "value": 113,
        "label": "Westfield"
    },
    {
        "value": 25650,
        "label": "Wiesmann"
    },
    {
        "value": 1,
        "label": "Other"
    }
]

export default brands