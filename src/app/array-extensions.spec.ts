class SomeClass {
  Num: number;
  Name: string;
}

class SomeOtherClass {
  SomeOtherNum: number;
  SomeName: string;
}

describe('Array Extensions tests', () => {

  it('can find desired items using OfType of type T', () => {
    let someMixedArray: any[] = [];
    someMixedArray.push(<SomeClass>{ Name: "Foo", Num: 1 });
    someMixedArray.push(<SomeOtherClass>{ SomeName: "BarBazBaze", SomeOtherNum: 813 });
    someMixedArray.push(<SomeClass>{ Name: "FooBaz", Num: 4 });
    someMixedArray.push(<SomeOtherClass>{ SomeName: "BarBaze", SomeOtherNum: 13 });
    someMixedArray.push(<SomeClass>{ Name: "AllyoBaze", Num: 7 });

    let compareObject = <SomeClass>{ Name: "", Num: 0 };
    let filteredArrayBySpecifiedType = someMixedArray.OfType(compareObject);
    console.log(filteredArrayBySpecifiedType);

    expect(filteredArrayBySpecifiedType.All(item => <SomeClass>item !== undefined)).toBe(true, "Expected only items of type SomeOtherClass in the filtered array after running OfType of SomeOtherClass on it.");
  });

  it('can sort using OrderBy', () => {
    let inputArray: SomeClass[] = [
      { Num: 1, Name: "Foo" },
      { Num: -3, Name: "Baze" },
      { Num: 11, Name: "BelongToUs" },
      { Num: 5, Name: "AllyoBaze" }
    ];
    let sortedArray = inputArray.OrderBy<SomeClass>(s => s.Num);
    console.log(sortedArray);

    let sortedArrayNums = sortedArray.Select<SomeClass>("Num").map(s => s.Num);
    expect(sortedArrayNums).toEqual([-3, 1, 5, 11], "Expected that the sorting was performed on the input array.");
  });

  it('can sort using OrderBy and ThenBy', () => {
    let inputArray: SomeClass[] = [
      { Num: 1, Name: "Foo" },
      { Num: -3, Name: "Baze" },
      { Num: 11, Name: "BelongToUs" },
      { Num: 5, Name: "AllyoBaze" }
    ];

    let sortedArray = inputArray.OrderBy<SomeClass>(s => s.Num).ThenBy<SomeClass>(s => s.Name);
    console.log(sortedArray);
    let sortedArrayNames = sortedArray.Select<SomeClass>("Name").map(s => s.Name);
    console.log(sortedArrayNames);
    expect(sortedArrayNames).toEqual(["AllyoBaze", "Baze", "BelongToUs", "Foo"], "Expected that the sorting was performed using OrderBy and ThenBy on the input array.");
  });




});
