export const tr = (text: string, venue: string) => {
    switch (venue) {
        case 'date-mate':
            if (text === 'What haircut type do you need?') text = 'What date type do you fancy?'
            if (text === 'appointment') text = 'date'
            if (text === 'Haircut') text = 'Date style'
            if (text === 'Hairdresser') text = 'Date Host'
            break;
    }

    return text
}