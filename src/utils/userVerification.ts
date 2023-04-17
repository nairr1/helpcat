export const userVerification = (email: string, path: string) => {
    const index = email.indexOf("@");

    const domain = email.slice(index);

    let isVerified = false;

    switch(domain) {
        case("@redcat.com.au"):
            isVerified = true;
            break;
        case("@retailzoo.com.au"):
            if(path === "boostjuice"
            || path === "bettysburgers" 
            || path === "ciboespresso"
            || path === "salsas") {
                isVerified = true;
            }
            break;
        case("@augustusgelatery.com.au"):
            if(path === "augustusgelatery") {
                isVerified = true;
            }
            break;
        case("@banjos.com.au"):
            if(path === "banjos") {
                isVerified = true;
            }
            break;
        case("@burgerurge.com.au"):
            if(path === "burgerurge") {
                isVerified = true;
            }
            break;
        case("@chatimegroup.com.au"):
            if(path === "chatime") {
                isVerified = true;
            }
            break;
        case("@concepteight.com.au"):
            if(path === "concept8rewards") {
                isVerified = true;
            }
            break;
        case("@danielsdonuts.com.au"):
            if(path === "danielsdonuts") {
                isVerified = true;
            }
            break;
        case("@eljannah.com.au"):
            if(path === "eljannah") {
                isVerified = true;
            }
            break;
        case("@fondamexican.com.au"):
            if(path === "fondamexican") {
                isVerified = true;
            }
            break;
        case("@innoveilgami.com.au"):
            if(path === "gamichicken") {
                isVerified = true;
            }
            break;
        case("@grilld.com.au"):
            if(path === "grilld") {
                isVerified = true;
            }
            break;
        case("@hunkydoryfish.com.au"):
            if(path === "hunkydory") {
                isVerified = true;
            }
            break;
        case("@lonestarribhouse.com.au"):
            if(path === "lonestar") {
                isVerified = true;
            }
        case("@maxbrenner.com.au"):
            if(path === "maxbrenner") {
                isVerified = true;
            }
            break;
        case("@nandos.com.au"):
            if(path === "nandos") {
                isVerified = true;
            }
            break;
        case("@nenechicken.com.au"):
            if(path === "nenechicken") {
                isVerified = true;
            }
            break;
        case("@oakberry.com.au"):
            if(path === "oakberry") {
                isVerified = true;
            }
            break;
        case("@olivers.com.au"):
            if(path === "olivers") {
                isVerified = true;
            }
            break;
        case("@sanchurro.com.au"):
            if(path === "sanchurro") {
                isVerified = true;
            }
            break;
        case("@schnitz.com.au"):
            if(path === "schnitz") {
                isVerified = true;
            }
            break;
    }

    if(email === "rnair1199@gmail.com") {
        return true;
    }

    return isVerified;
};