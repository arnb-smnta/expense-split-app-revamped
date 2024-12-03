function simplifyDebts(transactions) {
  var splits = new Array();
  var transaction_map = new Map(Object.entries(transactions)); //converting JSON to map object
  console.log(transactions);
  function settleSimilarFigures() {
    let vis = new Map();
    for (let transaction1 of transaction_map.keys()) {
      vis.set(transaction1, 1);
      for (let transaction2 of transaction_map.keys()) {
        if (!vis.has(transaction2) && transaction1 != transaction2) {
          if (
            transaction_map.get(transaction2) ==
            -transaction_map.get(transaction1)
          ) {
            if (
              transaction_map.get(transaction2) >
              transaction_map.get(transaction1)
            ) {
              splits.push([
                transaction1,
                transaction2,
                transaction_map.get(transaction2),
              ]);
            } else {
              splits.push([
                transaction2,
                transaction1,
                transaction_map.get(transaction1),
              ]);
            }
            transaction_map.set(transaction2, 0);
            transaction_map.set(transaction1, 0);
          }
        }
      }
    }
  }

  function getMaxMinCredit() {
    let max_ob,
      min_ob,
      max = Number.MIN_VALUE,
      min = Number.MAX_VALUE;
    for (let transaction of transaction_map.keys()) {
      if (transaction_map.get(transaction) < min) {
        min = transaction_map.get(transaction);
        min_ob = transaction;
      }
      if (transaction_map.get(transaction) > max) {
        max = transaction_map.get(transaction);
        max_ob = transaction;
      }
    }
    return [min_ob, max_ob];
  }

  function helper() {
    let minMax = getMaxMinCredit();
    if (minMax[0] == undefined || minMax[1] == undefined) return;
    let min_value = Math.min(
      -transaction_map.get(minMax[0]),
      transaction_map.get(minMax[1])
    );
    transaction_map.set(minMax[0], transaction_map.get(minMax[0]) + min_value);
    transaction_map.set(minMax[1], transaction_map.get(minMax[1]) - min_value);
    min_value = Math.round((min_value + Number.EPSILON) * 100) / 100;
    let res = [minMax[0], minMax[1], min_value];
    splits.push(res);
    helper();
  }

  settleSimilarFigures();
  helper();
  return splits;
}

module.exports = simplifyDebts;
