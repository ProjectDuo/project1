// Fetch exchange rates and populate currency dropdowns
async function fetchCurrencies() {
    const apiUrl = "https://open.er-api.com/v6/latest/USD";
    const countryCurrencyMap = {
        AFN: "Afghan Afghani",
        ALL: "Albanian Lek",
        DZD: "Algerian Dinar",
        AND: "Andorran Franc",
        AOA: "Angolan Kwanza",
        BBD: "Barbadian Dollar",
        ARS: "Argentine Peso",
        AMD: "Armenian Dram",
        AUD: "Australian Dollar",
        AZN: "Azerbaijani Manat",
        BSD: "Bahamian Dollar",
        BHD: "Bahraini Dinar",
        BDT: "Bangladeshi Taka",
        BBD: "Barbadian Dollar",
        BYN: "Belarusian Ruble",
        BZD: "Belize Dollar",
        BAM: "Bosnia and Herzegovina Convertible Mark",
        BWP: "Botswanan Pula",
        BRL: "Brazilian Real",
        BND: "Brunei Dollar",
        BGN: "Bulgarian Lev",
        BIF: "Burundian Franc",
        CVE: "Cape Verdean Escudo",
        KHR: "Cambodian Riel",
        CAD: "Canadian Dollar",
        CAF: "Central African CFA Franc",
        CLP: "Chilean Peso",
        CNY: "Chinese Yuan",
        COP: "Colombian Peso",
        KMF: "Comorian Franc",
        CRC: "Costa Rican Colón",
        HRK: "Croatian Kuna",
        CUP: "Cuban Peso",
        CYP: "Cypriot Pound",
        CZK: "Czech Koruna",
        CDF: "Congolese Franc",
        DKK: "Danish Krone",
        DJF: "Djiboutian Franc",
        DMA: "East Caribbean Dollar",
        DOP: "Dominican Peso",
        ECV: "United States Dollar",
        EGP: "Egyptian Pound",
        ETB: "Ethiopian Birr",
        USD: "United States Dollar",
        INR: "Indian Rupee",
        EUR: "Euro",
        GBP: "British Pound",
        JPY: "Japanese Yen",
        AUD: "Australian Dollar",
        CAD: "Canadian Dollar",
        FJD: "Fijian Dollar",
        FIN: "Finnish Markka",
        FRA: "French Franc",
        GMD: "Gambian Dalasi",
        GEL: "Georgian Lari",
        DEU: "German Mark",
        GHS: "Ghanaian Cedi",
        GRC: "Greek Drachma",
        GRD: "Grenadian Dollar",
        GTM: "Guatemalan Quetzal",
        GNF: "Guinean Franc",
        GYD: "Guyanese Dollar",
        HTG: "Haitian Gourde",
        HNL: "Honduran Lempira",
        HUF: "Hungarian Forint",
        ISK: "Icelandic Króna",
        IDR: "Indonesian Rupiah",
        IRR: "Iranian Rial",
        IQD: "Iraqi Dinar",
        ILS: "Israeli New Shekel",
        ITA: "Italian Lira",
        JMD: "Jamaican Dollar",
        JPY: "Japanese Yen",
        JOR: "Jordanian Dinar",
        KZT: "Kazakhstani Tenge",
        KES: "Kenyan Shilling",
        KWT: "Kuwaiti Dinar",
        KGS: "Kyrgyzstani Som",
        LAK: "Lao Kip",
        LVL: "Latvian Lats",
        LBN: "Lebanese Pound",
        LSL: "Lesotho Loti",
        LRD: "Liberian Dollar",
        LYD: "Libyan Dinar",
        LUX: "Luxembourg Franc",
        MGA: "Malagasy Ariary",
        MWK: "Malawian Kwacha",
        MYR: "Malaysian Ringgit",
        MVR: "Maldivian Rufiyaa",
        MNT: "Mongolian Tögrög",
        MDA: "Moldovan Leu",
        MNT: "Mongolian Tögrög",
        MDT: "Montenegrin Perper",
        MOP: "Macanese Pataca",
        MUR: "Mauritian Rupee",
        MXN: "Mexican Peso",
        NAD: "Namibian Dollar",
        NPR: "Nepalese Rupee",
        NGN: "Nigerian Naira",
        NIO: "Nicaraguan Córdoba",
        NOK: "Norwegian Krone",
        OMR: "Omani Rial",
        PAB: "Panamanian Balboa",
        PEN: "Peruvian Nuevo Sol",
        PHP: "Philippine Peso",
        PLN: "Polish Zloty",
        QAR: "Qatari Riyal",
        RON: "Romanian Leu",
        RUB: "Russian Ruble",
        RWF: "Rwandan Franc",
        SAR: "Saudi Riyal",
        SEN: "Senegalese Franc",
        SGP: "Singapore Dollar",
        SIT: "Slovenian Tolar",
        ZAR: "South African Rand",
        SRD: "Surinamese Dollar",
        SWE: "Swedish Krona",
        CHF: "Swiss Franc",
        SYR: "Syrian Pound",
        TJS: "Tajikistani Somoni",
        THB: "Thai Baht",
        TMT: "Turkmenistan Manat",
        TUN: "Tunisian Dinar",
        TUR: "Turkish Lira",
        UGX: "Ugandan Shilling",
        URY: "Uruguayan Peso",
        UZS: "Uzbekistani Som",
        VEN: "Venezuelan Bolívar",
        VND: "Vietnamese Dong",
        YER: "Yemeni Rial",
        ZMB: "Zambian Kwacha",
        ZWL: "Zimbabwean Dollar",
        
        // Add more currencies and their country names here
    };

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const currencyKeys = Object.keys(data.rates);
        const fromCurrency = document.getElementById("fromCurrency");
        const toCurrency = document.getElementById("toCurrency");

        // Populate dropdowns with country names and currencies
        currencyKeys.forEach(currency => {
            const countryName = countryCurrencyMap[currency] || currency;

            const option1 = document.createElement("option");
            option1.value = currency;
            option1.textContent = `${countryName} (${currency})`;
            fromCurrency.appendChild(option1);

            const option2 = document.createElement("option");
            option2.value = currency;
            option2.textContent = `${countryName} (${currency})`;
            toCurrency.appendChild(option2);
        });

        // Set default values
        fromCurrency.value = "USD";
        toCurrency.value = "INR";
    } catch (error) {
        console.error("Error fetching currencies:", error);
        alert("Failed to fetch currency data. Please try again later.");
    }
}

// Convert currency
async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    const apiUrl = `https://open.er-api.com/v6/latest/${fromCurrency}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        document.getElementById("resultText").textContent = `Converted Amount: ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error("Error converting currency:", error);
        alert("Failed to convert currency. Please try again later.");
    }
}

// Theme toggle functionality
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const themeToggle = document.getElementById("themeToggle");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Event listeners
document.getElementById("convertButton").addEventListener("click", convertCurrency);

// Initialize the app
fetchCurrencies();