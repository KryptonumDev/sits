export const csvParser = (data) => {
    let lines = data.split("\r\n");

    let result = [];

    let headers = lines[0].replace(',,', ',').split(",");

    for (let i = 1; i < lines.length; i++) {
        if (lines[i].includes(',,')) {
            lines[i] = lines[i].replace(',,', ', ,')
        }

        let obj = {};
        let currentline = lines[i].split(",");
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj)

    }

    //return result; //JavaScript object
    return result; //JSON
};