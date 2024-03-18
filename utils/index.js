/** Wait for x ms in an async function */
export const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/** Returns a shortened version of a string */
export function shortAddress(address, number = 5) {
    if(!address) {
        return "-";
    }

    const firstChars = address.substring(0, number);
    const lastChars = address.substr(address.length - number);
    return firstChars.concat('-', lastChars);
}
  
/** Will extract the address from the did */
export function getAddress(did) {
    // Split the DID string into an array using ':' as the delimiter
    const parts = did.split(':');
    
    // Return the last element of the array
    return parts[parts.length - 1];
}

export function convertAndFormatBigNumber(value, precision) {
    // Convert BigNumber to string
    const stringValue = value.toString();

    // Convert string to a decimal number with the specified precision
    const length = stringValue.length;
    const decimalPosition = length > precision ? length - precision : 0;
    let formattedValue = stringValue.slice(0, decimalPosition) + "." + stringValue.slice(decimalPosition).padStart(precision, '0');
    // Remove trailing zeros after the decimal point and the decimal point if not needed
    formattedValue = formattedValue.replace(/\.?0+$/, '');
    // Handle cases where the string is something like ".5"
    if (formattedValue.startsWith('.')) {
        formattedValue = '0' + formattedValue;
    }
    return formattedValue;
}

export function getToken(programId) {
    if(programIdToToken[programId]) {
        return programIdToToken[programId]
    } else {
        return programId
    }
}

export const programIdToToken = {
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v": "USDC",
    "So11111111111111111111111111111111111111112": "WSOL",
    "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB": "USDT",
    "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So": "mSOL",
    "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN": "JUP",
    "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs": "ETH",
    "3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh": "WBTC",
    "Dwy2nQXjzdsQUCyJkB8XsCewHpFMPjZWxVgkNwwWD4jT": "WBTC",
    "HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3": "PYTH",
    "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm": "WIF",
    "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263": "BONK",
    "5MAYDfq5yxtudAhtfyuMBuHZjgAbaS9tbEyEQYAhDS5y": "ACS",
    "93RC484oMK5T9H89rzT5qiAXKHGP9jscXfFfrihNbe57": "ZERO",
    "jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL": "JTO",
    "3psH1Mj1f7yUfaD5gh6Zj7epE8hhrMkMETgv5TshQA4o": "boden",
    "NeonTjSjsuo3rexg9o6vHuMXw62f9V7zvmu8M8Zut44": "NEON",
    "AURYydfxJib1ZkTir1Jn1J9ECYUtjb6rKQVmtYaixWPP": "AURY",
    "bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1": "bSOL",
    "rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof": "RENDER",
    "AdV3h5Uk9xy39MkCfup9jKXth1JCJbxgSgXkdpSX4sq1": "FEDUP",
    "Taki7fi3Zicv7Du1xNAWLaf6mRK7ikdn77HeGzgwvo4": "TAKI",
    "7bVHVohLybuS5G3xD3ET25TYzriJbq5hCuUXHfcjMSVG": "APECITY",
    "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE": "ORCA",
    "A3eME5CetyZPBoWbRUwY3tSe25S6tb18ba9ZPbWk9eFJ": "PENG",
    "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr": "POPCAT",
    "4xDsmeTWPNjgSVSS1VTfzFq3iHZhp77ffPkAmkZkdu71": "POPCAT",
    "WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk": "WEN",
    "DVzrCErBzydh92bBzSJX1dKwVvb4omwhrvNz8CwRyxxV": "VONSPEED",
    "MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey": "MNDE",
    "7iT1GRYYhEop2nV1dyCwK2MGyLmPHq47WhPGSwiqcUg5": "ANALOS",
    "27G8MtK7VtTcCHkpASjSDdkWWYfoqT6ggEuKidVJidD4": "JLP",
    "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU": "SAMO",
    "9nnLbotNTcUhvbrsA6Mdkx45Sm82G35zo28AqUvjExn8": "Spoody",
    "HU23r7UoZbqTUuh3vA7emAGztFtqwTeVips789vqxxBw": "MYRO",
    "4gnf3XVk8A3vxFnnPtVqSFZa1SEPeXogvcetpZm6Q3pS": "BNB",
    "DVuaDuQdPZ6H49inC2Xoyx7BpLAAJTPPChSfHuGpy8X4": "PLANK",
    "2gNywbGr5hURypWAEk6UUXESx5cFmNrvajfbz81CEQzg": "CHART",
    "8wXtPeU6557ETkp9WHFY1n1EcU6NxDvbAggHGsMYiHsB": "GME",
    "GcYK1bh1dYB8v9cPVrFKtgLYoVg49aUp6yWxQkieBkDG": "FLOKING",
    "JxxWsvm9jHt4ah7DT9NuLyVLYZcZLUdPD93PcPQ71Ka": "mockJUP",
    "GDfnEsia2WLAW5t8yx2X5j2mkfA74i5kwGdDuZHt7XmG": "CROWN",
    "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R": "RAY",
    "HrLx8MLKegpbmbmWePZiuvf3AbJNx1CJyjBwUHwicEgW": "NYXC",
    "G3q2zUkuxDCXMnhdBPujjPHPw9UTMDbXqzcc2UHM3jiy": "NICK",
    "947tEoG318GUmyjVYhraNRvWpMX7fpBTDQFBoJvSkSG3": "CHAT",
    "ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82": "BOME",
    "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT": "UXD",
    "hntyVP6YFm1Hg25TN9WGLqM12b8TQmcknKrdu1oxWux": "HNT",
    "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn": "JitoSOL",
    "FU1q8vJpZNUrmqsciSjp8bAKKidGsLmouB8CBdf8TKQv": "tremp",
    "ENoD8J2J6wNHkcJkvVBkwq5JMiR1oNBfBZRkoHCQogyT": "AABL",
    "6vUQsePjhpH67Db6p7Koj1wQsQP1UtovBkWXSrC1DkaA": "WIFS",
    "METADDFL6wWMWEoKTFJwcThTbUmtarRJZjRpzUvkxhr": "META",
    "D8r8XTuCrUhLheWeGXSwC3G92RhASficV3YA7B2XWcLv": "BAG",
    "9kCuaGMx6GNBcTfZHEJquzjZaayVThVLPzoQ16SYNj2c": "PLINK",
    "A9mUU4qviSctJVPJdBJWkb28deg915LYJKrzQ19ji3FM": "USDCet",
    "4G86CMxGsMdLETrYnavMFKPhQzKTvDBYGMRAdVtr72nu": "SNAP",
    "nosXBVoaCTtYdLvKY6Csb4AC8JCdQKKAaWYtx2ZMoo7": "NOS",
    "EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp": "FIDA",
    "8qJSyQprMC57TWKaYEmetUR3UUiTP2M3hXdcvFhkZdmv": "USDTbs",
    "H1G6sZ1WDoMmMCFqBKAbg9gkQPCo1sKQtaJWz9dHmqZr": "SBONK",
    "9PyVDeNxpoejq5gF3JAQ7NiBbDnnwM23W31YPqD3AjPw": "TAYT",
    "HaP8r3ksG76PhQLTqR8FYBeNiQpejcFbQmiHbg787Ut1": "MAGA",
    "5LafQUrVco6o7KMz42eqVEJ9LW31StPyGjeeu5sKoMtA": "MUMU",
    "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj": "stSOL",
    "iotEVVZLEywoTn1QdwNPddxPWszn3zFhEot3MfL9fns": "IOT",
    "HhJpBhRRn4g56VsyLuT8DL5Bv31HkXqsrahTTUCZeZg4": "MYRO",
    "METAewgxyPbgwsseH8T16a39CQ5VyVxZi9zXiDPY18m": "MPLX",
    "AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR": "GUAC",
    "BLZEEuZUBVqFhj8adcCFPJvPVCiCyVmh3hkJMrU8KuJA": "BLZE",
    "Fxgdfsy1Z5Mvh53o69s2Ev6TGxtAJ1RQ5RJ5moCpKmQZ": "SI",
    "21rweMLGYeMNonHW7H3xa5py17X6ZFRcHirCp9inRBQA": "IQ50",
    "FS66v5XYtJAFo14LiPz5HT93EUMAHmYipCfQhLpU4ss8": "SMOG",
    "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX": "USDH",
    "5jFnsfx36DyGk8uVGrbXnVUMTsBkPXGpx6e69BiGFzko": "INU",
    "EPeUFDgHRxs9xxEPVaL6kfGQvCon7jmAWKVUHuux1Tpz": "BAT",
    "t5cSTUSZzUAQXQKzQvhieFG4Hz4xC23z9du1Chp8gES": "KORRA",
    "HLQR9Rc7rzfiydRs5qaJGoKniu64zCNN75v5ju4HF2ap": "JASON",
    "Gz7VkD4MacbEB6yC5XD3HcumEiYx2EtDYYrfikGsvopG": "MATICpo",
    "FvER7SsvY5GqAMawf7Qfb5MnUUmDdbPNPg4nCa4zHoLw": "PAJAMAS",
    "GAJAu2dijGBo2nEswJmh2KNcmtKmTXk4Ev3DL9ER261r": "WW3",
    "5K3oPCftJPzBDRxp53wvzVmjDybVgtuaSmkRSffQXjiB": "BOME 2.0",
    "8A9HYfj9WAMgjxARWVCJHAeq9i8vdN9cerBmqUamDj7U": "ELE",
    "mb1eu7TzEc71KxDpsmsKoucSSuuoGLv1drys1oP2jh6": "MOBILE",
    "SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp": "SLND",
    "4vqYQTjmKjxrWGtbL2tVkbAU1EVAz9JwcYtd2VE3PbVU": "WYNN"
};
export function formatNumber(num) {
    if(!num) {
        return 0;
    }
    if (num < 1) {
        return num.toFixed(3);
    }
    else if (num < 10) {
        return num.toFixed(2);
    }
    else if (num < 1000) {
        return num.toFixed(0);
    } else if (num < 1000000) {
        // For thousands, divide by 1000 and add 'k' suffix
        return (num / 1000).toFixed(1) + 'k';
    } else {
        // For millions, divide by 1000000 and add 'm' suffix
        return (num / 1000000).toFixed(1) + 'm';
    }
}