class SomeClass {
  Num: number;
  Name: string;
}


describe('Array Extensions tests', () => {

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
