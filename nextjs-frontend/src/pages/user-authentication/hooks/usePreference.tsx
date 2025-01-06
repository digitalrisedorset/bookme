export const usePreferenceVariables = (userId: string, fields: any) => {
    const data = {}

    for (let index in fields) {
        if (!fields.hasOwnProperty(index)) continue;

        if (index === 'weekPreference') {
            data[index] = fields[index]
        }

        if (index === 'haircutType') {
            if (fields[index] === null) {
                data['haircutType'] = {"disconnect": true}
            } else {
                data['haircutType'] = {
                    "connect": {
                        "id": fields[index]
                    }
                }
            }
        }

        if (index === 'hairdresser') {
            if (fields[index] === null) {
                data['hairdresser'] =  {"disconnect": true}
            } else {
                data['hairdresser'] = {
                    "connect": {
                        "id": fields[index]
                    }
                }
            }
        }
    }

    return {
        "data": [
            {
                "where": {
                    "id": userId
                },
                "data": data
            }
        ]
    }
}