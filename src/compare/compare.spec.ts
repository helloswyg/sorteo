import { CompareFunction, getCompareByDateFn, getCompareByNumberFn, getCompareByStringFn, SortDirection } from "./compare.utils";

interface TestItem {
    id: number;
    num: number;
    str: string;
    date: Date;
}

function getISODate(date: Date): string {
    return date.toString() === 'Invalid Date' ? 'Invalid Date' : date.toISOString();
}

describe('compare.utils.ts', () => {
    const getId = ({ id } : TestItem) => id;
    const getNumberValue = ({ num } : TestItem) => num;
    const getStringValue = ({ str } : TestItem) => str;
    const getDateValue = ({ date } : TestItem) => date;

    const UNSORTED_ITEMS: TestItem[] = [
        { id: 1, num: 0, str: "i", date: new Date(2000, 1, 1) },
        { id: 2, num: 0, str: "h", date: new Date(2020, 1, 1) },
        { id: 3, num: 1, str: "h", date: new Date(2001, 1, 1) },
        { id: 4, num: 2, str: "g", date: new Date(2019, 1, 1) },
        { id: 5, num: 3, str: "f", date: new Date(2002, 1, 1) },
        { id: 6, num: 4, str: "e", date: new Date(2018, 1, 1) },
        { id: 7, num: 4, str: "d", date: new Date(2018, 1, 1) },
        { id: 8, num: 5, str: "d", date: new Date(2017, 1, 1) },
        { id: 9, num: 6, str: "c", date: new Date(2004, 1, 1) },
        { id: 10, num: 7, str: "b", date: new Date(2004, 1, 1) },
        { id: 11, num: 8, str: "b", date: new Date(2005, 1, 1) },
        { id: 12, num: 8, str: "a", date: new Date(2015, 1, 1) },
        { id: 13, num: NaN, str: "j", date: new Date(2015, 1, NaN) },
        { id: 14, num: NaN, str: "k", date: new Date(2015, 1, NaN) },
        { id: 15, num: NaN, str: "l", date: new Date(2015, 1, NaN) },
        { id: 16, num: NaN, str: "m", date: new Date(2015, 1, NaN) },
    ];

    let compareObjectNumberValueAsc: CompareFunction<TestItem>;
    let compareObjectNumberValueDesc: CompareFunction<TestItem>;
    
    let compareObjectStringValueAsc: CompareFunction<TestItem>;
    let compareObjectStringValueDesc: CompareFunction<TestItem>;
    
    let compareObjectDateValueAsc: CompareFunction<TestItem>;
    let compareObjectDateValueDesc: CompareFunction<TestItem>;
    
    beforeAll(() => {        
        compareObjectNumberValueAsc = getCompareByNumberFn(getNumberValue);
        compareObjectNumberValueDesc = getCompareByNumberFn(getNumberValue, SortDirection.Descending);
        
        expect(compareObjectNumberValueAsc).toBeFunction();
        expect(compareObjectNumberValueDesc).toBeFunction();
                
        compareObjectStringValueAsc = getCompareByStringFn(getStringValue);
        compareObjectStringValueDesc = getCompareByStringFn(getStringValue, SortDirection.Descending);
        
        expect(compareObjectStringValueAsc).toBeFunction();
        expect(compareObjectStringValueDesc).toBeFunction();
                
        compareObjectDateValueAsc = getCompareByDateFn(getDateValue);
        compareObjectDateValueDesc = getCompareByDateFn(getDateValue, SortDirection.Descending);
        
        expect(compareObjectDateValueAsc).toBeFunction();
        expect(compareObjectDateValueDesc).toBeFunction();
    });
    
    describe('getCompareByNumberFn() properly sorts items', () => {
        it('ascending', () => {
            const sortedAsc = UNSORTED_ITEMS.slice().sort(compareObjectNumberValueAsc);
            const sortedIds = sortedAsc.map(getId);
            const sortedValues = sortedAsc.map(getNumberValue);

            expect(sortedIds).toMatchObject([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
            expect(sortedValues).toMatchObject([0, 0, 1, 2, 3, 4, 4, 5, 6, 7, 8, 8, NaN, NaN, NaN, NaN]);
        });
        
        it('descending', () => {
            const sortedDesc = UNSORTED_ITEMS.slice().sort(compareObjectNumberValueDesc);
            const sortedIds = sortedDesc.map(getId);
            const sortedValues = sortedDesc.map(getNumberValue);

            expect(sortedIds).toMatchObject([11, 12, 10, 9, 8, 6, 7, 5, 4, 3, 1, 2, 13, 14, 15, 16]);
            expect(sortedValues).toMatchObject([8, 8, 7, 6, 5, 4, 4, 3, 2, 1, 0, 0, NaN, NaN, NaN, NaN]);
        });
        
        it('using multiple criteria ascending', () => {
            const compareFunction = getCompareByNumberFn(getNumberValue, SortDirection.Ascending, compareObjectStringValueAsc);
            const sortedAsc = UNSORTED_ITEMS.slice().sort(compareFunction);
            const sortedIds = sortedAsc.map(getId);
            const sortedValues = sortedAsc.map(getNumberValue);

            expect(sortedIds).toMatchObject([2,  1,  3,  4,  5,  7, 6,  8,  9, 10, 12, 11, 13, 14, 15, 16]);
            expect(sortedValues).toMatchObject([0, 0, 1, 2, 3, 4, 4, 5, 6, 7, 8, 8, NaN, NaN, NaN, NaN]);
            
            const date = new Date();

            const sortedDesc2 = [
                { id: 1, num: NaN, str: 'b', date },
                { id: 2, num: 10, str: 'a', date },
            ].slice().sort(compareFunction);

            expect(sortedDesc2).toMatchObject([
                { id: 2, num: 10, str: 'a', date },
                { id: 1, num: NaN, str: 'b', date },
            ]);
        });
        
        it('using multiple criteria descending', () => {
            const compareFunction = getCompareByNumberFn(getNumberValue, SortDirection.Descending, compareObjectStringValueAsc);
            const sortedDesc = UNSORTED_ITEMS.slice().sort(compareFunction);
            const sortedIds = sortedDesc.map(getId);
            const sortedValues = sortedDesc.map(getNumberValue);

            expect(sortedIds).toMatchObject([12, 11, 10,  9, 8, 7, 6,  5,  4,  3, 2, 1, 16, 15, 14, 13]);
            expect(sortedValues).toMatchObject([8, 8, 7, 6, 5, 4, 4, 3, 2, 1, 0, 0, NaN, NaN, NaN, NaN]);
        });
    });
    
    describe('getCompareByStringFn() properly sorts items', () => {
        it('ascending', () => {
            const sortedAsc = UNSORTED_ITEMS.slice().sort(compareObjectStringValueAsc);
            const sortedIds = sortedAsc.map(getId);
            const sortedValues = sortedAsc.map(getStringValue);
            
            expect(sortedIds).toMatchObject([12, 10, 11, 9, 7, 8, 6, 5, 4, 2, 3, 1, 13, 14, 15, 16]);
            expect(sortedValues).toMatchObject(['a', 'b', 'b', 'c', 'd', 'd', 'e', 'f', 'g', 'h', 'h', 'i', 'j', 'k', 'l', 'm']);
        });
        
        it('descending', () => {
            const sortedDesc = UNSORTED_ITEMS.slice().sort(compareObjectStringValueDesc);
            const sortedIds = sortedDesc.map(getId);
            const sortedValues = sortedDesc.map(getStringValue);
            
            expect(sortedIds).toMatchObject([16, 15, 14, 13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
            expect(sortedValues).toMatchObject(['m', 'l', 'k', 'j', 'i', 'h', 'h', 'g', 'f', 'e', 'd', 'd', 'c', 'b', 'b', 'a']);
        });
        
        it('using multiple criteria ascending', () => {
            const compareFunction = getCompareByStringFn(getStringValue, SortDirection.Ascending, compareObjectNumberValueAsc);
            const sortedAsc = UNSORTED_ITEMS.slice().sort(compareFunction);
            const sortedIds = sortedAsc.map(getId);
            const sortedValues = sortedAsc.map(getNumberValue);

            expect(sortedIds).toMatchObject([12, 10, 11, 9, 7, 8, 6, 5,  4, 2, 3, 1,13, 14, 15, 16]);
            expect(sortedValues).toMatchObject([8, 7, 8, 6, 4, 5, 4, 3, 2, 0, 1, 0, NaN, NaN, NaN, NaN]);
            
            const date = new Date();

            const sortedDesc2 = [
                { id: 1, num: NaN, str: 'b', date },
                { id: 2, num: NaN, str: 'a', date },
            ].slice().sort(compareFunction);

            expect(sortedDesc2).toMatchObject([
                { id: 2, num: NaN, str: 'a', date },
                { id: 1, num: NaN, str: 'b', date },
            ]);
        });
        
        it('using multiple criteria descending', () => {
            const compareFunction = getCompareByStringFn(getStringValue, SortDirection.Descending, compareObjectNumberValueAsc);
            const sortedDesc = UNSORTED_ITEMS.slice().sort(compareFunction);
            const sortedIds = sortedDesc.map(getId);
            const sortedValues = sortedDesc.map(getNumberValue);

            expect(sortedIds).toMatchObject([16, 15, 14, 13, 1, 3, 2, 4, 5, 6, 8, 7, 9, 11, 10, 12]);
            expect(sortedValues).toMatchObject([NaN, NaN, NaN, NaN, 0, 1, 0, 2, 3, 4, 5, 4, 6, 8, 7, 8]);
        });
    });
    
    describe('getCompareByDateFn() properly sorts items', () => {
        it('ascending', () => {
            const sortedAsc = UNSORTED_ITEMS.slice().sort(compareObjectDateValueAsc);
            const sortedIds = sortedAsc.map(getId);
            const sortedValues = sortedAsc.map(getDateValue);

            expect(sortedIds).toMatchObject([1, 3, 5, 9, 10, 11, 12, 8, 6, 7, 4, 2, 13, 14, 15, 16]);
            expect(sortedValues.map(date => getISODate(date))).toMatchObject(['2000-01-31T23:00:00.000Z', '2001-01-31T23:00:00.000Z', '2002-01-31T23:00:00.000Z', '2004-01-31T23:00:00.000Z', '2004-01-31T23:00:00.000Z', '2005-01-31T23:00:00.000Z', '2015-01-31T23:00:00.000Z', '2017-01-31T23:00:00.000Z', '2018-01-31T23:00:00.000Z', '2018-01-31T23:00:00.000Z', '2019-01-31T23:00:00.000Z', '2020-01-31T23:00:00.000Z', 'Invalid Date', 'Invalid Date', 'Invalid Date', 'Invalid Date']);
        });
        
        it('descending', () => {
            const sortedDesc = UNSORTED_ITEMS.slice().sort(compareObjectDateValueDesc);
            const sortedIds = sortedDesc.map(getId);
            const sortedValues = sortedDesc.map(getDateValue);
            
            expect(sortedIds).toMatchObject([2, 4, 6, 7, 8, 12, 11, 9, 10, 5, 3, 1, 13, 14, 15, 16]);
            expect(sortedValues.map(date => getISODate(date))).toMatchObject(['2020-01-31T23:00:00.000Z', '2019-01-31T23:00:00.000Z', '2018-01-31T23:00:00.000Z', '2018-01-31T23:00:00.000Z', '2017-01-31T23:00:00.000Z', '2015-01-31T23:00:00.000Z', '2005-01-31T23:00:00.000Z', '2004-01-31T23:00:00.000Z', '2004-01-31T23:00:00.000Z', '2002-01-31T23:00:00.000Z', '2001-01-31T23:00:00.000Z', '2000-01-31T23:00:00.000Z', 'Invalid Date', 'Invalid Date', 'Invalid Date', 'Invalid Date']);
        });
        
        it('using multiple criteria ascending', () => {
            const compareFunction = getCompareByDateFn(getDateValue, SortDirection.Ascending, compareObjectNumberValueAsc);
            const sortedAsc = UNSORTED_ITEMS.slice().sort(compareFunction);
            const sortedIds = sortedAsc.map(getId);
            const sortedValues = sortedAsc.map(getDateValue);

            expect(sortedIds).toMatchObject([1, 3, 5, 9, 10, 11, 12, 8, 6, 7, 4, 2, 13, 14, 15, 16]);
            expect(sortedValues.map(date => getISODate(date))).toMatchObject(['2000-01-31T23:00:00.000Z', '2001-01-31T23:00:00.000Z', '2002-01-31T23:00:00.000Z', '2004-01-31T23:00:00.000Z', '2004-01-31T23:00:00.000Z', '2005-01-31T23:00:00.000Z', '2015-01-31T23:00:00.000Z', '2017-01-31T23:00:00.000Z', '2018-01-31T23:00:00.000Z', '2018-01-31T23:00:00.000Z', '2019-01-31T23:00:00.000Z', '2020-01-31T23:00:00.000Z', 'Invalid Date', 'Invalid Date', 'Invalid Date', 'Invalid Date']);
            
            const dateA = new Date(2021, 1, NaN);
            const dateB = new Date(2021, 1, 1);

            const sortedDesc2 = [
                { id: 1, num: 1, str: 'a', date: dateA },
                { id: 2, num: 2, str: 'b', date: dateB },
            ].slice().sort(compareFunction);

            expect(sortedDesc2).toMatchObject([
                { id: 2, num: 2, str: 'b', date: dateB },
                { id: 1, num: 1, str: 'a', date: dateA },
            ]);
        });
        
        it('using multiple criteria descending', () => {
            const compareFunction = getCompareByDateFn(getDateValue, SortDirection.Descending, compareObjectNumberValueAsc);
            const sortedDesc = UNSORTED_ITEMS.slice().sort(compareFunction);
            const sortedIds = sortedDesc.map(getId);
            const sortedValues = sortedDesc.map(getDateValue);

            expect(sortedIds).toMatchObject([2, 4, 6, 7, 8, 12, 11, 10, 9, 5, 3, 1, 13, 14, 15, 16]);
            expect(sortedValues.map(date => getISODate(date))).toMatchObject(['2020-01-31T23:00:00.000Z', '2019-01-31T23:00:00.000Z', '2018-01-31T23:00:00.000Z', '2018-01-31T23:00:00.000Z', '2017-01-31T23:00:00.000Z', '2015-01-31T23:00:00.000Z', '2005-01-31T23:00:00.000Z', '2004-01-31T23:00:00.000Z', '2004-01-31T23:00:00.000Z', '2002-01-31T23:00:00.000Z', '2001-01-31T23:00:00.000Z', '2000-01-31T23:00:00.000Z', 'Invalid Date', 'Invalid Date', 'Invalid Date', 'Invalid Date']);
        });
    });
});
