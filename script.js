
// функция для корректного вывода this.val, если он является объектом, а не строкой
const nodeStringifier = value => `${value.key}:${value.value}`

class LinkedListNode {
  constructor(val, next = null) {
    this.val = val
    this.next = next
  }

  // если придет callback, то он разберет this.val на свойства и выведет их; если не callback, выведет просто this.val
  // то есть мы должны знать, является ли this.val объектом, прежде чем добавлять аргумент callback
  toString (callback) {
    // console.log( callback ? callback(this.val) : `${this.val}` )
    return callback ? callback(this.val) : `${this.val}`
  }
}

// let node01 = new LinkedListNode('first')
// let node02 = new LinkedListNode({value: 'ewq', key: 231})

// node01.toString()
// node02.toString(nodeStringifier) // подставляю callback, так как node02.val это объект


class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
  }

  toArray () {
    const nodes = []
    let currentNode = this.head
    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }
    return nodes
  }
  toString () {
    return this.toArray().map(node => node.toString()).toString()
  }
  prepend (value) {
    const newNode = new LinkedListNode(value, this.head)
    this.head = newNode

    if (!this.tail) this.tail = newNode

    return this
  }
  append (value) {
    const newNode = new LinkedListNode(value)

    if (!this.head || !this.tail) {
      this.head = newNode
      this.tail = newNode
      return this
    }

    // берём последний узел и указываем, что его next будет новым узлом
    this.tail.next = newNode
    // переназначаем tail на новый узел
    this.tail = newNode
    return this
  }
  delete (value) {
    if (!this.head || value === undefined) {
      console.log('head null')
      return null
    }

    let deletedNode = []

    while (this.head && this.head.val === value) {
      deletedNode.push(this.head)
      this.head = this.head.next
    }

    let currentNode = this.head

    if (currentNode !== null) {
      while (currentNode.next) {
        if (currentNode.next.val === value) {
          deletedNode.push(currentNode.next)
          currentNode.next = currentNode.next.next
        } else {
          currentNode = currentNode.next
        }
      }
    }

    if (this.tail && this.tail.val === value) {
      this.tail = currentNode
    }
    console.log(deletedNode)
    return deletedNode
  }
  find (value) {
    if (!this.head || value === undefined) return null

    let findingNode = []
    let currentNode = this.head
    while (currentNode) {
      if (currentNode.val === value) {
        findingNode.push(currentNode)
        currentNode = currentNode.next
      } else {
        currentNode = currentNode.next
      }
    }
    console.log(findingNode)
    return findingNode
  }
  deleteTail () {
    if (!this.head || !this.tail) return null

    const deletedTail = this.tail

    if (this.head === this.tail) {
      this.head = null
      this.tail = null
      console.log('the list has only one element')
      return deletedTail
    }
    let currentNode = this.head
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null
      } else {
        currentNode = currentNode.next
      }
    }
    this.tail = currentNode
    console.log('deletedTail ', deletedTail)
    return deletedTail
  }
  deleteHead () {
    if (!this.head || !this.tail) return null

    const deletedHead = this.head

    if (this.head.next) {
      this.head = this.head.next
    } else {
      // значит в списке 1 эл-т
      this.head = null
      this.tail = null
    }
    return deletedHead
  }
  fromArray (array) {
    array.forEach(node => this.append(node))
  }
  toArray () {
    const arrayNodes = []

    let currentNode = this.head
    while (currentNode) {
      arrayNodes.push(currentNode)
      currentNode = currentNode.next
    }
    return arrayNodes
  }
  reverse () {
    let currentNode = this.head
    let prevNode = null
    let nextNode = null

    while (currentNode) {
      nextNode = currentNode.next
      currentNode.next = prevNode

      prevNode = currentNode
      currentNode = nextNode
    }
    this.tail = this.head
    this.head = prevNode

    return this
  }
}


let list = new LinkedList()

list.fromArray([1,4,5,'f','das','fgd'])

console.log(list.toString())

console.log(list.reverse())

console.log(list.toString())











