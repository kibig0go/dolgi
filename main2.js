function getTransfers(participants) {
    const allSpendings = participants.reduce(
        (sum, currentValue) => sum + currentValue.paid,
        0
    );
    const count = participants.reduce(
        (sum, currentValue) => sum + currentValue.count,
        0
    );
    const share = allSpendings / count; // Сумма участия на одного человека
    let paidMore = []; // Люди или группы людей с антидолгом
    let paidLess = []; // Люди или груупы людей с долгом

    for (person of participants) {
        person.dolg = share*person.count - person.paid;
        if (person.dolg < 0) {
            paidMore.push(person);
        } else {
            paidLess.push(person)
        }
    }
    paidLess = paidLess.sort((a, b) => b.dolg - a.dolg); // Сортировка по убыванию долга
    paidMore = paidMore.sort((a, b) => a.dolg - b.dolg); // Сортировка по убыванию антидолга
    const transfers = [];
    let i = 0, j = 0, paidLessName, paidMoreName, remainder, paid, roundedPaid; // скок осталось от долга
    while (i < paidLess.length && j < paidMore.length) {
        paidLessName = paidLess[i].name;
        paidMoreName = paidMore[j].name;
        remainder = paidLess[i].dolg + paidMore[j].dolg; // скок осталось от вернуть текущему антидолжнику (со знаком минус) 
        if (remainder > 0) { // случай, когда ему вернули больше, чем надо
            paid = paidLess[i].dolg - remainder;
            paidLess[i].dolg = remainder;
            j++;
        } else { // случай, когда антидолжнику вернули не всё, что нужно
            paid = paidLess[i].dolg;
            paidMore[j].dolg = remainder;
            i++;
        }
        roundedPaid = Math.round(paid);
        if (roundedPaid > 0) {
            transfers.push({ from: paidLessName, to: paidMoreName, pay: roundedPaid }); // запись операции
        }
    }
    console.log(`Всего потрачено: ${allSpendings}`);
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
