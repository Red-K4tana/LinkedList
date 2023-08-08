
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

    this.tail.next = newNode
    this.tail = newNode
    return this
  }
  delete (value) {
    if (!this.head) {
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
}

let list = new LinkedList()
list.prepend('a')
list.prepend('a')
list.prepend('b')
list.prepend('c')
list.prepend('a')
list.prepend('c')







