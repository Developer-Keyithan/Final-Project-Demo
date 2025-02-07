interface User {
    id: String,
    name: String,
    email: String,
    number: String | Number,
    country: String
}

const UserData: User[] = [
    {   id: "U0001",
        name: "Anura Kumara Dissanayake",
        email: "kumara@gmail.com",
        number: 771234567,
        country: "Sri Lanka"
    }, {
        id: "U0002",
        name: "Vladimir Putin",
        email: "vputin@gmail.com",
        number: 771234568,
        country: "Russia"
    }, {
        id: "U0003",
        name: "Joe Biden",
        email: "biden@gamil",
        number: 771234569,
        country: "USA"
    }, {
        id: "U0004",
        name: "Angela Merkel",
        email: "amarkel@gamil.com",
        number: 771234570,
        country: "Germany"
    }, {
        id: "U0005",
        name: "Xi Jinping",
        email: "jinping@gmail.com",
        number: 771234571,
        country: "China"
    }, {
        id: "U0006",
        name: "Narendra Modi",
        email: "modi@gmail.com",
        number: 771234572,
        country: "India"
    }, {
        id: "U0007",
        name: "Boris Johnson",
        email: "johnson@gmail.com",
        number: 771234573,
        country: "UK"
    }, {
        id: "U0008",
        name: "Scott Morrison",
        email: "morrison@gmail.com",
        number: 771234574,
        country: "Australia"
    }, {
        id: "U0009",
        name: "Justin Trudeau",
        email: "trudeau@gmail.com",
        number: 771234575,
        country: "Canada"
    }, {
        id: "U0010",
        name: "Emmanuel Macron",
        email: "macron@gamil.com",
        number: 771234576,
        country: "France"
    }, {
        id: "U0011",
        name: "Moon Jae-in",
        email: "jaein@gamil.com",
        number: 771234577,
        country: "South Korea"
    }, {
        id: "U0012",
        name: "Kim Jong-un",
        email: "jong@gmail.com",
        number: 771234578,
        country: "North Korea"
    }
];

export default UserData;