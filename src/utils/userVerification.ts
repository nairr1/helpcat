export const userVerification = (email: string, brand: string) => {
    const index = email.indexOf("@");

    const domain = email.slice(index);

    let isVerified = false;

    switch(domain) {
        case("@redcat.com.au"):
            isVerified = true;
            break;
        case("@retailzoo.com.au"):
            if(brand === "boostjuice"
            || brand === "bettysburgers" 
            || brand === "ciboespresso"
            || brand === "salsas") {
                isVerified = true;
            }
            break;
        case("@augustusgelatery.com.au"):
            if(brand === "augustusgelatery") {
                isVerified = true;
            }
            break;
        case("@banjos.com.au"):
            if(brand === "banjos") {
                isVerified = true;
            }
            break;
        case("@burgerurge.com.au"):
            if(brand === "burgerurge") {
                isVerified = true;
            }
            break;
        case("@chatimegroup.com.au"):
            if(brand === "chatime") {
                isVerified = true;
            }
            break;
        case("@concepteight.com.au"):
            if(brand === "concept8rewards") {
                isVerified = true;
            }
            break;
        case("@danielsdonuts.com.au"):
            if(brand === "danielsdonuts") {
                isVerified = true;
            }
            break;
        case("@eljannah.com.au"):
            if(brand === "eljannah") {
                isVerified = true;
            }
            break;
        case("@fondamexican.com.au"):
            if(brand === "fondamexican") {
                isVerified = true;
            }
            break;
        case("@innoveilgami.com.au"):
            if(brand === "gamichicken") {
                isVerified = true;
            }
            break;
        case("@grilld.com.au"):
            if(brand === "grilld") {
                isVerified = true;
            }
            break;
        case("@hunkydoryfish.com.au"):
            if(brand === "hunkydory") {
                isVerified = true;
            }
            break;
        case("@lonestarribhouse.com.au"):
            if(brand === "lonestar") {
                isVerified = true;
            }
        case("@maxbrenner.com.au"):
            if(brand === "maxbrenner") {
                isVerified = true;
            }
            break;
        case("@nandos.com.au"):
            if(brand === "nandos") {
                isVerified = true;
            }
            break;
        case("@nenechicken.com.au"):
            if(brand === "nenechicken") {
                isVerified = true;
            }
            break;
        case("@oakberry.com.au"):
            if(brand === "oakberry") {
                isVerified = true;
            }
            break;
        case("@olivers.com.au"):
            if(brand === "olivers") {
                isVerified = true;
            }
            break;
        case("@sanchurro.com.au"):
            if(brand === "sanchurro") {
                isVerified = true;
            }
            break;
        case("@schnitz.com.au"):
            if(brand === "schnitz") {
                isVerified = true;
            }
            break;
    }

    if(email === "rnair1199@gmail.com") {
        return true;
    }

    return isVerified;
};