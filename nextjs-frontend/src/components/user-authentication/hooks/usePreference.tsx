export const usePreferenceVariables = (userId: string, fields: any) => {
    const data = {}

    for (let index in fields) {
        if (!fields.hasOwnProperty(index)) continue;

        if (index === 'weekPreference') {
            data[index] = fields[index]
        }

        switch (index) {
            case 'haircutType':
            case 'haircutTypeGroup':
            case 'hairdresser':
                if (fields[index] === null) {
                    data[index] = {"disconnect": true}
                } else {
                    data[index] = {
                        "connect": {
                            "id": fields[index]
                        }
                    }
                }
                break;
        }
    }

    return {
        "data": data,
        "where": {
            "id": userId
        },
    }
}