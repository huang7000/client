export const filterArray = (arr, idText, pIdText, childText) => {
    let map = {};
    arr.forEach((v) => {
      map[v[idText]] = v;
    });
    let treeData = [];
    arr.forEach((child) => {
      const mapItem = map[child[pIdText]];
      if (mapItem) {
        (mapItem[childText] || (mapItem[childText] = [])).push(child);
      } else {
        treeData.push(child);
      }
    });
    return treeData;
  }