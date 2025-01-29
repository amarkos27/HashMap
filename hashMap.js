const HashMap = () => {
  const startingLength = 16;
  let buckets = Array(startingLength);
  const capacity = () => buckets.length;
  const loadFactor = 0.75;
  let len = 0;

  function hash(key) {
    let hashCode = 0;
    let size = capacity();

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % size;
    }

    return hashCode;
  }

  function set(key, value) {
    const data = { key, value, next: null };

    if (len + 1 < Math.floor(loadFactor * capacity())) {
      const index = hash(key);
      if (buckets[index]) {
        // If there is a head node at this bucket, traverse it and either overwrite or prepend
        let node = buckets[index];

        while (node) {
          if (node.key === key) {
            node.value = value;
            return;
          }
          node = node.next;
        }

        data.next = buckets[index];
        buckets[index] = data;
      } else buckets[index] = data;

      len++;
    } else {
      grow();
    }
  }

  function grow() {
    const list = entries();
    buckets = Array(capacity() * 2);
    len = 0;

    for (let entry of list) {
      let [key, value] = entry;
      set(key, value);
    }

    set(data.key, data.value);
  }

  function get(key) {
    const index = hash(key);
    let node = buckets[index];
    while (node) {
      if (node.key === key) {
        return node.value;
      } else node = node.next;
    }

    return null;
  }

  function has(key) {
    const index = hash(key);
    let node = buckets[index];

    while (node) {
      if (node.key === key) {
        return true;
      } else node = node.next;
    }

    return false;
  }

  function remove(key) {
    const index = hash(key);
    let node = buckets[index];
    let prev = null;

    while (node) {
      if (node.key === key) {
        if (prev) {
          prev.next = node.next;
        } else buckets[index] = node.next;

        len--;
        return true;
      }
      prev = node;
      node = node.next;
    }
    return false;
  }

  function entries() {
    let result = [];
    for (let headNode of buckets) {
      let node = headNode;
      while (node) {
        result.push([node.key, node.value]);
        node = node.next;
      }
    }

    return result;
  }

  const length = () => len;

  function clear() {
    buckets = Array(16);
    len = 0;
  }

  function keys() {
    let result = [];
    for (let headNode of buckets) {
      let currentNode = headNode;
      while (currentNode) {
        result.push(currentNode.key);
        currentNode = currentNode.next;
      }
    }

    return result;
  }

  function values() {
    let result = [];
    for (let headNode of buckets) {
      let currentNode = headNode;
      while (currentNode) {
        result.push(currentNode.value);
        currentNode = currentNode.next;
      }
    }

    return result;
  }

  return {
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
  };
};

const map = HashMap();
map.set('apple', 'red');
map.set('banana', 'yellow');
map.set('carrot', 'orange');
map.set('dog', 'brown');
map.set('elephant', 'gray');
map.set('frog', 'green');
map.set('grape', 'purple');
map.set('hat', 'black');
map.set('ice cream', 'white');
map.set('jacket', 'blue');
map.set('kite', 'pink');
map.set('lion', 'golden');
map.set('moon', 'silver');
console.log(map.entries());
console.log(map.length());
