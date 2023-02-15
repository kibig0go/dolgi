function getTransfers(participants) {

    const allSpendings = participants.reduce(
        (sum, currentValue) => sum + currentValue.paid,
        0
    );

    const count = participants.reduce(
        (sum, currentValue) => sum + currentValue.count,
        0
    );

    const share = allSpendings / count;
    console.log(share);
    let paidMore = [];
    let paidLess = [];

    for (person of participants) {
        person.dolg = share*person.count - person.paid;
        // console.log(person);
        if (person.dolg < 0) {
            paidMore.push(person);
        } else {
            paidLess.push(person)
        }
    }

    paidLess = paidLess.sort((a, b) => b.dolg - a.dolg);
    paidMore = paidMore.sort((a, b) => a.dolg - b.dolg);

    console.log(paidLess);
    console.log(paidMore);

    const transfers = [];
    let i = 0;
    let j = 0;
    while (i < paidLess.length && j < paidMore.length) {
        const paidLessName = paidLess[i].name;
        const paidMoreName = paidMore[j].name;
        let remainder = paidLess[i].dolg + paidMore[j].dolg;
        let paid;
        if (remainder > 0) {
            paid = paidLess[i].dolg - remainder;
            paidLess[i].dolg = remainder;
            j++;
        } else {
            paid = paidLess[i].dolg;
            paidMore[j].dolg = remainder;
            i++;
        }

        let roundedPaid = Math.round(paid)
        if (roundedPaid > 0) {
            transfers.push({ from: paidLessName, to: paidMoreName, pay: roundedPaid });
        }
        // console.log(paidLess);
        // console.log(paidMore);
    }
    console.log(`Всего потрачено: ${allSpendings}`);
    // console.log(participants.length);
    // console.log(count);
    return transfers;
}

const participants = [
    { name: 'igor', paid: 1000, dolg: 0 },
    { name: 'boris', paid: 500, dolg: 0 },
    { name: 'andrey', paid: 300, dolg: 0 },
    { name: 'ghgh', paid: 2000, dolg: 0 },
]

const traty = [
    { name: 'meat', sum: 1000, whoPaid: participants[0].name },
    { name: 'chicken', sum: 500, whoPaid: participants[1].name },
    { name: 'ugol', sum: 300, whoPaid: participants[2].name },
    { name: 'dddd', sum: 2000, whoPaid: participants[3].name },
]

const test = [
    { name: 'tanya', count: 4, paid: 1400, dolg: 0 },
    { name: 'boris', count: 1, paid: 2600, dolg: 0 },
    { name: 'gelya', count: 1, paid: 500, dolg: 0 },
    { name: 'nikitos', count: 1, paid: 0, dolg: 0 },    
    { name: 'vanya', count: 1, paid: 0, dolg: 0 },    
    { name: 'kostya', count: 1, paid: 0, dolg: 0 },
    { name: 'olya', count: 1, paid: 0, dolg: 0 },    
]

const newYear = [
    { name: 'boris', count: 1, paid: 9800, dolg: 0 },
    { name: 'Ruslanchick', count: 1, paid: 1806, dolg: 0 },
    { name: 'Igor&Nastya', count: 2, paid: 6833, dolg: 0 },
    { name: 'Artem&Nastya', count: 2, paid: 0, dolg: 0 },
    { name: 'Nastya S.', count: 1, paid: 0, dolg: 0 },
    { name: 'Tanya', count: 1, paid: 1830, dolg: 0 },
    { name: 'Andrey&Olya', count: 2, paid: 0, dolg: 0 },
]

console.log(getTransfers(newYear));
